"use client";
import { Space_Grotesk, Roboto } from "next/font/google";
import "../globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientLayout } from "@/app/[locale]/clientLayout";
import React from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import { UserProvider } from "@/context/user-context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html
      lang={params.locale}
      suppressHydrationWarning={true}
      className="h-full"
    >
      <body
        className={`${spaceGrotesk.variable} ${roboto.variable} h-full flex flex-col `}
      >
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <UserProvider >
                <ClientLayout locale={params.locale}>{children}</ClientLayout>
              </UserProvider>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
