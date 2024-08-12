"use server";
import { CustomUser } from "@/context/user-context";
import { createClient } from "@/utils/supabase/server";

export default async function getUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await (await supabase).auth.getUser();
  const userData: CustomUser | null = user;

  return { user: userData || null, error: error?.message || null };
}
