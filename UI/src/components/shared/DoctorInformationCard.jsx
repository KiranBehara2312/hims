import React from "react";
import { GlassBG, MyHeading } from "../custom";
import { Box, Chip, Skeleton } from "@mui/material";
import DisplayData from "./DisplayData";
import { WEEK_DAYS_LIST } from "../../constants/localDB/MastersDB";
import { useSelector } from "react-redux";
import {
  c_doctorDepartments,
  c_doctorDesignations,
  c_doctorQualifications,
  c_orgShifts,
} from "../../redux/slices/apiCacheSlice";
import PDFGenerator from "../pdf/PDFGenerator";
import DoctorLetterhead from "../pdf/templates/DoctorLetterHead";

const DoctorInformationCard = ({ selectedDoctor = null }) => {
  const cachedDoctorDesignations = useSelector(c_doctorDesignations);
  const cachedDoctorDepartments = useSelector(c_doctorDepartments);
  const cachedOrgShifts = useSelector(c_orgShifts);
  const cachedDoctorQualifications = useSelector(c_doctorQualifications);
  return (
    <GlassBG cardStyles={{ height: "auto" }}>
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
            variant="rem095"
            sx={{ mt: "-10px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mt: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData label="Name" value={`${selectedDoctor?.fullName}`} />
            <DisplayData
              label="Designation"
              value={
                cachedDoctorDesignations?.find(
                  (x) => x.designationId === selectedDoctor?.designation
                )?.designationName
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mt: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData
              label="Available Shift"
              value={
                cachedOrgShifts?.find(
                  (x) => x.shiftId === selectedDoctor?.shiftTimings
                )?.shiftName
              }
            />
            <DisplayData label="Fee" value={selectedDoctor?.fee} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mt: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <DisplayData
              label="Department"
              value={
                cachedDoctorDepartments?.find(
                  (x) => x.departmentId === selectedDoctor?.department
                )?.departmentName
              }
            />
            {/* <DisplayData
              label="Qualification"
              value={selectedDoctor?.qualification}
            />
            <DisplayData
              label="Specialization"
              value={selectedDoctor?.specialization}
            /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1.5,
              mt: 2,
              pb: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {WEEK_DAYS_LIST?.map((x) => {
                return (
                  <Chip
                    size="small"
                    color={
                      selectedDoctor?.availableDays?.includes(x.label)
                        ? "primary"
                        : "outlined"
                    }
                    variant={
                      selectedDoctor?.availableDays?.includes(x.label)
                        ? "contained"
                        : "outlined"
                    }
                    key={x.label}
                    sx={{
                      height: "25px",
                      minWidth: "60px",
                      pointerEvents: "none",
                      textDecoration: selectedDoctor?.availableDays?.includes(
                        x.label
                      )
                        ? ""
                        : "line-through",
                    }}
                    label={x.shortName}
                  />

                  //   <MyHeading
                  //     text={x.shortName}
                  //     sx={{
                  //       color: selectedDoctor?.availableDays?.includes(x.label)
                  //         ? "white !important"
                  //         : "gray !important",
                  //     }}
                  //     variant="body2"
                  //     alignCenter
                  //   />
                  // </Chip>
                );
              })}
            </Box>
          </Box>
          <PDFGenerator
            document={
              <DoctorLetterhead
                fullName={selectedDoctor?.fullName}
                qualification={
                  cachedDoctorQualifications?.find(
                    (x) => x.qualificationId === selectedDoctor?.qualification
                  )?.shortName
                }
                designation={
                  cachedDoctorDesignations?.find(
                    (x) => x.designationId === selectedDoctor?.designation
                  )?.designationName
                }
              />
            }
            fileName="Doctor_Letterhead"
          />
        </>
      )}
    </GlassBG>
  );
};

export default DoctorInformationCard;
