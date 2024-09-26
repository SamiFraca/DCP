'use client'
import { useEffect } from "react";
import { ProjectCard } from "../card/project-card";
import { Skeleton } from "../ui/skeleton";
import {
  setUserPinnedProjectsError,
  setUserPinnedProjects,
  setUserPinnedProjectsLoading,
} from "@/features/pinnedProjectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getPinnedProjectsFromUser } from "@/lib/fetchSupabaseData";

export type UserPinnedProjects = {
  id: string;
  name: string;
  description: string;
  category: string;
};
const CustomPinProjectsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userPinnedProjects, userPinnedProjectsLoading, userPinnedProjectsError } = useSelector(
    (state: RootState) => state.pinnedProjects
  );

  useEffect(() => {
    const loadProjects = async () => {
      dispatch(setUserPinnedProjectsLoading(true));
      try {
        const { data } = await getPinnedProjectsFromUser();
        if (data) {
          dispatch(setUserPinnedProjects(data));
        }
      } catch (err) {
        dispatch(setUserPinnedProjectsError("Failed to fetch projects"));
      } finally {
        dispatch(setUserPinnedProjectsLoading(false));
      }
    };

    loadProjects();
  }, [dispatch]);

  if (userPinnedProjectsLoading) {
    return (
      <div className="flex flex-wrap mt-10 gap-4">
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
        <Skeleton className="h-20 w-72" />
      </div>
    );
  }

  if (userPinnedProjectsError) {
    return <div>{userPinnedProjectsError}</div>;
  }

  return (
    <ul className="mt-10 flex flex-wrap gap-4">
      {userPinnedProjects.map((project) => (
        <ProjectCard
          title={project.name}
          description={project.description}
          key={project.id}
          className="max-w-80 "
        />
      ))}
    </ul>
  );
};

export default CustomPinProjectsList;
