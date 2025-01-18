import React from "react";
import { GlassBG, MyHeading } from "../custom";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import DisplayData from "./DisplayData";
import Grid from "@mui/material/Grid2";

const PatientInformationCard = ({ patient = null }) => {
  return (
    <GlassBG cardStyles={{ width: "calc(100% - 44px)", height: "auto" }}>
      {patient === null && (
        <>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </>
      )}
      {patient !== null && (
        <Grid container spacing={1}>
          <Grid size={6}>
            <DisplayData label="Name" value={patient?.fullName} />
          </Grid>
          <Grid size={6}>
            <DisplayData
              label="Age (Gender)"
              value={`${patient?.ageString} (${patient?.gender})`}
            />
          </Grid>
          <Grid size={6}>
            <DisplayData label="Contact No" value={patient?.contactNumber} />
          </Grid>
          <Grid size={6}>
            <DisplayData label="Blood Group" value={patient?.bloodGroup} />
          </Grid>
          <Grid size={6}>
            <DisplayData label="UHID" value={patient?.UHID} />
          </Grid>
          <Grid size={6}>
            <DisplayData label="Patient No" value={patient?.patientNo} />
          </Grid>
        </Grid>
      )}
    </GlassBG>
  );
};

export default PatientInformationCard;
