import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import HospitalLogo from "../../assets/hospital/logo.png";
import MyHeading from "../custom/MyHeading";
import { META } from "../../constants/projects";
import { useSelector } from "react-redux";
import { c_org } from "../../redux/slices/apiCacheSlice";

const HospitalDetailsLogo = () => {
  const cachedOrgData = useSelector(c_org);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1,
      }}
    >
      <img
        src={HospitalLogo}
        alt="Hospital"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <MyHeading text={cachedOrgData?.[0]?.orgName} variant="rem1" />
    </Box>
  );
};

export default HospitalDetailsLogo;
