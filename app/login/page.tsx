"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { sendOtp } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    const result = await sendOtp(email);

    console.log(result);
  };

  return (
    <>
      <Input type="email" placeholder="Email" />

      <Button onClick={handleSendOtp}>Send OTP</Button>
    </>
  );
}
