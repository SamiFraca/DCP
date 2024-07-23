import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DCP - Developer Collaboration Platform",
  description: "Developer Collaboration Platform",
};
export default function Home() {
  const t = useTranslations("Home");
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full  ">
        <div className="relative flex items-center justify-center w-full h-[300px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-bl from-purple-500/50 via-purple-500/30 to-transparent blur-2xl rounded-full w-[400px] h-[200px]" />
          </div>
          <div className="relative p-8 rounded-full z-10">
            <h1 className="text-5xl font-bold text-center ">
              {t("title")}
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
