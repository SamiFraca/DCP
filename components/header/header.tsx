import Image from "next/image";
import { NavItem } from "./nav-item";
import LangSwitcher from "./lang-switcher";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { UserAccountDropdown } from "@/components/header/user-account-dropdown";

export const Header = () => {
  const languageCode = useSelector((state: RootState) => state.language.code);

  const user = useSelector((state: RootState) => state.auth.user);

  const t = useTranslations("Header");
  return (
    <header className="md:flex flex-col py-10 hidden sticky top-0 bg-[hsl(var(--background))]  z-20 w-full px-12">
      <nav aria-label="Main Navigation ">
        <ul className="flex gap-10 items-center">
          <li className="flex-shrink-0 grow">
            <Link href={`/${languageCode}`} aria-label="Home" className="text-3xl space-grotesk">
              ResearchHub
            </Link>
          </li>
          <li>
            <NavItem href={`/${languageCode}`}>{t("home")} </NavItem>
          </li>
          <li>
            <NavItem href={`/${languageCode}/projects`}>
              {t("projects")}
            </NavItem>
          </li>
          <li>
            <NavItem href={`/${languageCode}/about`}>{t("about")}</NavItem>
          </li>
          <li>
            {user ? (
              <UserAccountDropdown />
            ) : (
              <NavItem href={`/${languageCode}/login`}>
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
