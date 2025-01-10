import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./slices/userDetailsSlice";
import loaderReducer from "./slices/loaderSlice";
import apiCacheReducer from "./slices/apiCacheSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    loader: loaderReducer,
    apiCache: apiCacheReducer,
  },
});
