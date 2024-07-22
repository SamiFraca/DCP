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
      <main className="flex  flex-col ">{t("title")}</main>
    </>
  );
}
