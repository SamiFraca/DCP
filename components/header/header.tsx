"use client";
import { NavItem } from "./nav-item";
import LangSwitcher from "./lang-switcher";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { UserAccountDropdown } from "@/components/header/user-account-dropdown";

import { useEffect, useState } from "react";
import getUser from "@/lib/getUser";

export const Header = () => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { user, error } = await getUser();
      if (user) {
        setUserData(user);
      }
    }
    fetchUser();
  }, []);

  const t = useTranslations("Header");

  return (
    <header className="md:flex flex-col py-10 hidden sticky top-0 backdrop-blur z-20 w-full px-12">
      <nav aria-label="Main Navigation">
        <ul className="flex gap-10 items-center">
          <li className="flex-shrink-0 grow">
            <Link
              href={`/`}
              aria-label="Home"
              className="text-3xl space-grotesk"
            >
              ResearchHub
            </Link>
          </li>
          <li>
            <NavItem href={`/`}>{t("home")}</NavItem>
          </li>
          <li>
            <NavItem href={`/projects`}>{t("projects")}</NavItem>
          </li>
          <li>
            <NavItem href={`/about`}>{t("about")}</NavItem>
          </li>
          <li>
            {userData !== null ? (
              <UserAccountDropdown />
            ) : (
              <NavItem href={`/login`}>
                <User />
              </NavItem>
            )}
          </li>
          <li>
            <LangSwitcher />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};
