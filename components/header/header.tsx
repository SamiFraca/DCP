import Image from "next/image";
import { NavItem } from "./nav-item";
import LangSwitcher from "./lang-switcher";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { UserRound } from "lucide-react";

export const Header = () => {
  const languageCode = useSelector((state: RootState) => state.language.code);

  const user = useSelector((state: RootState) => state.auth.user);

  const t = useTranslations("Header");
  return (
    <header className="md:flex flex-col py-10 hidden">
      <nav aria-label="Main Navigation ">
        <ul className="flex gap-10 items-center">
          <li className="flex-shrink-0 grow">
            <Link href={`/${languageCode}`} aria-label="Home">
              <Image
                src="/logo.svg"
                alt="web logo"
                width={100}
                height={40}
                priority
              />
            </Link>
          </li>
          <NavItem href={`/${languageCode}`}>{t("home")} </NavItem>
          <NavItem href={`/${languageCode}/projects`}>{t("projects")}</NavItem>
          <NavItem href={`/${languageCode}/about`}>{t("about")}</NavItem>
          <NavItem href={`/${languageCode}/${user ? "account" : "login"}`}>
            <UserRound />
          </NavItem>
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
