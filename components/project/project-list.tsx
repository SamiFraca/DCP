"use client";
import React, { useEffect, useState } from "react";
import { getRandomProjectList } from "@/lib/fetchSupabaseData"; // Adjust the import path if necessary
import { ProjectSkeletonList } from "./skeleton/project-skeleton-list";

export interface UserProjectDetail {
  id: number;
  name: string;
  description: string;
  category: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<UserProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await getRandomProjectList(10);
      console.log(data);

      if (error) {
        setError("Failed to fetch data");
        console.error(error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <ProjectSkeletonList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-12">
      <ul>
        {projects.map((item,index) => (
          <li key={index}>
            <p>Project: {item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
