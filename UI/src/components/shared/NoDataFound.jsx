import React from "react";
import NoDataSVG from "../../assets/generic/noData.svg";
import { MyHeading } from "../custom";
import { Box } from "@mui/material";

const NoDataFound = ({ sx = {}, imgHeight = 130, imgWidth = 130, headingVariant = "rem1" }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          ...sx,
        }}
      >
        <MyHeading
          alignCenter
          text={
            <img
              src={NoDataSVG}
              alt="No Data Found"
              style={{
                width: imgWidth,
                height: imgHeight,
              }}
            />
          }
        />
        <MyHeading
          variant={headingVariant}
          alignCenter
          text="No Data Found...!"
        />
      </Box>
    </>
  );
};

export default NoDataFound;
