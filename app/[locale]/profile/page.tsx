"use client";

import { Divider } from "@/components/divider";
import { CustomPinProjectsModal } from "@/components/profile/custom-pin-projects-modal";
import { useUser } from "@/context/user-context";
import { Link, Pin } from "lucide-react";

export default function Profile() {
  const { user, isLoading, error } = useUser();

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
        <p className="flex gap-2 items-center grow">
          <Pin width={20} height={20} />
          Pinned projects
        </p>
        <CustomPinProjectsModal/>
      </div>
    </div>
  );
}
