"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendOtp } from "./actions";

function OTPStage({ email }: { email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    otp: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    const supabase = createClient();

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email,
      token: values.otp,
      type: "email",
    });

    if (error) {
      form.setError("otp", {
        message: error.message,
      });

      setLoading(false);
      return;
    }

    router.replace("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  containerClassName="justify-center"
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your mailbox.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
}

function EmailStage({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onGetOTP = async (values: z.infer<typeof formSchema>) => {
    if (!values.email) {
      form.setError("email", {
        message: "This field is required!",
      });

      return;
    }

    setLoading(true);
    const { success, error } = await sendOtp(values.email);
    setLoading(false);

    if (!success) {
      form.setError("email", {
        message: error?.message,
      });

      return;
    }

    onSuccess(values.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onGetOTP)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Get One-time Password
        </Button>
      </form>
    </Form>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otpStage, setOtpStage] = useState(false);

  const onGetOTPSuccess = (email: string) => {
    setOtpStage(true);
    setEmail(email);
  };

  return (
    <div className="flex justify-center items-center size-full">
      <Card className="w-xs md:w-md">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>
            You can only log in with the email address configured in the
            environment variables.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: otpStage ? "-100%" : "0%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
              className={
                otpStage ? "absolute inset-0 pointer-events-none" : "relative"
              }
              aria-hidden={otpStage}
            >
              <EmailStage onSuccess={onGetOTPSuccess} />
            </motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: otpStage ? "0%" : "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
              className={
                otpStage
                  ? "relative z-10"
                  : "absolute inset-0 pointer-events-none"
              }
              aria-hidden={!otpStage}
            >
              <OTPStage email={email} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
