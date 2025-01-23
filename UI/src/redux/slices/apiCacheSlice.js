import { createSlice } from "@reduxjs/toolkit";

const createDataReducer =
  (key) =>
  (state, { payload }) => {
    state[key] = payload ?? [];
  };

export const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState: {
    orgData: [],
    gender: [],
    salutation: [],
    maritalStatus: [],
    userRoles: [],
    notificationPriority: [],
    allUsers: [],
  },
  reducers: {
    setOrgData: createDataReducer("orgData"),
    setGenderData: createDataReducer("gender"),
    setSalutationData: createDataReducer("salutation"),
    setMaritalStatus: createDataReducer("maritalStatus"),
    setUserRoles: createDataReducer("userRoles"),
    setNotificationPriority: createDataReducer("notificationPriority"),
    setAllUsers: createDataReducer("allUsers"),
  },
});

export const c_org = (state) => state.apiCache.orgData;
export const c_gender = (state) => state.apiCache.gender;
export const c_salutation = (state) => state.apiCache.salutation;
export const c_maritalStatus = (state) => state.apiCache.maritalStatus;
export const c_userRoles = (state) => state.apiCache.userRoles;
export const c_notificationPriority = (state) => state.apiCache.notificationPriority;
export const c_allUsers = (state) => state.apiCache.allUsers;

export const {
  setOrgData,
  setGenderData,
  setSalutationData,
  setMaritalStatus,
  setUserRoles,
  setNotificationPriority,
  setAllUsers
} = apiCacheSlice.actions;

export default apiCacheSlice.reducer;
