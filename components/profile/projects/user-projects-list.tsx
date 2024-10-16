"use client";
import { ProjectCard } from "@/components/card/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetcher } from "@/hooks/useFetcher";
import useSWR from "swr";

export const UserProjectList = () => {
  const { data: userProjects, error } = useSWR(
    "/api/profile/user/projects",
    useFetcher
  );

  if (error) return <div>Error loading projects</div>;
  if (!userProjects) return <div>Loading...</div>;

  if (!userProjects) {
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
          {userProjects.map((project) => (
            <ProjectCard
              key={project.projects.id}
              title={project.projects.name}
              category={project.projects.category}
              description={project.projects.description}
              users={project.userData}
            />
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
