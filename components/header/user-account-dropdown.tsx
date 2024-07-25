"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import Link from "next/link";
import { RootState } from "@/store";
import { LogOutModalPopup } from "@/components/header/log-out-popup";
import { useState } from "react";
export const UserAccountDropdown: React.FC = () => {
  const t = useTranslations("Header");
  const languageCode = useSelector((state: RootState) => state.language.code);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogOut = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <User className="" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount className="cursor-pointer">
          <DropdownMenuItem>
            <Link href={`/${languageCode}/profile`} className="w-full h-full">
              {t("profile")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span
              className="w-full h-full"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
                console.log(isModalOpen);
              }}
            >
              {t("logout")}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && (
        <LogOutModalPopup isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};
