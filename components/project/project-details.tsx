"use client";
import React from "react";
import { Divider } from "../global/divider";
import useSWR from "swr";
import { useFetcher } from "@/hooks/useFetcher";
import { IndividualProjectData } from "@/app/api/profile/user/project/[id]/route";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

type ProjectDetailsProps = {
  id: string;
  name: string;
  mode: "private" | "public";
};

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  id,
  name,
  mode,
}) => {
  const { data: userProject, error } = useSWR<IndividualProjectData>(
    `/api/profile/user/project/${id}`,
    useFetcher
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (!userProject) {
    return (
      <div>
        <h1 className="text-6xl font-bold sm:text-4xl text-start mb-6">
          {name}
        </h1>
        <Divider className="mb-6"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-6xl font-bold sm:text-4xl text-start mb-6">
        {userProject.name ?? name}
      </h1>
      <Divider className="mb-6"/>
      <p className="flex gap-2 mb-4 text-lg">
        Category:
        <span>
          {userProject.category === "" || userProject.category === null
            ? "No description provided"
            : userProject.category}
        </span>
      </p>
      <p className="flex gap-2 text-lg ">Description:</p>
      <p className="mt-4 ml-4">
        {userProject.description === "" || userProject.description === null
          ? "No description provided"
          : userProject.description}
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <p className="text-lg">Project users</p>
        {userProject.userData && (
          <ul className="flex flex-col gap-4">
            {userProject.userData.map((user) => {
              return (
                <li key={user.id}>
                  <div className="flex gap-2 ml-4">
                    <Image
                      width={30}
                      height={30}
                      className="rounded-full shrink-0"
                      src={user.profile_image}
                      alt={`${user.name}'s profile image`}
                    />
                    {user.name}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
