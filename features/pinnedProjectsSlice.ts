import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPinnedProjects } from "@/components/profile/custom-pin-projects-list";

interface PinnedProjectsState {
  pinnedProjects: UserPinnedProjects[];
  loading: boolean;
  error: string | null;
}

const initialState: PinnedProjectsState = {
  pinnedProjects: [],
  loading: false,
  error: null,
};

const pinnedProjectsSlice = createSlice({
  name: "pinnedProjects",
  initialState,
  reducers: {
    setPinnedProjects(state, action: PayloadAction<UserPinnedProjects[]>) {
      state.pinnedProjects = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPinnedProjects, setLoading, setError } = pinnedProjectsSlice.actions;
export default pinnedProjectsSlice.reducer;