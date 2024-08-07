import { supabase } from "@/lib/supabaseClient"; // Adjust the import path if necessary

export const fetchUserProjectDetails = async () => {
  try {
    const { data, error } = await supabase.from("user_projects").select(`
        users (username),
        projects(name,description)
      `);

    // Return data and error as an object
    return { data, error };
  } catch (err) {
    // Handle unexpected errors
    console.error("Unexpected error:", err);
    return { data: [], error: err as Error };
  }
};
