"use client";

import { Divider } from "@/components/divider";
import CustomPinProjectsList from "@/components/profile/custom-pin-projects-list";
import { CustomPinProjectsModal } from "@/components/profile/custom-pin-projects-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/user-context";
import { Pencil, Pin } from "lucide-react";
import { useRef, useState } from "react";

export default function Profile() {
  const { user, isLoading } = useUser();
  const [isShowAreaDescriptionEnabled, setIsShowAreaDescriptionEnabled] =
    useState<boolean>(false);
    const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);


  if (isLoading) {
    return <div>Loading..</div>;
  }

  const handleModifyUserDescription = () => {
    setIsShowAreaDescriptionEnabled(!isShowAreaDescriptionEnabled);
  };
  const sendNewUserDescriptionData = () => {
    console.log(descriptionTextAreaRef.current?.value)
    
    // user?.user_metadata.description =
  }

  return (
    <div>
      <h1 className="text-6xl font-bold  sm:text-4xl text-start mb-6 ">
        Profile
      </h1>
      <p className="text-3xl ">
        Hi, <span className="capitalize">{user?.user_metadata.name}</span>
      </p>
      <Divider className="my-4" />
      <div className="mb-8">
        <div className="flex gap-4 items-center mb-4">
          <p className="text-xl">About yourself</p>
          <Button
            variant={"ghost"}
            className="dark:text-gray-400 p-2"
            onClick={() => {
              handleModifyUserDescription();
            }}
          >
            <Pencil width={20} height={20} />
          </Button>
        </div>
        {isShowAreaDescriptionEnabled ? (
          <>
            <Textarea placeholder="Type your new description here"  ref={descriptionTextAreaRef} />
            <div className="flex gap-4">
              <Button className="mt-4" variant="destructive" onClick={() => setIsShowAreaDescriptionEnabled(false)}>
                Cancel
              </Button>
              <Button className="mt-4" variant="default" onClick={() => {
                sendNewUserDescriptionData()
              }}>
                Save
              </Button>
            </div>
          </>
        ) : (
          <p>{user?.user_metadata?.description || "No description provided"}</p>
        )}
      </div>
      <div className="flex">
        <div className="flex flex-col grow">
          <div className="flex grow">
            <p className="flex gap-2 items-center grow">
              <Pin width={20} height={20} />
              Pinned projects
            </p>
          </div>
          <CustomPinProjectsList />
        </div>
        <CustomPinProjectsModal />
      </div>
    </div>
  );
}
