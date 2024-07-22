import Image from "next/image";
import { NavItem } from "./nav-item";
import { useTranslations } from "next-intl";
import LangSwitcher from "./lang-switcher";

export const Header = () => {

  return (
    <header className="flex flex-col p-10">
      <nav aria-label="Main Navigation ">
        <ul className="flex gap-10 items-center">
          <li className="flex-shrink-0 grow">
            <a href="/" aria-label="Home">
              <Image
                src="/logo.svg"
                alt="web logo"
                width={100}
                height={40}
                priority
              />
            </a>
          </li>
          <NavItem href="/" label="Home" />
          <NavItem href="/en/test" label="Projects" />
          <NavItem href="/about" label="About" />
          <LangSwitcher />
        </ul>
      </nav>
    </header>
  );
};
