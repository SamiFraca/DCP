'use client'
import React, { useEffect, useState } from 'react';
import { fetchUserProjectDetails } from '@/lib/fetchSupabaseData';  // Adjust the import path if necessary

export interface UserProjectDetail {
  users: {
    username: string;
  };
  projects: {
    name: string;
    description:string;
  };
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<UserProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await fetchUserProjectDetails('user_projects','users (username),projects(name,description,category)');

      if (error) {
        setError('Failed to fetch data');
        console.error(error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Projects</h1>
      <ul>
        {projects.map((item, index) => (
          <li key={index}>
            <p>Username: {item.users.username}</p>
            <p>Project: {item.projects.name}</p>
            <p>Description: {item.projects.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;