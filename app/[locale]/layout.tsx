"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header/header";
import { Provider } from "react-redux";
import store from "@/store";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  return (
    <Provider store={store}>
      <html lang={locale}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
