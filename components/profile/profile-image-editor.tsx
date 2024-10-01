"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import defaultImageAvatar from "@/assets/img/default-profile.png";
import { uploadProfileImage } from "@/lib/profileImages";
import { ModalPopup } from "../global/popup-modal";
import { Edit } from "lucide-react";
import { AlertInput } from "../alert/alert-input";
import { useUserContext } from "@/context/user-context";

const ProfileImageEditor = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState<{
    profile_image?: string;
  }>({});
  const profileImageUser =
    useUserContext().contextUser?.user_metadata.profile_image;
  const { updateUserContextMetadata } = useUserContext();
  const [profileUpdateErrorMessage, setProfileUpdateErrorMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (profileImageUser) {
      setUserProfileImage({ profile_image: profileImageUser });
    } else {
      setUserProfileImage({ profile_image: defaultImageAvatar.src });
    }
  }, [profileImageUser]);

  const handleFileSubmit = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      console.error("No file selected");
      setProfileUpdateErrorMessage("No file selected");
      return false;
    }
    try {
      const newProfileImage = await uploadProfileImage(file);

      if (newProfileImage) {
        setUserProfileImage({ profile_image: newProfileImage });
        updateUserContextMetadata({ profile_image: newProfileImage });
      } else {
        console.error("Failed to upload profile image");
        setProfileUpdateErrorMessage("Failed to upload profile image");
        return false;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setProfileUpdateErrorMessage("Error uploading file:" + error);
      return false;
    } finally {
      return true;
    }
  };

  return (
    <button
      className="group dark:hover:bg-gray-700 hover:bg-gray-200 rounded-md bg-opacity-95 z-10 relative max-w-fit mx-auto"
      onClick={() => setIsModalOpen(true)}
    >
      <span className="dark:bg-gray-700 bg-gray-400 bg-opacity-95 rounded-full p-1 absolute bottom-0 right-0  group-hover:dark:bg-gray-700 group-hover:bg-gray-200  ">
        <Edit width={20} height={20} className="text-white dark:text-inherit" />
      </span>
      {isModalOpen && (
        <ModalPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dialogTitle="Profile image"
          dialogDescription="Edit your profile image"
          onAccept={() => handleFileSubmit()}
        >
          <input
            type="file"
            className="cursor-pointer"
            ref={fileInputRef}
            accept="image/*"
          />
          {profileUpdateErrorMessage && (
            <AlertInput variant="error" message={profileUpdateErrorMessage} />
          )}
        </ModalPopup>
      )}

      <Image
        src={userProfileImage.profile_image ?? defaultImageAvatar.src}
        width={200}
        height={200}
        alt="profile"
        className="md:mx-auto rounded-full"
      />
    </button>
  );
};

export default ProfileImageEditor;
