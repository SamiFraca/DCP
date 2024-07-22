"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header/header";
import { Provider } from "react-redux";
import store from "@/store";
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  return (
    <Provider store={store}>
      <html lang={locale}>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </Provider>
  );
}
