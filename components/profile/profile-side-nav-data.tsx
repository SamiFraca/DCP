"use client";

import getUser from "@/lib/getUser";
import { LoaderCircle, MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { updateUserSideNavData } from "@/lib/fetchSupabaseData";
import { AlertInput } from "../alert/alert-input";
import { MainInterestDropdown } from "../global/main-interest-dropdown";
import { CountryDropdown } from "../global/countries-dropdown";
import { CustomUser } from "@/context/types";
import CustomRegionDropdown from "../global/region-dropdown";
import SuccessNotification from "../global/success-notification";
import Image from "next/image";

export const ProfileSideNavData = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [toggleEditData, setToggleEditData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [editedData, setEditedData] = useState({
    name: "",
    last_name: "",
    country: "",
    main_field: "",
    region: "",
    flag: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const data = await getUser();
      setUser(data?.user);
      setEditedData({
        name: data?.user?.user_metadata?.name || "",
        last_name:
          data?.user?.user_metadata?.last_name ||
          data?.user?.user_metadata?.lastName ||
          "",
        country: data?.user?.user_metadata?.country || "",
        main_field:
          data?.user?.user_metadata?.main_field ||
          data?.user?.user_metadata?.mainField ||
          "",
        region: data?.user?.user_metadata.region || "",
        flag: data?.user?.user_metadata.flag || "",
      });
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setToggleEditData(!toggleEditData);
  };

  const handleCancelButtonToggle = () => {
    setEditedData({
      name: user?.user_metadata.name || "",
      last_name:
        user?.user_metadata.last_name || user?.user_metadata.lastName || "",
      country: user?.user_metadata.country || "",
      main_field: user?.user_metadata.main_field || "",
      region: user?.user_metadata.region || "",
      flag: user?.user_metadata.flag || "",
    });
    setToggleEditData(!toggleEditData);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSelectChange = (value: string, name: string, flag?: string) => {
    if (name === "country") {
      setEditedData((prevData) => ({
        ...prevData,
        region: "",
        country: value,
        flag: flag || "",
      }));
    }
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const updatedFields: Partial<typeof editedData> = {};
    (Object.keys(editedData) as (keyof typeof editedData)[]).forEach((key) => {
      if (editedData[key] !== user?.user_metadata[key]) {
        updatedFields[key] = editedData[key];
      }
    });

    if (Object.keys(updatedFields).length > 0) {
      setIsSendingData(true);
      const { error, success } = await updateUserSideNavData(updatedFields);

      if (success) {
        setUser((prevUser: any) => ({
          ...prevUser,
          user_metadata: { ...prevUser.user_metadata, ...updatedFields },
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
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-48 animate-pulse rounded-md"></Skeleton>
          <Skeleton className="h-6 w-48 animate-pulse rounded-md"></Skeleton>
          <Skeleton className="h-6 w-48 animate-pulse rounded-md"></Skeleton>
        </div>
      ) : (
        <>
          {!toggleEditData ? (
            <>
              <p className="font-semibold text-xl capitalize">
                {user?.user_metadata.lastName && (
                  <span>{editedData.last_name}, </span>
                )}
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
                  {user?.user_metadata.region && <>, {editedData.region}</>}
                </p>
              </div>
              <p>Main interest: {editedData.main_field}</p>
              <Button
                className="mt-2"
                onClick={handleEditToggle}
                variant={"secondary"}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div>
                  <Label htmlFor="last_name" className="text-sm">
                    Last Name
                  </Label>
                  <Input
                    value={editedData.last_name}
                    onChange={handleInputChange}
                    name="last_name"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <Label htmlFor="Name" className="text-sm">
                    Name
                  </Label>
                  <Input
                    value={editedData.name}
                    onChange={handleInputChange}
                    name="name"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <Label htmlFor="country" className="text-sm">
                Country
              </Label>
              <CountryDropdown
                placeholderText={
                  <span className="flex items-center gap-2">
                    <Image
                      src={editedData.flag}
                      width={20}
                      height={20}
                      alt="country flag"
                    />
                    {editedData.country}
                  </span>
                }
                onChange={handleSelectChange}
              />
              <Label htmlFor="region" className="text-sm">
                Region
              </Label>
              <CustomRegionDropdown
                placeholderText={editedData.region}
                country={editedData.country}
                onChange={handleSelectChange}
              />

              <Label htmlFor="main_field" className="text-sm">
                Main Interest
              </Label>
              <MainInterestDropdown
                placeholder={editedData.main_field}
                onChange={handleSelectChange}
                selectorName="main_field"
              />
              <div className="flex gap-2 mt-4">
                <Button
                  variant={"default"}
                  onClick={handleSave}
                  disabled={isSendingData}
                >
                  {isSendingData ? (
                    <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />
                  ) : (
                    ""
                  )}
                  Save
                </Button>
                <Button
                  onClick={handleCancelButtonToggle}
                  variant={"destructive"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {success && (
        <SuccessNotification successMessage="Profile updated succesfully" />
      )}
      {messageError && <AlertInput variant="info" message={messageError} />}
    </>
  );
};
