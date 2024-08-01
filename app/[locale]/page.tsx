import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { SliderWrapper } from "@/components/slider/slider-wrapper";
import { SliderCard } from "@/components/slider/slider-card";
import {
  BriefcaseBusiness,
  Calculator,
  Cog,
  Cpu,
  FlaskConical,
  Handshake,
  Lightbulb,
  Megaphone,
  Network,
  Palette,
  Rocket,
  Trophy,
} from "lucide-react";
import { GridWrapper } from "@/components/grid/grid-wrapper";
import { GridCard } from "@/components/grid/grid-card";

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
            text={t("cooperationTitle")}
            description={t("cooperation")}
            icon={<Handshake />}
          />
          <SliderCard
            text={t("ideasExpertiseTitle")}
            description={t("ideasExpertise")}
            icon={<Lightbulb />}
          />
          <SliderCard
            text={t("contactNetworkTitle")}
            description={t("contactNetwork")}
            icon={<Network />}
          />
          <SliderCard
            text={t("existingProjectTitle")}
            description={t("existingProject")}
            icon={<Rocket />}
          />
        </SliderWrapper>
        <h3 className="text-center mt-20 text-3xl space-grotesk">
          {t('gridTitle')}
        </h3>
        <GridWrapper className="mt-20">
          <GridCard
            icon={<FlaskConical width={100} height={100} />}
            text={t('CategoryGrid.Science')}
          />
          <GridCard
            icon={<Cpu width={100} height={100} />}
            text={t('CategoryGrid.IT')}
          />
          <GridCard
            icon={<Trophy width={100} height={100} />}
            text={t('CategoryGrid.Sports')}
          />
          <GridCard
            icon={<Palette width={100} height={100} />}
            text={t('CategoryGrid.Arts')}
          />
          <GridCard
            icon={<BriefcaseBusiness width={100} height={100} />}
            text={t('CategoryGrid.Business')}
          />
          <GridCard
            icon={<Calculator width={100} height={100} />}
            text={t('CategoryGrid.Mathematics')}
          />
          <GridCard
            icon={<Cog width={100} height={100} />}
            text={t('CategoryGrid.Engineering')}
          />
          <GridCard
            icon={<Megaphone width={100} height={100} />}
            text={t('CategoryGrid.Communication')}
          />
        </GridWrapper>
      </main>
    </>
  );
}
