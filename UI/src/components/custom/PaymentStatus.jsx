import { Box, Typography } from "@mui/material";
import { BiSolidErrorAlt } from "react-icons/bi";
import React from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { IoIosWarning } from "react-icons/io";
import MyHeading from "./MyHeading";

const STATUS = {
  1: "Success",
  2: "Failure",
  3: "Pending",
};
const PaymentStatus = ({ status = STATUS[1], sx = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 1,
        ...sx,
      }}
    >
      {status === STATUS[1] && (
        <>
          <PiSealCheckFill size={60} style={{ color: "green" }} />
          <MyHeading
            variant="rem1"
            text="Payment Received"
            sx={{ color: "green" }}
          />
        </>
      )}
      {status === STATUS[2] && (
        <>
          <BiSolidErrorAlt size={60} style={{ color: "red" }} />
          <MyHeading
            variant="rem1"
            text="Amount not received"
            sx={{ color: "red" }}
          />
        </>
      )}

      {status === STATUS[3] && (
        <>
          <IoIosWarning size={60} style={{ color: "orange" }} />
          <MyHeading
            variant="rem1"
            text="Pending transaction"
            sx={{ color: "orange" }}
          />
        </>
      )}
    </Box>
  );
};

export default PaymentStatus;
