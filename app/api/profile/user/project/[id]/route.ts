import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import getUser from "@/lib/getUser";
import { userProjectData } from "../../projects/route";

export type IndividualProjectData = {
  id: string;
  name: string;
  description: string;
  category: string;
  userData: userProjectData[];
  users:string[];
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const authUserId = (await getUser()).user?.id;

  if (!authUserId) {
    return NextResponse.json({ error: "No user identification found" });
  }

  const { data: ProjectData, error } = await supabase
    .from("projects")
    .select(
      `
          id,
          name,
          description,
          category,
          users
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to retrieve project data" },
      { status: 500 }
    );
  }

  const userPromises = ProjectData.users.map(async (userId: string) => {
    const { data: userProjectData, error } = await supabase
      .from("users")
      .select(`id,name,profile_image`)
      .eq("id", userId)
      .single();

    if (error) {
      return { error: error.message };
    }

    return userProjectData;
  });

  const usersData = await Promise.all(userPromises);
  const filteredFinalData = usersData.filter((user) => user !== undefined);

  const finalProjectData = { ...ProjectData, userData: filteredFinalData };

  return NextResponse.json(finalProjectData);
}
