import { Box, Typography } from "@mui/material";
import React from "react";
import HospitalLogo from "../../assets/hospital/logo.png";
import MyHeading from "../custom/MyHeading";
import { META } from "../../constants/projects";

const HospitalDetailsLogo = () => {
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
      <MyHeading text={META.PROJECT_TITLE} variant="body1" />
    </Box>
  );
};

export default HospitalDetailsLogo;
