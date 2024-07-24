"use client";

import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Header } from "@/components/header/header";
import { HeaderMobile } from "@/components/header/mobile/header-mobile";
import {Loader} from "@/components/loader/loader";

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export function ClientLayout({ children, locale }: ClientLayoutProps) {
  const { width } = useWindowSize();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = (await import(`@/public/content/${locale}.json`))
          .default;
        setMessages(messages);
      } catch (error) {
        notFound();
      }
    }
    loadMessages();
  }, [locale]);

  if (!messages) {
    return <Loader />;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {width >= 768 ? <Header /> : <HeaderMobile />}
      {children}
    </NextIntlClientProvider>
  );
}
