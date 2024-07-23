import Image from "next/image";
import { NavItem } from "./nav-item";
import { useTranslations } from "next-intl";
import LangSwitcher from "./lang-switcher";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export const Header = () => {
  const languageCode = useSelector((state: RootState) => state.language.code);
  return (
    <header className="md:flex flex-col p-10 hidden">
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
          <NavItem href={`/${languageCode}`} label="Home" />
          <NavItem href={`/${languageCode}/projects`} label="Projects" />
          <NavItem href={`/${languageCode}/about`} label="About" />
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
