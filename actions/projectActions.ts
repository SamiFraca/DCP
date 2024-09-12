import { PinnedProject } from "@/components/profile/custom-pin-projects-modal";
import { getPinnedProjectsFromUser, saveUserPinnedProjects } from "@/lib/fetchSupabaseData";
import { useDispatch } from "react-redux";

export const FETCH_PINNED_PROJECTS = "FETCH_PINNED_PROJECTS";
export const SET_PINNED_PROJECTS = "SET_PINNED_PROJECTS";
export type pinnedProjectsType = {
    type: string;
}
export const fetchPinnedProjects = () => async () => {
  try {
    const dispatch = useDispatch();
    const { data } = await getPinnedProjectsFromUser();
    dispatch({
      type: SET_PINNED_PROJECTS,
      payload: data || [],
    });
  } catch (error) {
    console.error("Failed to fetch pinned projects", error);
  }
};

export const savePinnedProjects = (pinnedProjects: PinnedProject[]) => async () => {
  try {
    await saveUserPinnedProjects(pinnedProjects);
    fetchPinnedProjects();
  } catch (error) {
    console.error("Failed to save pinned projects", error);
  }
};