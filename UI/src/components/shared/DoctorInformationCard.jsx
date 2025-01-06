import React from "react";
import { GlassBG, MyHeading } from "../custom";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import DisplayData from "./DisplayData";
import { WEEK_DAYS_LIST } from "../../constants/localDB/MastersDB";

const DoctorInformationCard = ({ selectedDoctor = null }) => {
  return (
    <GlassBG cardStyles={{ width: "calc(100% - 44px)", height: "auto" }}>
      {selectedDoctor === null && (
        <>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </>
      )}
      {selectedDoctor !== null && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <DisplayData
            label="Name"
            value={`Dr.${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}
          />
          <DisplayData
            label="Designation"
            value={selectedDoctor?.designation}
          />
          <DisplayData label="Department" value={selectedDoctor?.department} />
          <DisplayData
            label="Qualification"
            value={selectedDoctor?.qualification}
          />
          <DisplayData
            label="Specialization"
            value={selectedDoctor?.specialization}
          />
          <DisplayData label="Fee" value={selectedDoctor?.fee} />
          <DisplayData
            label="Available Days"
            value={
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                {WEEK_DAYS_LIST?.map((x) => {
                  return (
                    <Button
                      size="small"
                      variant={
                        selectedDoctor?.availableDays?.includes(x.label)
                          ? "contained"
                          : "outlined"
                      }
                      key={x.label}
                      sx={{
                        height: "25px",
                        pointerEvents: "none",
                        textDecoration: selectedDoctor?.availableDays?.includes(
                          x.label
                        )
                          ? ""
                          : "line-through",
                      }}
                    >
                      <MyHeading
                        text={x.shortName}
                        variant="body2"
                        alignCenter
                      />
                    </Button>
                  );
                })}
              </Box>
            }
          />
          <DisplayData
            label="Available Shift"
            value={selectedDoctor?.shiftTimings}
          />
        </Box>
      )}
    </GlassBG>
  );
};

export default DoctorInformationCard;
