import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPinnedProjects } from "@/components/profile/custom-pin-projects-list";

interface PinnedProjectsState {
  userPinnedProjects: UserPinnedProjects[];
  userPinnedProjectsLoading: boolean;
  userPinnedProjectsError: string | null;
}

const initialState: PinnedProjectsState = {
  userPinnedProjects: [],
  userPinnedProjectsLoading: false,
  userPinnedProjectsError: null,
};

const pinnedProjectsSlice = createSlice({
  name: "pinnedProjects",
  initialState,
  reducers: {
    setUserPinnedProjects(state, action: PayloadAction<UserPinnedProjects[]>) {
      state.userPinnedProjects = action.payload;
    },

    setUserPinnedProjectsLoading(state, action: PayloadAction<boolean>) {
      state.userPinnedProjectsLoading = action.payload;
    },

    setUserPinnedProjectsError(state, action: PayloadAction<string | null>) {
      state.userPinnedProjectsError = action.payload;
    },
  },
});

export const { setUserPinnedProjects, setUserPinnedProjectsLoading, setUserPinnedProjectsError } = pinnedProjectsSlice.actions;
export default pinnedProjectsSlice.reducer;