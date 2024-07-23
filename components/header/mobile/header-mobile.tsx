import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NavItem } from "@/components/header/nav-item";
import LangSwitcher from "../lang-switcher";
import { ModeToggle } from "../mode-toggle";

export function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const languageCode = useSelector((state: RootState) => state.language.code);

  const mobileItems = [
    { href: `/${languageCode}`, label: "Home" },
    { href: `/${languageCode}/projects`, label: "Projects" },
    { href: `/${languageCode}/about`, label: "About" },
  ];

  return (
    <header className="md:hidden flex p-5">
      <nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="w-9 h-9" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <ul className="flex flex-col items-start">
              <div className="flex">
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
                    label={item.label}
                  ></NavItem>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
