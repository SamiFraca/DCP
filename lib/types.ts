type Project = {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string; 
};

type UserProject = {
  id?: number;
  user_id: number;
  project_id: number;
  created_at: string; 
};