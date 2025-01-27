import React, { useEffect } from "react";
import {
  setAllUsers,
  setDoctorDepartments,
  setDoctorDesignations,
  setGenderData,
  setMaritalStatus,
  setNotificationPriority,
  setOrgData,
  setOrgShifts,
  setSalutationData,
  setUserRoles,
} from "../../redux/slices/apiCacheSlice";
import { postData } from "../../helpers/http";
import { useDispatch } from "react-redux";

const CachedComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadCacheData();
  }, []);
  const loadCacheData = async () => {
    try {
      const [
        gender,
        salutation,
        maritalStatus,
        organisation,
        role,
        notificationPriority,
        applicationUsers,
        doctorDEsignation,
        doctorDepartment,
        orgShifts,
      ] = await Promise.all([
        postData("/masters/data", { type: "gender", limit: "Infinity" }),
        postData("/masters/data", { type: "salutation", limit: "Infinity" }),
        postData("/masters/data", { type: "maritalStatus", limit: "Infinity" }),
        postData("/init/orgData", {}),
        postData("/masters/data", { type: "roles", limit: "Infinity" }),
        postData("/masters/data", {
          type: "notificationPriority",
          limit: "Infinity",
        }),
        postData("/masters/data", { type: "allUsers", limit: "Infinity" }),
        postData("/masters/data", {
          type: "doctorDesignation",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "doctorDepartments",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "orgShifts",
          limit: "Infinity",
        }),
      ]);

      dispatch(setGenderData(gender?.data ?? []));
      dispatch(setSalutationData(salutation?.data ?? []));
      dispatch(setMaritalStatus(maritalStatus?.data ?? []));
      dispatch(setOrgData(organisation?.data ?? []));
      dispatch(setUserRoles(role?.data ?? []));
      dispatch(setNotificationPriority(notificationPriority?.data ?? []));
      dispatch(
        setAllUsers(
          applicationUsers?.data?.map((x) => {
            return {
              ...x,
              dropdownValue: x?.userId,
              dropdownLabel: x?.fullName,
            };
          }) ?? []
        )
      );
      dispatch(setDoctorDesignations(doctorDEsignation?.data ?? []));
      dispatch(setDoctorDepartments(doctorDepartment?.data ?? []));
      dispatch(setOrgShifts(orgShifts?.data ?? []));
    } catch (error) {
      console.error("Error loading menu items for cache:", error);
    }
  };
  return null;
};
export default CachedComponent;
