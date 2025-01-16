import React from "react";
import WorkInProgressSVG from "../../assets/generic/workInProgress.svg";
import { MyHeading } from "../custom";
import { Box } from "@mui/material";

const WorkInProgress = ({ sx = {}, imgHeight = 130, imgWidth = 130 }) => {
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
              src={WorkInProgressSVG}
              alt="No Data FOund"
              style={{
                width: imgWidth,
                height: imgHeight,
              }}
            />
          }
        />
        <MyHeading alignCenter text="Work in Progress...!" />
      </Box>
    </>
  );
};

export default WorkInProgress;
