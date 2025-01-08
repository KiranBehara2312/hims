import React from "react";
import { GlassBG, MyHeading } from "../custom";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import DisplayData from "./DisplayData";
import { WEEK_DAYS_LIST } from "../../constants/localDB/MastersDB";

const DoctorInformationCard = ({ selectedDoctor = null }) => {
  return (
    <GlassBG cardStyles={{ width: "97%", height: "auto" }}>
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
        <>
          <MyHeading
            alignCenter
            text="Doctor Information"
            variant="h6"
            sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              mt: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData
              label="Name"
              value={`Dr.${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}
            />
            <DisplayData
              label="Designation"
              value={selectedDoctor?.designation}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              mt: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData
              label="Department"
              value={selectedDoctor?.department}
            />
            <DisplayData
              label="Qualification"
              value={selectedDoctor?.qualification}
            />
            <DisplayData
              label="Specialization"
              value={selectedDoctor?.specialization}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              mt: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData
              label="Available Shift"
              value={selectedDoctor?.shiftTimings}
            />
            <DisplayData label="Fee" value={selectedDoctor?.fee} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.5,
              mt: 3,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData label="Available Days" value={null} />
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
                      sx={{
                        color: selectedDoctor?.availableDays?.includes(x.label)
                          ? "white !important"
                          : "gray !important",
                      }}
                      variant="body2"
                      alignCenter
                    />
                  </Button>
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </GlassBG>
  );
};

export default DoctorInformationCard;
