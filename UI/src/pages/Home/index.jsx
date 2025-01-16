import { Box, Paper, Stack, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { GlassBG, MyHeading } from "../../components/custom";
import { IoPeople } from "react-icons/io5";
import { FaBed, FaCalendarCheck } from "react-icons/fa";
import IconWrapper from "../../components/custom/IconWrapper";
import PDFGenerator from "../../components/pdf/PDFGenerator";
import BillReceiptTemplate from "../../components/pdf/templates/BillReceipt";

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
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {cards?.map((x, i) => {
        return (
          <Box
            key={i}
            sx={{
              width: "200px",
              height: "60px",
              borderRadius: "10px",
              p: 2,
              m: 0.5,
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            }}
          >
            <Grid
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
                <MyHeading text={x.count} variant="h4" alignCenter />
                <MyHeading text={x.label} variant="body2" sx={{ pt: 0.5 }} />
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <PDFGenerator document={<BillReceiptTemplate />} fileName="bills.pdf" />
      <span>asdasd</span>
    </Box>
  );
};

export default Home;
