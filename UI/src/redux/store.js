import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./slices/userDetailsSlice";
import loaderReducer from "./slices/loaderSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    loader: loaderReducer,
  },
});
