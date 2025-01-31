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
    setPaymentTypes: createDataReducer("paymentTypes"),
    setBloodGroups: createDataReducer("bloodGroups"),
    setSponsorGroups: createDataReducer("sponsorGroups"),
    setKnownUsBy: createDataReducer("knownUsBy"),
    setKinRelations: createDataReducer("kinRelations"),
    setIdTypes: createDataReducer("idTypes"),
    setDoctorQualifications: createDataReducer("doctorQualifications"),
  },
});

export const c_org = (state) => state.apiCache.orgData;
export const c_gender = (state) => state.apiCache.gender;
export const c_salutation = (state) => state.apiCache.salutation;
export const c_maritalStatus = (state) => state.apiCache.maritalStatus;
export const c_userRoles = (state) => state.apiCache.userRoles;
export const c_notificationPriority = (state) =>
  state.apiCache.notificationPriority;
export const c_allUsers = (state) => state.apiCache.allUsers;
export const c_doctorDepartments = (state) => state.apiCache.doctorDepartments;
export const c_doctorDesignations = (state) =>
  state.apiCache.doctorDesignations;
export const c_orgShifts = (state) => state.apiCache.orgShifts;
export const c_paymentTypes = (state) => state.apiCache.paymentTypes;
export const c_bloodGroups = (state) => state.apiCache.bloodGroups;
export const c_sponsorGroups = (state) => state.apiCache.sponsorGroups;
export const c_knownUsBy = (state) => state.apiCache.knownUsBy;
export const c_kinRelations = (state) => state.apiCache.kinRelations;
export const c_idTypes = (state) => state.apiCache.idTypes;
export const c_doctorQualifications = (state) => state.apiCache.doctorQualifications;

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
  setPaymentTypes,
  setBloodGroups,
  setSponsorGroups,
  setKnownUsBy,
  setKinRelations,
  setIdTypes,
  setDoctorQualifications,
} = apiCacheSlice.actions;

export default apiCacheSlice.reducer;
