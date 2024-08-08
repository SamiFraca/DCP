import { useTranslations } from "next-intl";
import { Metadata } from "next";


import GridHome from "@/components/grid/grid-home";
import SliderListHome from "@/components/slider/slider-list-home";
import ProjectListHome from "@/components/card/project-list-home";

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
        <div className="relative flex items-center justify-center w-full h-[300px] mt-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-bl from-purple-500/50 via-purple-500/30 to-transparent blur-2xl rounded-full w-[400px] h-[200px]" />
          </div>
          <div className="relative p-8 rounded-full z-10 space-grotesk">
            <h1 className="text-6xl font-bold text-center sm:text-7xl ">
              {t("title")}
            </h1>
            <h2 className="text-center text-[2rem] sm:text-[2.75rem] mt-4 text-md">
              Research Hub
            </h2>
          </div>
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
