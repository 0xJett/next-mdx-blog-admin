"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export async function sendOtp(email: string) {
  const supabase = await createClient();

  if (email !== process.env.ADMIN_EMAIL) {
    return {
      success: false,
      error: new AuthError(
        "The email does not match the configured admin email."
      ),
    };
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
    },
  });

  console.log(data, error);

  return {
    success: !error,
    data,
    error,
  };
}
