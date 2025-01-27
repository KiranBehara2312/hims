import React, { useEffect } from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import MyHeader from "../../components/shared/MyHeader";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  emptyUserDetails,
  setUserDetails,
} from "../../redux/slices/userDetailsSlice";
import CachedComponent from "../../components/shared/CachedComponent";

const PagesLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("authToken") === null ||
      localStorage.getItem("authToken") === undefined ||
      localStorage.getItem("authToken") === ""
    ) {
      window.location.href = window.location.origin + "/auth/login";
      dispatch(emptyUserDetails());
      localStorage.removeItem("authToken");
    } else {
      dispatch(setUserDetails(localStorage.getItem("authToken")));
    }
  }, []);
  return (
    <BaseLayout>
      <CachedComponent />
      <MyHeader />
      <Box sx={{ p: 0.5 }}>
        <Outlet />
      </Box>
    </BaseLayout>
  );
};

export default PagesLayout;
