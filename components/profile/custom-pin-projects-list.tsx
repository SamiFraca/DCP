import {
  getPinnedProjectsFromUser,
  UserSpecificProject,
} from "@/lib/fetchSupabaseData";
import { useState, useEffect } from "react";
import { ProjectCard } from "../card/project-card";
import { Skeleton } from "../ui/skeleton";

export type UserPinnedProjects = {
  id: string;
  name: string;
  description: string;
  category: string;
};
const CustomPinProjectsList = () => {
  const [pinnedProjects, setPinnedProjects] = useState<UserPinnedProjects[]>(
    []
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPinnedProjects = async () => {
      try {
        const { data, error } = await getPinnedProjectsFromUser();

        if (error) {
          setError("Failed to fetch data");
          console.error(error);
        } else {
          setPinnedProjects(data || []);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPinnedProjects();
  }, []);

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
          className="max-w-80 h-20 w-72"
        />
      ))}
    </ul>
  );
};

export default CustomPinProjectsList;
