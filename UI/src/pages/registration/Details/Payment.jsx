import React, { useCallback } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import {
  PAYMENT_STATUSES,
  PAYMENT_TYPES,
} from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import { Box, Divider, Typography } from "@mui/material";
import { REGISTRATION_CHARGES } from "../../../constants/localDB/PaymentServices";
import PaymentStatus from "../../../components/custom/PaymentStatus";

const Payment = ({ control, errors, formValues, setValue }) => {
  const PaymentSummary = () => {
    let DOCTOR_FEE_SERVICE = [];
    if (formValues?.doctor !== "") {
      DOCTOR_FEE_SERVICE.push({
        serviceName: "Doctor Consultation Fee",
        serviceAmount: +formValues?.doctorConsultationFee,
        discountAppliedinPercent: 0,
      });
    }
    let combinationOfFees = [REGISTRATION_CHARGES, ...DOCTOR_FEE_SERVICE];
    const totalAmount = combinationOfFees.reduce(
      (acc, cur) => acc + cur.serviceAmount,
      0
    );
    combinationOfFees.push({
      serviceName: "Total",
      serviceAmount: totalAmount,
    });

    return (
      <GlassBG cardStyles={{ width: "190px",mt:2, height: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="caption"
            sx={{ pl: 1, color: "red", fontSize: "12px" }}
          >
            {"Note: All amounts are in INR"}
          </Typography>
          {combinationOfFees?.map((x, i) => {
            return (
              <span
                key={i}
                style={{
                  display: "flex",
                  marginTop: "8px",
                  justifyContent: "space-between",
                  borderTop:
                    i === combinationOfFees?.length - 1
                      ? "0.5px solid gray"
                      : "",
                  paddingTop: i === combinationOfFees?.length - 1 ? "8px" : "",
                }}
              >
                <Typography variant="caption">{x.serviceName}</Typography>
                <Typography variant="body2">{x.serviceAmount}</Typography>
              </span>
            );
          })}
        </Box>
      </GlassBG>
    );
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Payment Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Select
          control={control}
          name={"paymentStatus"}
          label={"Payment Status"}
          list={PAYMENT_STATUSES}
          rules={{ required: "Payment Status is required" }}
          isRequired={true}
          errors={errors}
        />
        <F_Select
          control={control}
          name={"paymentType"}
          label={"Payment Type"}
          list={PAYMENT_TYPES}
          rules={{ required: "Payment Type is required" }}
          isRequired={true}
          errors={errors}
        />

        <F_Input
          name="payeeName"
          control={control}
          errors={errors}
          rules={{ required: "Payee Name is required" }}
          label="Payee Name"
          isRequired={true}
        />

        <F_Input
          name="transactionId"
          control={control}
          errors={errors}
          rules={{}}
          label="Transaction ID"
        />
        <PaymentSummary />
        <PaymentStatus sx={{ mt: 2 }} status={formValues?.paymentStatus} />
      </GlassBG>
    </>
  );
};

export default Payment;
