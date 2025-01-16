import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: { value: false, message: "Loading...please wait..." },
  reducers: {
    showLoader: (state, { payload }) => {
      state.value = true;
      state.message = payload ?? "Loading...please wait...";
    },
    hideLoader: (state, { payload }) => {
      state.value = false;
      state.message = "Loading...please wait...";
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
