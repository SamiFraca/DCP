"use client";

import { Divider } from "@/components/divider";
import CustomPinProjectsList from "@/components/profile/custom-pin-projects-list";
import { CustomPinProjectsModal } from "@/components/profile/custom-pin-projects-modal";
import { useUser } from "@/context/user-context";
import { Link, Pin } from "lucide-react";

export default function Profile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading..</div>;
  }
  
  return (
    <div>
      <h1 className="text-6xl font-bold  sm:text-5xl text-start sr-only">
        Profile
      </h1>
      <p className="text-3xl ">
        Hi, <span className="capitalize">{user?.user_metadata.name}</span>
      </p>
      <Divider className="my-8" />
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
