import { useTranslations } from "next-intl";
export default function Test() {
  const t = useTranslations("Home");
  return (
    <main className="flex  flex-col">{t("title")}</main>
  );
}
