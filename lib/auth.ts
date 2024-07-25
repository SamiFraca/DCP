import { supabase } from "./supabaseClient";

export async function signUp(email: string, password: string) {
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Sign up error:", error.message);
    return { error: error.message };
  }

  return { user };
}

export async function signIn(email: string, password: string) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign in error:", error.message);
    return { error: error.message };
  }

  return { user };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  


  if (error) {
    console.error("Sign out error:", error.message);
    return { error: error.message };
  }

  return {};
}
