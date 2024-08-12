"use server";
import { createClient } from "@/utils/supabase/server";

export default async function getUser() {
  const supabase = createClient();

  const { data, error } = await (await supabase).auth.getUser();

  return { user: data?.user || null, error: error?.message || null };
}
