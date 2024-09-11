import { useEffect } from "react";
import { ProjectCard } from "../card/project-card";
import { Skeleton } from "../ui/skeleton";
import {
  setError,
  setLoading,
  setPinnedProjects,
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
  const { pinnedProjects, loading, error } = useSelector(
    (state: RootState) => state.pinnedProjects
  );

  useEffect(() => {
    const loadProjects = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await getPinnedProjectsFromUser();
        if (data) {
          dispatch(setPinnedProjects(data));
        }
      } catch (err) {
        dispatch(setError("Failed to fetch projects"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProjects();
  }, [dispatch]);

  if (loading) {
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className="mt-10 flex flex-wrap gap-4">
      {pinnedProjects.map((project) => (
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
