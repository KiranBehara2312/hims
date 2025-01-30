import React, { useEffect } from "react";
import {
  setAllUsers,
  setBloodGroups,
  setDoctorDepartments,
  setDoctorDesignations,
  setGenderData,
  setIdTypes,
  setKinRelations,
  setKnownUsBy,
  setMaritalStatus,
  setNotificationPriority,
  setOrgData,
  setOrgShifts,
  setPaymentTypes,
  setSalutationData,
  setSponsorGroups,
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
        paymentTypes,
        bloodGroups,
        sponsorGroups,
        knownusBy,
        kinRelation,
        idTypes
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
        postData("/masters/data", {
          type: "paymentType",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "bloodGroup",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "sponsorGroups",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "knownusBy",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "kinRelation",
          limit: "Infinity",
        }),
        postData("/masters/data", {
          type: "idTypes",
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
      dispatch(setPaymentTypes(paymentTypes?.data ?? []));
      dispatch(setBloodGroups(bloodGroups?.data ?? []));
      dispatch(setSponsorGroups(sponsorGroups?.data ?? []));
      dispatch(setKnownUsBy(knownusBy?.data ?? []));
      dispatch(setKinRelations(kinRelation?.data ?? []));
      dispatch(setIdTypes(idTypes?.data ?? []));
    } catch (error) {
      console.error("Error loading menu items for cache:", error);
    }
  };
  return null;
};
export default CachedComponent;
