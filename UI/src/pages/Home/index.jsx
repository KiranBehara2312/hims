import { Box, Paper, Stack, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { GlassBG, MyHeading } from "../../components/custom";
import { IoPeople } from "react-icons/io5";
import { FaBed, FaCalendarCheck } from "react-icons/fa";
import IconWrapper from "../../components/custom/IconWrapper";

const Home = () => {
  const theme = useTheme();
  const cards = [
    {
      count: 8,
      label: "Registrations",
      url: null,
      icon: <IoPeople size={30} />,
    },
    {
      count: 8,
      label: "Appointments",
      url: null,
      icon: <FaCalendarCheck size={30} />,
    },
    {
      count: 8,
      label: "In Patients",
      url: null,
      icon: <FaBed size={30} />,
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mt: 1,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {cards?.map((x, i) => {
        return (
          <GlassBG key={i} cardStyles={{ minWidth: "200px" }}>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid size={4}>
                <IconWrapper defaultColor icon={x.icon} />
              </Grid>
              <Grid size={8}>
                <MyHeading text={x.count} variant="rem2" alignCenter />
                <MyHeading text={x.label} variant="rem1" sx={{ pt: 0.5 }} />
              </Grid>
            </Grid>
          </GlassBG>
        );
      })}
    </Box>
  );
};

export default Home;
