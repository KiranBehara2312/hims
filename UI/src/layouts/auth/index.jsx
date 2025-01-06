import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import HospitalSVG from "../../assets/svg/hospital.svg";
import BedSvg from "../../assets/svg/bed.svg";
import AmbulanceSvg from "../../assets/svg/ambulance.svg";
import Tablets from "../../assets/svg/tablets.svg";
import StethSvg from "../../assets/svg/steth.svg";
import FirstAid from "../../assets/svg/firstAid.svg";
import Nurse from "../../assets/svg/nurse.svg";

const AuthLayout = () => {
  const lessThanMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <BaseLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: lessThanMd ? "center" : "space-between",
            alignItems: "center",
            flexWrap: lessThanMd ? "wrap-reverse" : "nowrap",
            gap: 1,
            width: "100%",
          }}
        >
          <img
            src={HospitalSVG}
            alt="Hospital"
            width={300}
            height={220}
            style={{ paddingLeft: "10px" }}
          />

          {!lessThanMd && (
            <img
              src={BedSvg}
              alt="Hospital"
              style={{
                width: 75,
                height: 75,
                position: "absolute",
                top: 30,
                left: 50,
              }}
            />
          )}

          {!lessThanMd && (
            <img
              src={Nurse}
              alt="Hospital"
              style={{
                width: 75,
                height: 75,
                position: "absolute",
                bottom: 30,
                right: 50,
              }}
            />
          )}

          {!lessThanMd && (
            <img
              src={Tablets}
              alt="Hospital"
              style={{
                width: 75,
                height: 75,
                position: "absolute",
                top: 30,
                right: 50,
              }}
            />
          )}

          {!lessThanMd && (
            <img
              src={FirstAid}
              alt="Ambulance"
              width={75}
              height={75}
              style={{
                position: "absolute",
                bottom: 30,
                left: 50,
              }}
            />
          )}

          <Outlet />
          <img
            src={AmbulanceSvg}
            alt="Ambulance"
            width={300}
            height={280}
            style={{ paddingRight: "10px" }}
          />
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default AuthLayout;
