import { Box } from "@mui/material";
import React from "react";
import { MyHeading } from "../../components/custom";

const SlotSelection = ({ slots = [] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        mt: 2,
        alignItems: "center",
      }}
    >
      <Box></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          flexWrap: "wrap",
          maxWidth : "50%"
        }}
      >
        {slots?.map((slot, i) => {
          return (
            <Box
              key={slot?.calSlotCode}
              sx={{
                borderRadius: "10px",
                width: "150px",
                height: "75px",
                border: "0.5px solid gray",
                borderLeft: `10px solid ${slot.color}`,
              }}
            >
              <MyHeading
                alignCenter
                text={slot?.slotNo}
                variant="h6"
                sx={{ mt: 1 }}
              />
              <MyHeading
                alignCenter
                text={`${slot?.startTime}-${slot?.endTime}`}
                variant="caption"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SlotSelection;
