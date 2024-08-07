// app/api/auth/signout/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST() {
  // Sign out from Supabase
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
  const allCookies = cookies();
  const authTokenCookieArray: Array<{ name: string; value: string }> = [];

  allCookies.getAll().map((cookie) => {
    if (cookie.name.match("auth-token")) {
      authTokenCookieArray.push(cookie);
    }
  });

  if (authTokenCookieArray.length > 0) {
    const cookieHeaders = authTokenCookieArray.map((cookie) => {
      return serialize(cookie.name, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: -1, // Expire the cookie
      });
    });

    const cookiesString = cookieHeaders.join(", ");

    return NextResponse.json(
      { message: "Signed out successfully" },
      {
        headers: {
          "Set-Cookie": cookiesString,
        },
      }
    );
  }
  return NextResponse.json({ message: "No cookies to sign out" });
}
