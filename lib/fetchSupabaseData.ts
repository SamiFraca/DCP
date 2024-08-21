import { UserProjectDetail } from "@/components/project/project-list";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path if necessary
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import getUser from "./getUser";

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

    const { error: userProjectError } = await supabase
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

export type UserPinnedProject = {
  id:number;
  name: string;
  category: string;
  description: string | null; // description can be null
};

type UserProject = {
  user_projects: {
    projects: UserPinnedProject[];
  }[];
};


export const fetchUserProjects = async (): Promise<{ data: UserProject[] | null; error: PostgrestError | null }> => {
  try {
    const authUserId = (await getUser()).user?.id;

    const { data, error } = await supabase
      .from("users")
      .select(`
        user_projects (
          projects (
            id,
            name,
            description,
            category
          )
        )
      `)
      .eq("auth_user_id", authUserId);

    if (error) {
      console.error("Error fetching projects:", error);
      return { data: null, error };
    }

    return { data: data as UserProject[], error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { data: null, error: err as PostgrestError };
  }
};