import { UserProjectDetail } from "@/components/project/project-list";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import path if necessary
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import getUser from "./getUser";
import { PinnedProject } from "@/components/profile/custom-pin-projects-modal";

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
  id: number;
  name: string;
  category: string;
  description: string | null;
};

export type UserSpecificProject = {
  user_projects: {
    is_pinned: boolean;
    projects: UserPinnedProject;
  }[];
};

export const fetchUserProjects = async (): Promise<{
  data: UserSpecificProject[] | null;
  error: PostgrestError | null;
}> => {
  try {
    const authUserId = (await getUser()).user?.id;

    const { data, error } = await supabase
      .from("users")
      .select(
        `
        user_projects (
          is_pinned,
          projects (
            id,
            name,
            description,
            category
          )
        )
      `
      )
      .eq("auth_user_id", authUserId);

    if (error) {
      console.error("Error fetching projects:", error);
      return { data: null, error };
    }
    // @ts-ignore
    // TODO: Fix ts error
    return { data: data as UserSpecificProject[], error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { data: null, error: err as PostgrestError };
  }
};

export const saveUserPinnedProjects = async (
  savedPinnedProjects: PinnedProject[]
) => {
  try {
    const authUserId = (await getUser()).user?.id;

    if (!authUserId) {
      throw new Error("User is not authenticated");
    }
    const userId = await getUserId(authUserId);

    const results = await Promise.all(
      savedPinnedProjects.map(async (project) => {
        const { data, error } = await supabase
          .from("user_projects")
          .update({ is_pinned: project.isPinned })
          .eq("project_id", project.id)
          .eq("user_id", userId);

        if (error) {
          console.error(`Error saving project ${project.id}:`, error);
          return { id: project.id, success: false, error };
        }

        return { id: project.id, success: true, data };
      })
    );

    const hasError = results.some((result) => !result.success);

    if (hasError) {
      console.error(
        "Some projects failed to save:",
        results.filter((result) => !result.success)
      );
      return { success: false, errors: results };
    }

    return { success: true, results };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: err as Error };
  }
};

export const getUserId = async (userAuthId: string) => {
  const { data: userProjectData, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_user_id", userAuthId)
    .single();

  if (fetchError) {
    console.error("Error fetching user_project data:", fetchError);
    return;
  }

  const userId = userProjectData?.id;
  return userId;
};

export const getPinnedProjectsFromUser = async () => {
  try {
    const authUserId = (await getUser()).user?.id;

    if (!authUserId) {
      throw new Error("User is not authenticated");
    }

    const { data, error } = await supabase
      .from("users")
      .select(
        `
        user_projects (
          is_pinned,
          projects (
            id,
            name,
            description,
            category
          )
        )
      `
      )
      .eq("auth_user_id", authUserId)
      .eq("user_projects.is_pinned", true);

    if (error) {
      throw error.message;
    }

    const pinnedProjects =
      data?.[0]?.user_projects.map((userProject) => userProject.projects) || [];

    return { data: pinnedProjects.flat() }; 
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
