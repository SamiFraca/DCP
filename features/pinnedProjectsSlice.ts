import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPinnedProjects } from "@/components/profile/custom-pin-projects-list";

interface PinnedProjectsState {
  userPinnedProjects: UserPinnedProjects[];
  loading: boolean;
  error: string | null;
}

const initialState: PinnedProjectsState = {
  userPinnedProjects: [],
  loading: false,
  error: null,
};

const pinnedProjectsSlice = createSlice({
  name: "pinnedProjects",
  initialState,
  reducers: {
    setUserPinnedProjects(state, action: PayloadAction<UserPinnedProjects[]>) {
      state.userPinnedProjects = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUserPinnedProjects, setLoading, setError } = pinnedProjectsSlice.actions;
export default pinnedProjectsSlice.reducer;