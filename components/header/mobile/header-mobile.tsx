import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NavItem } from "@/components/header/nav-item";
import LangSwitcher from "../lang-switcher";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";
import { UserAccountDropdown } from "../user-account-dropdown";

export function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const languageCode = useSelector((state: RootState) => state.language.code);
  const user = useSelector((state: RootState) => state.auth.user);
  const t = useTranslations("Header");

  const mobileItems = [
    { href: `/${languageCode}`, label: "home" },
    { href: `/${languageCode}/projects`, label: "projects" },
    { href: `/${languageCode}/about`, label: "about" },
  ];

  return (
    <header className="md:hidden flex p-5">
      <nav className="flex items-center w-full">
        <Link
          href={`/${languageCode}`}
          aria-label="Home"
          className="grow flex shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="web logo"
            width={100}
            height={40}
            priority
          />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="w-9 h-9" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <VisuallyHidden.Root>Mobile menu header</VisuallyHidden.Root>
              </SheetDescription>
            </SheetHeader>
            <SheetTitle>
              <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
            </SheetTitle>
            <ul className="flex flex-col items-start">
              <div className="flex items-center p-4 w-full">
                <li className="flex grow">
                  {user ? (
                    <UserAccountDropdown />
                  ) : (
                    <NavItem
                      href={`/${languageCode}/login`}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
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
              </div>
              {mobileItems.map((item, index) => (
                <li key={index} className="text-lg border-b w-full p-4">
                  <NavItem
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    {t(item.label)}
                  </NavItem>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
