// app/api/auth/signout/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Import your Supabase client
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export async function POST() {
  // Sign out from Supabase
  const { error } = await supabase.auth.signOut();
  const cookieStore = cookies()

  if (error) {
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }

  // Set the cookie to expire
  const cookieHeader = serialize('look for "auth-token" cookie name', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: -1, // Expire the cookie
  });

  return NextResponse.json({ message: 'Signed out successfully' }, {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  });
}