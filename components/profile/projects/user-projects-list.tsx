"use client";
import { UserProjectListData } from "@/app/api/profile/user/projects/route";
import { ProjectCard } from "@/components/card/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLayout } from "@/context/profile/projects/toggle-layout-projects";
import { useFetcher } from "@/hooks/useFetcher";
import Link from "next/link";
import useSWR from "swr";

export const UserProjectList = () => {
  const { data: userProjects, error } = useSWR<UserProjectListData>(
    "/api/profile/user/projects",
    useFetcher
  );
  const { isGrid } = useLayout();

  if (error) return <div>Error loading projects. {error}</div>;

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
        <ul className={isGrid ? "flex gap-4" : "flex-col flex gap-4"}>
          {userProjects.map((project) => (
            <Link
              key={project.projects.id}
              href={`/profile/projects/${project.projects.id}/${project.projects.name}`}
            >
              <ProjectCard
                key={project.projects.id}
                title={project.projects.name}
                category={project.projects.category}
                description={project.projects.description}
                users={project.userData}
              />
            </Link>
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
