import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import getUser from "@/lib/getUser";

export type userProjectData = {
  map(arg0: (user: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
  id: number;
  name: string;
  profile_image: string;
};

export type ProjectData = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  users: number[];
};

export type UserProjectListData = {
  is_pinned: boolean;
  projects: ProjectData;
  userData: userProjectData[]
}[];

export async function GET() {
  const authUserId = (await getUser()).user?.id;
  if (!authUserId) {
    return NextResponse.json({ error: "No user identification found" });
  }

  const { data: ProjectData, error } = await supabase
    .from("users")
    .select(
      `
      user_projects (
        is_pinned,
        projects (
          id,
          name,
          description,
          category,
          users
        )
      )
    `
    )
    .eq("auth_user_id", authUserId);

  if (error) {
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
  const ProjectWithUsers = await Promise.all(
    ProjectData[0].user_projects.map(async (project) => {
      // @ts-ignore
      const userPromises = project.projects.users.map(async (userId) => {
        const { data: userProjectData, error } = await supabase
          .from("users")
          .select(`id,name,profile_image`)
          .eq("id", userId);

        if (error) {
          return { error: error };
        }

        return userProjectData;
      });

      const usersData = await Promise.all(userPromises);

      return { ...project, userData: usersData };
    })
  );

  return NextResponse.json(ProjectWithUsers);
}
