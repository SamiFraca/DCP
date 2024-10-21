import { useTranslations } from "next-intl";
import { Metadata } from "next";

import GridHome from "@/components/grid/grid-home";
import SliderListHome from "@/components/slider/slider-list-home";
import ProjectListHome from "@/components/card/project-list-home";
import RetroGrid from "@/components/ui/retro-grid";
import { FadeText } from "@/components/ui/fade-text";

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
  const registrationSuccess = searchParams?.register;
  const loginSuccess = searchParams?.login;
  const successMessage = registrationSuccess
    ? t("registerSuccess")
    : loginSuccess
    ? t("loginSuccess")
    : null;
  return (
    <>
      <div className="flex flex-col  w-full relative">
        {successMessage && (
          <div className="fixed top-30 bg-green-500  text-white text-center p-2 rounded-b-md transition-transform duration-500 notification w-max z-20 ">
            {successMessage}
          </div>
        )}
        <div className="relative p-8 z-10 space-grotesk  flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background text-center  ">
          <h1>
            <FadeText
              className="sm:text-7xl pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-r  text-center text-7xl font-bold leading-none tracking-tighter text-transparent relative bg-clip-text  bg-no-repeat  from-purple-500 via-violet-500 to-pink-500 py-4 "
              text={t("title")}
              direction="up"
              framerProps={{
                show: { transition: { delay: 0.3 } },
              }}
            />
          </h1>
          <h2 className="text-center">
            <FadeText
              text="Research hub"
              className="text-[2rem] sm:text-[2.75rem] mt-4 text-md"
              direction="right"
              framerProps={{
                show: { transition: { delay: 0.7 } },
              }}
            />
          </h2>
          <RetroGrid />
        </div>
        <SliderListHome />
        <h3 className="text-center mt-20 text-3xl space-grotesk">
          {t("gridTitle")}
        </h3>
        <GridHome />
        <h3 className="text-3xl space-grotesk mt-20 mb-2">
          {t("featuredProjects")}
        </h3>
        <span className="h-1 w-12 bg-purple-500"></span>
        <ProjectListHome />
      </div>
    </>
  );
}
