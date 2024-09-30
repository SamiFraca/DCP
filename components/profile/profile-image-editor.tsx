"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import defaultImageAvatar from "@/assets/img/default-profile.png";
import { uploadProfileImage } from "@/lib/profileImages";
import { ModalPopup } from "../global/popup-modal";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";

const ProfileImageEditor = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadProfileImage(file);
    }
  };

  return (
    <button
      className="group dark:hover:bg-gray-700 hover:bg-gray-200 rounded-md bg-opacity-95 z-10 relative max-w-fit mx-auto"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      <span className="dark:bg-gray-700 bg-gray-400 bg-opacity-95 rounded-full p-1 absolute bottom-0 right-0  group-hover:dark:bg-gray-700 group-hover:bg-gray-200  ">
        <Edit width={20} height={20} className="text-white dark:text-inherit" />
      </span>
      <ModalPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <input
          type="file"
          className="cursor-pointer"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
      </ModalPopup>

      <Image
        src={defaultImageAvatar.src}
        width={120}
        height={120}
        alt="profile"
        className="md:mx-auto"
      />
    </button>
  );
};

export default ProfileImageEditor;
