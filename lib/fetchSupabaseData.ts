import { UserProjectDetail } from "@/components/project/project-list";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path if necessary

export const fetchUserProjectDetails = async (table: string, query: string) => {
  try {
    const { data, error } = await supabase.from(table).select(`${query}`);


    if (error) {
      return { data: null, error };
    }

    return { data: data as unknown as UserProjectDetail[] | null , error: null };
  } catch (err) {
    // Handle unexpected errors
    console.error("Unexpected error:", err);
    return { data: [], error: err as Error };
  }
};
