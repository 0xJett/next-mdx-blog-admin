"use server";

import { createClient } from "@/utils/supabase/server";
import { Tag } from "./(table)/columns";

export async function getTags() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tag").select("id, name, slug");

  return {
    success: !error,
    data: data as Tag[],
    error,
  };
}
