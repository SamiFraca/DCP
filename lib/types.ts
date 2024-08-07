import { Database } from '@/database.types';

export type Project = Database['public']['Tables']['projects']['Row'];
export type UserProject = {
  project_id: number;
  projects: Project;
};
export type User = Database['public']['Tables']['users']['Row'] & {
  user_projects: UserProject[];
};