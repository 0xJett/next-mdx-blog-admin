"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export async function sendOtp(email: string) {
  const supabase = await createClient();

  if (email !== process.env.ADMIN_EMAIL) {
    return new AuthError("Invalid email", 400, "invalid_email");
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email: "email",
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: false,
    },
  });
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
