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
    doctorDepartments: [],
    doctorDesignations: [],
  },
  reducers: {
    setOrgData: createDataReducer("orgData"),
    setGenderData: createDataReducer("gender"),
    setSalutationData: createDataReducer("salutation"),
    setMaritalStatus: createDataReducer("maritalStatus"),
    setUserRoles: createDataReducer("userRoles"),
    setNotificationPriority: createDataReducer("notificationPriority"),
    setAllUsers: createDataReducer("allUsers"),
    setDoctorDesignations: createDataReducer("doctorDesignations"),
    setDoctorDepartments: createDataReducer("doctorDepartments"),
    setOrgShifts: createDataReducer("orgShifts"),
  },
});

export const c_org = (state) => state.apiCache.orgData;
export const c_gender = (state) => state.apiCache.gender;
export const c_salutation = (state) => state.apiCache.salutation;
export const c_maritalStatus = (state) => state.apiCache.maritalStatus;
export const c_userRoles = (state) => state.apiCache.userRoles;
export const c_notificationPriority = (state) => state.apiCache.notificationPriority;
export const c_allUsers = (state) => state.apiCache.allUsers;
export const c_doctorDepartments = (state) => state.apiCache.doctorDepartments;
export const c_doctorDesignations = (state) => state.apiCache.doctorDesignations;
export const c_orgShifts = (state) => state.apiCache.orgShifts;

export const {
  setOrgData,
  setGenderData,
  setSalutationData,
  setMaritalStatus,
  setUserRoles,
  setNotificationPriority,
  setAllUsers,
  setDoctorDesignations,
  setDoctorDepartments,
  setOrgShifts,
} = apiCacheSlice.actions;

export default apiCacheSlice.reducer;
