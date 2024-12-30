import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: { value: false },
  reducers: {
    showLoader: (state, { payload }) => {
      state.value = true;
    },
    hideLoader: (state, { payload }) => {
      state.value = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
