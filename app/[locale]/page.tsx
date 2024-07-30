import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { SliderWrapper } from "@/components/slider/slider-wrapper";
import { SliderCard } from "@/components/slider/slider-card";
import {  Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Hub",
  description: "Empower your projects",
};
export default function Home() {
  const t = useTranslations("Home");
  return (
    <>
      <main className="flex flex-col  w-full">
        <div className="relative flex items-center justify-center w-full h-[300px] ">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-bl from-purple-500/50 via-purple-500/30 to-transparent blur-2xl rounded-full w-[400px] h-[200px]" />
          </div>
          <div className="relative p-8 rounded-full z-10 space-grotesk">
            <h1 className="text-7xl font-bold text-center ">{t("title")}</h1>
            <h2 className="text-center text-[2.75rem] mt-4 text-md">
              Research Hub
            </h2>
          </div>
        </div>
        <SliderWrapper>
          <SliderCard
            text={t('cooperationTitle')}
            description={t('cooperation')}
            icon={<Handshake/>}
          />
          <SliderCard
            text={t('cooperationTitle')}
            description={t('cooperation')}
            icon={<Handshake/>}
          />
          <SliderCard
            text={t('cooperationTitle')}
            description={t('cooperation')}
            icon={<Handshake/>}
          />
          <SliderCard
            text={t('cooperationTitle')}
            description={t('cooperation')}
            icon={<Handshake/>}
          />
        </SliderWrapper>
      </main>
    </>
  );
}
