import { createSlice } from "@reduxjs/toolkit";

export const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState: { orgData: [], users: [] },
  reducers: {
    setOrgData: (state, { payload }) => {
      state.orgData = payload ?? [];
    },
    getOrgData: (state, { payload }) => {
      return state.orgData ?? [];
    },
  },
});

export const { setOrgData, getOrgData } = apiCacheSlice.actions;

export default apiCacheSlice.reducer;
