import { UserProjectDetail } from "@/components/project/project-list";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path if necessary
import { PostgrestResponse } from "@supabase/supabase-js";

export const getRandomProjectList = async (limit: number) => {
  try {
    const { data, error } = await supabase.rpc("get_random_projects", {
      limit_value: limit,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: data as unknown as UserProjectDetail[] | null, error: null };
  } catch (err) {
    // Handle unexpected errors
    console.error("Unexpected error:", err);
    return { data: [], error: err as Error };
  }
};

export const createProjectAndLinkToUser = async (
  userId: number,
  projectName: string,
  description: string,
  category: string
) => {
  try {
    // Step 1: Insert the new project
    const {
      data: projectData,
      error: projectError,
    }: PostgrestResponse<Project> = await supabase
      .from("projects")
      .insert([
        {
          name: projectName,
          description: description,
          category: category,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (projectError) {
      throw new Error(`Error creating project: ${projectError.message}`);
    }

    const projectId = projectData[0]?.id;

    if (!projectId) {
      throw new Error("Failed to retrieve project ID");
    }

    // Step 2: Link the project to the user
    const {
      data: userProjectData,
      error: userProjectError,
    }: PostgrestResponse<UserProject> = await supabase
      .from("user_projects")
      .insert([
        {
          user_id: userId,
          project_id: projectId,
          created_at: new Date().toISOString(),
        },
      ]);

    if (userProjectError) {
      throw new Error(
        `Error linking project to user: ${userProjectError.message}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
