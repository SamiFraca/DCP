import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';

const locales: string[] = ['en','es'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../public/content/${locale}.json`)).default
  };
});