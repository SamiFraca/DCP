'use client'
import React, { useEffect, useState } from 'react';
import { fetchUserProjectDetails } from '@/lib/fetchSupabaseData';  // Adjust the import path if necessary

interface UserProjectDetail {
  user: {
    username: string;
  };
  project: {
    name: string;
    description:string;
  };
  country: {
    name: string;
  };
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<UserProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await fetchUserProjectDetails();
      console.log(data);

      if (error) {
        setError('Failed to fetch data');
        console.error(error);
      } else {
        // setProjects(data || []);
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
            <p>Username: {item.user.username}</p>
            <p>Project: {item.project.name}</p>
            <p>Country: {item.country.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;