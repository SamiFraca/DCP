import { User } from "@supabase/supabase-js";

interface CustomUserMetadata {
  name?: string;
  lastName?: string;
  country?: string;
  mainField?: string;
  description?: string;
}

export interface UserDatafromDB {
  id: number;
  name: string;
  email: string;
  projects: string[];
  country: string;
  main_field?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomUser extends User {
  user_metadata: CustomUserMetadata;
}

export interface UserContextType {
  user: CustomUser | null;
  isLoading: boolean;
  error: string | null;
}
