"use client";
import { Space_Grotesk, Roboto } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header/header";
import { Provider } from "react-redux";
import store from "@/store";

import { ThemeProvider } from "@/components/theme-provider";
import { HeaderMobile } from "@/components/header/mobile/header-mobile";
import { useWindowSize } from "@/hooks/useWindowSize";

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}
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

export default function RootLayout({ children, locale }: RootLayoutProps) {
  const { width } = useWindowSize();
  return (
    <Provider store={store}>
      <html lang={locale} suppressHydrationWarning={true}>
        <body className={`${spaceGrotesk.variable} ${roboto.variable} mx-12` }>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {width >= 768 ? <Header /> : <HeaderMobile />}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
