import { createSlice } from "@reduxjs/toolkit";

export const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState: { doctors: [], users: [] },
  reducers: {
    setDoctorsInCache: (state, { payload }) => {
      state.doctors = payload ?? [];
    },
    getDoctorsFromCache: (state, { payload }) => {
      return state.doctors ?? [];
    },
  },
});

export const { setDoctorsInCache, getDoctorsFromCache } = apiCacheSlice.actions;

export default apiCacheSlice.reducer;
