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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export const UserAccountDropdown: React.FC = () => {
  const t = useTranslations("Header");
  const languageCode = useSelector((state: RootState) => state.language.code);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png"  />
              <AvatarFallback><User/></AvatarFallback>
            </Avatar>
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
