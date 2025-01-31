import { Box } from "@mui/material";
import React from "react";
import { MyHeading } from "../custom";

const DisplayData = ({ value = "Default Value", label = "Default Label" }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <MyHeading text={value} variant="rem085" />
      <MyHeading text={label} variant="rem065" sx={{ mt: -1 }} />
    </Box>
  );
};

export default DisplayData;
