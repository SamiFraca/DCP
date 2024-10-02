"use client";

import { Bell, Book, Info, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
export const SideNavItemList = () => {
  const t = useTranslations("Profile");
  return (
    <ul className="flex md:flex-col gap-4 w-full md:w-auto flex-wrap">
      <li className="flex gap-2">
        <User width={20} height={20} />
        <Link href={"/profile"} className="underline-animation">
          {t("profile")}
        </Link>
      </li>
      <li className="flex gap-2">
        <Book width={20} height={20} />
        <Link href={"/profile/projects"} className="underline-animation">
          {t("yourProyects")}
        </Link>
      </li>
      <li className="flex gap-2">
        <Bell width={20} height={20} />
        <Link href={"/profile/notifications"} className="underline-animation">
          {t("notifications")}
        </Link>
      </li>
      <li className="flex gap-2">
        <Info width={20} height={20} />
        <Link
          href={"/profile/personal-information"}
          className="underline-animation"
        >
          {t("personalInformation")}
        </Link>
      </li>
    </ul>
  );
};
