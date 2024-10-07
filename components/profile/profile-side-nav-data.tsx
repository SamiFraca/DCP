"use client";

import getUser from "@/lib/getUser";
import { Github, Linkedin, LoaderCircle, MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { updateUserSideNavData } from "@/lib/fetchSupabaseData";
import { AlertInput } from "../alert/alert-input";
import SuccessNotification from "../global/success-notification";
import Image from "next/image";
import { CustomUser } from "@/context/user-context";
import { useTranslations } from "next-intl";
import { EditProfileSideNavData } from "./edit-profile-side-nav-data";

export type editedDataProps = {
  name: string;
  last_name: string;
  country: string;
  main_field: string;
  region: string;
  flag: string;
  linkedin: string;
  github: string;
};
export const ProfileSideNavData = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [toggleEditData, setToggleEditData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const t = useTranslations("Profile");
  const [editedData, setEditedData] = useState({
    name: "",
    last_name: "",
    country: "",
    main_field: "",
    region: "",
    flag: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const data = await getUser();
      const userData = data?.user;
      setUser(userData);
      setEditedData({
        name: userData?.user_metadata?.name ?? "",
        last_name: userData?.user_metadata?.last_name ?? "",
        country: userData?.user_metadata?.country ?? "",
        main_field: userData?.user_metadata?.main_field ?? "",
        region: userData?.user_metadata?.region ?? "",
        flag: userData?.user_metadata?.flag ?? "",
        linkedin: userData?.user_metadata?.linkedin ?? "",
        github: userData?.user_metadata?.github ?? "",
      });
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => setToggleEditData(!toggleEditData);

  const handleCancelButtonToggle = () => {
    if (user) {
      setEditedData({
        name: user?.user_metadata.name ?? "",
        last_name: user?.user_metadata.last_name ?? "",
        country: user?.user_metadata.country ?? "",
        main_field: user?.user_metadata.main_field ?? "",
        region: user?.user_metadata.region ?? "",
        flag: user?.user_metadata.flag ?? "",
        linkedin: user?.user_metadata?.linkedin ?? "",
        github: user?.user_metadata?.github ?? "",
      });
    }
    setToggleEditData(false);
    setMessageError(null);
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedFields: Partial<typeof editedData> = {};
    Object.keys(editedData).forEach((key) => {
      const fieldKey = key as keyof typeof editedData;
      if (editedData[fieldKey] !== user.user_metadata[fieldKey]) {
        updatedFields[fieldKey] = editedData[fieldKey];
      }
    });

    if (Object.keys(updatedFields).length > 0) {
      setIsSendingData(true);
      const { error, success } = await updateUserSideNavData(updatedFields);

      if (success) {
        setUser((prevUser) => ({
          ...prevUser!,
          user_metadata: { ...prevUser!.user_metadata, ...updatedFields },
        }));
        setToggleEditData(false);
        setSuccess(true);
      }

      if (error) {
        setMessageError(error);
      }

      setIsSendingData(false);
    } else {
      setMessageError("No field has been changed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-48 animate-pulse rounded-md" />
        <Skeleton className="h-6 w-48 animate-pulse rounded-md" />
        <Skeleton className="h-6 w-48 animate-pulse rounded-md" />
      </div>
    );
  }

  return (
    <>
      {!toggleEditData ? (
        <>
          <p className="font-semibold text-xl capitalize">
            {editedData.last_name && <span>{editedData.last_name}, </span>}
            {editedData.name}
          </p>
          <div className="flex gap-2 items-center">
            <MapPinIcon />
            <p className="flex gap-2">
              <Image
                src={editedData.flag}
                alt="country flag"
                width={20}
                height={20}
              />
              {editedData.country}
              {editedData.region && <>, {editedData.region}</>}
            </p>
          </div>
          <p>Main interest: {editedData.main_field}</p>
          <ul className="flex gap-2">
            {editedData.github && (
              <li>
                <a
                  title={`go to ${editedData.name}'s github`}
                  href={`${editedData.github}`}
                >
                  <Github
                    width={30}
                    height={30}
                    className="rounded-full bg-accent hover:text-accent-foreground dark:text-gray-300 cursor-pointer p-1"
                  />
                </a>
              </li>
            )}
            {editedData.linkedin && (
              <li>
                <a
                  title={`go to ${editedData.name}'s linkedin`}
                  href={`${editedData.linkedin}`}
                >
                  <Linkedin
                    width={30}
                    height={30}
                    className="rounded-md bg-accent hover:text-accent-foreground dark:text-gray-300 cursor-pointer p-1"
                  />
                </a>
              </li>
            )}
          </ul>

          <Button
            className="mt-2"
            onClick={handleEditToggle}
            variant={"secondary"}
          >
            Edit Profile
          </Button>
        </>
      ) : (
        <>
          <EditProfileSideNavData
            editedData={editedData}
            setEditedData={setEditedData}
          />
          <div className="flex gap-2 mt-4">
            <Button
              variant={"default"}
              onClick={handleSave}
              disabled={isSendingData}
            >
              {isSendingData && (
                <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />
              )}
              Save
            </Button>
            <Button onClick={handleCancelButtonToggle} variant={"destructive"}>
              Cancel
            </Button>
          </div>
        </>
      )}
      {success && (
        <SuccessNotification successMessage="Profile updated successfully" />
      )}
      {messageError && <AlertInput variant="info" message={messageError} />}
    </>
  );
};
