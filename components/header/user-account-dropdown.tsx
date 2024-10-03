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
import Link from "next/link";
import { LogOutModalPopup } from "@/components/header/log-out-popup";
import { useState } from "react";
import { Avatar } from "../ui/avatar";
import defaultProfileImage from "@/assets/img/default-profile.png";
import { useUserContext } from "@/context/user-context";
import Image from "next/image";
export const UserAccountDropdown: React.FC = () => {
  const t = useTranslations("Header");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const profileImageUser =
    useUserContext().contextUser?.user_metadata.profile_image;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0">
            <Avatar className="w-8 h-8">
              <Image
                src={profileImageUser ?? defaultProfileImage.src}
                width={200}
                height={200}
                alt="profile"
                className="md:mx-auto rounded-full"
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount className="cursor-pointer">
          <DropdownMenuItem>
            <Link href={`/profile`} className="w-full h-full">
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
