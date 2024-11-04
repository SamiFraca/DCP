import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { LandingFaqCollapsibleSection } from "@/components/home/landing-faq-collapsible";
import ProjectListHome from "@/components/card/project-list-home";
import RetroGrid from "@/components/ui/retro-grid";
import { FadeText } from "@/components/ui/fade-text";
import { BentoWrapper } from "@/components/home/bento";
import { ThreeDPhotoCarousel } from "@/components/ui/three-d-carousel";
import { CarouselHome } from "@/components/home/cards-carousel";
import TextRevealByWord from "@/components/ui/text-reveal";
import { Chart } from "@/components/ui/chart";
import InView from "@/components/transitions/in-view";
import HoverGallery from "@/components/ui/gallery-hover";
import { faqItems } from "@/components/home/landing-faq-collapsible";

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
    <section className="w-full">
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
        <CarouselHome />
        <BentoWrapper />
        <h3 className="max-w-7xl  mx-auto   text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center mt-20">
          {t("gridTitle")}
        </h3>
        <div className="w-full">
          <div className="min-h-[500px]  flex flex-col justify-center  rounded-lg space-y-4">
            <div className="p-2">
              <ThreeDPhotoCarousel />
            </div>
          </div>
        </div>
        <h3 className="max-w-7xl  mx-auto  ml-0 text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2">
          {t("featuredProjects")}
        </h3>
        <span className="h-1 w-16 bg-purple-500"></span>
        <ProjectListHome />
        <TextRevealByWord text="Uniting people throghout the world. TEST" />
        <div>
          <div className="flex flex-row  items-center w-full ">
            <InView
              variants={{
                hidden: { opacity: 0, y: 150, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="flex flex-col gap-4  w-full">
                <h2 className="text-6xl   font-sans font-bold">
                  Dynamic Growth
                </h2>
                <p>
                  Working on diverse projects is one of the best ways to build
                  real-world skills, as each project brings unique challenges
                  and requires a fresh approach. Every new technology learned is
                  an opportunity to broaden one’s knowledge and tackle problems
                  with different perspectives.
                </p>
              </div>
            </InView>
            <Chart />
          </div>
          <div className="flex md:flex-row flex-col  gap-4  w-full items-center mt-52">
            <InView
              variants={{
                hidden: { opacity: 0, x: 150 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 1, ease: "backIn" }}
            >
              <HoverGallery />
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <div className="text-right  ml-auto ">
                <h2 className="text-6xl   font-sans font-bold mb-6">
                  Resilience
                </h2>
                <p className="ml-auto  ">
                  Project work cultivates resilience, as navigating through
                  roadblocks and learning from failures is part of the process.
                  Each setback builds the persistence needed to overcome future
                  challenges, ensuring steady growth in both skills and
                  confidence.
                </p>
              </div>
            </InView>
          </div>
          <LandingFaqCollapsibleSection
            withBackgroundGlow
            backgroundGlowVariant="primary"
            title="FAQ"
            description="Looking to learn more about our product? Here are some of the most common
            questions."
            faqItems={faqItems}
          />
        </div>
      </div>
    </section>
  );
}
