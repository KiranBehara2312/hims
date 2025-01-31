import { Box } from "@mui/material";
import React from "react";
import PnfSvg from "../../assets/generic/pnf.svg";
import { MyHeading } from "../custom";

const Pnf = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={PnfSvg}
          alt="Page Not Found"
          style={{
            width: 500,
            height: 500,
          }}
        />
        <MyHeading alignCenter variant="rem1" text="Page Not Found..." />
      </Box>
    </>
  );
};
export default Pnf;
