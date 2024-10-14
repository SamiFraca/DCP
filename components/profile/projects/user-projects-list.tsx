"use client";
import { ProjectCard } from "@/components/card/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchUserProjects,
  UserSpecificProject,
} from "@/lib/fetchSupabaseData";
import { useEffect, useState } from "react";

export const UserProjectList = () => {
  const [userProjects, setUserProjects] = useState<UserSpecificProject>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function userProjects() {
      const { data, error } = await fetchUserProjects(true);
      data ? setUserProjects(data[0]) : setError(error?.message);
      setIsLoading(false);
    }
    userProjects();
  }, []);
  if (isLoading) {
    return (
        <div className="flex flex-wrap mt-10 gap-4">
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
      </div>
    );
  }
  return (
    <div>
      {userProjects ? (
        <ul>
          {userProjects.user_projects.map((project,index) => (
             <ProjectCard
             key={index}
             title={project.projects.name}
             author={'2'}
             category={project.projects.category}
             description={project.projects.description}
           />
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
