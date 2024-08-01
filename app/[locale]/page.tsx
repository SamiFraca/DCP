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
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Research Hub",
  description: "Empower your projects",
};
export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const t = useTranslations("Home");
  const registrationSuccess = searchParams?.registration;
  const loginSuccess = searchParams?.login;
  const successMessage = registrationSuccess ? t('registerSuccess') : loginSuccess ? t('loginSuccess') : null;
  return (
    <>
      <div className="flex flex-col  w-full max-w-[1440px] relative">
        {successMessage && (
          <div className="fixed top-30 bg-green-500  text-white text-center p-2 rounded-b-md transition-transform duration-500 notification w-max z-20 ">
            {successMessage}
          </div>
        )}
        
        <div className="relative flex items-center justify-center w-full h-[300px] mt-12">
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
          {t("gridTitle")}
        </h3>
        <GridWrapper className="mt-20 max-w-screen-[1440px]">
          <GridCard
            icon={<FlaskConical width={100} height={100} />}
            text={t("CategoryGrid.Science")}
          />
          <GridCard
            icon={<Cpu width={100} height={100} />}
            text={t("CategoryGrid.IT")}
          />
          <GridCard
            icon={<Trophy width={100} height={100} />}
            text={t("CategoryGrid.Sports")}
          />
          <GridCard
            icon={<Palette width={100} height={100} />}
            text={t("CategoryGrid.Arts")}
          />
          <GridCard
            icon={<BriefcaseBusiness width={100} height={100} />}
            text={t("CategoryGrid.Business")}
          />
          <GridCard
            icon={<Calculator width={100} height={100} />}
            text={t("CategoryGrid.Mathematics")}
          />
          <GridCard
            icon={<Cog width={100} height={100} />}
            text={t("CategoryGrid.Engineering")}
          />
          <GridCard
            icon={<Megaphone width={100} height={100} />}
            text={t("CategoryGrid.Communication")}
          />
        </GridWrapper>
        <h3 className="text-3xl space-grotesk mt-20 mb-2">Featured Projects</h3>
        <span className="h-1 w-12 bg-purple-500"></span>
        <ul className="flex flex-wrap gap-4 mt-10">
          <ProjectCard
            title="Python chatbot"
            author="Mesmer"
            category="Computer & IT"
            description="Python chatbot for discord to play games"
          />
          <ProjectCard
            title="Travel Blog Website"
            author="Wanderlust"
            category="Travel"
            description="Share your travel experiences and tips with fellow travelers"
          />

          <ProjectCard
            title="Web Development Course"
            author="CodeGeek"
            category="Education"
            description="Learn HTML, CSS, and JavaScript in this interactive course"
          />
          <ProjectCard
            title="Mobile App for Fitness"
            author="FitTech"
            category="Health & Wellness"
            description="Track your fitness progress and get personalized workout routines"
          />
          <ProjectCard
            title="E-commerce Platform"
            author="ShopifyMaster"
            category="Business"
            description="Build your own online store with customizable features"
          />
          <ProjectCard
            title="Recipe Sharing App"
            author="FoodieDev"
            category="Food & Drink"
            description="Discover and share delicious recipes with other food enthusiasts"
          />
          <ProjectCard
            title="Online Event Management System"
            author="EventPlanner"
            category="Event Planning"
            description="Organize and manage events with ease using this platform"
          />
        </ul>
      </div>
    </>
  );
}
