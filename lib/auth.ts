import { NextApiRequest, NextApiResponse } from "next";
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

export async function signOutUser() {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/"; 
    } else {
      const errorData = await response.json();
      console.error("Failed to sign out:", errorData.error);
    }
  } catch (error) {
    console.error("An unexpected error occurred during sign out:", error);
  }
}
