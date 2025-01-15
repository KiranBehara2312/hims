import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import {
  PAYMENT_STATUSES,
  PAYMENT_TYPES,
} from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import PaymentStatus from "../../../components/custom/PaymentStatus";
import { postData } from "../../../helpers/http";
import PaymentServicesChooser from "../../../components/shared/PaymentServicesChooser";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import WorkInProgress from "../../../components/shared/WorkInProgress";

const Payment = ({
  control,
  errors,
  formValues,
  setValue,
  setPaymentChargeDetails = () => {},
}) => {
  const [paymentCharges, setPaymentCharges] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [totalAmtStr, setTotalAmtStr] = useState("");

  const [component, setComponent] = useState(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });

  useEffect(() => {
    if (!showDialog.show) {
      setSelectedAction(null);
    }
  }, [showDialog.show]);

  useEffect(() => {
    if (formValues?.doctor?.length > 0) {
      fetchPaymentDetails();
    } else {
      setPaymentCharges([]);
    }
  }, [formValues.doctor]);

  useEffect(() => {
    if (showDialog.rerender) {
      calculateTotalAmount(paymentCharges);
    }
  }, [showDialog.rerender]);

  useEffect(() => {
    if (selectedAction === null) return;
    setComponent(actionClickHandler(selectedAction));
    setShowDialog((prev) => {
      return { rerender: false, show: true, modalWidth: "md" };
    });
    return () => {
      setSelectedAction(null);
    };
  }, [selectedAction]);

  const actionClickHandler = (action) => {
    switch (action) {
      case "ADD_ANOTHER_SERVICE":
        return (
          <PaymentServicesChooser
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Choose Payment Services`}
            selectedRow={null}
            action={"ADD_ANOTHER_SERVICE"}
            paymentCharges={paymentCharges}
            setPaymentCharges={setPaymentCharges}
            setShowDialog={setShowDialog}
          />
        );
      default:
        return (
          <>
            <HeaderWithSearch
              hideSearchBar
              headerText={action}
              html={<CloseBtnHtml />}
            />
            <WorkInProgress />
          </>
        );
    }
  };

  const CloseBtnHtml = () => {
    return (
      <Button
        size="small"
        type="button"
        variant="outlined"
        color="error"
        sx={{
          maxWidth: "30px !important",
          minWidth: "30px !important",
          width: "30px !important",
        }}
        onClick={() => closeDialog()}
      >
        X
      </Button>
    );
  };

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedAction(null);
  };

  const fetchPaymentDetails = async () => {
    const response = await postData("/payment/registrationCharges", {
      serviceLocation: "REGISTRATION",
      doctor: formValues?.doctor,
    });
    const charges = response?.data ?? [];
    if (!charges && charges?.length === 0) return;
    setPaymentCharges(charges);
    calculateTotalAmount(charges);
    setPaymentChargeDetails(charges);
  };

  const calculateTotalAmount = (charges) => {
    const totalAmount = charges?.reduce(
      (acc, cur) => acc + cur.serviceAmount,
      0
    );
    setTotalAmtStr(`${totalAmount}`);
  };
  const PaymentSummary = () => {
    return (
      <GlassBG cardStyles={{ width: "190px", mt: 2, height: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "0.5px solid gray",
            }}
          >
            <Typography variant="caption">Service</Typography>
            <Typography variant="caption">Amount</Typography>
          </span>
          {paymentCharges?.map((x, i) => {
            return (
              <span
                key={i}
                style={{
                  display: "flex",
                  marginTop: "8px",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "10px" }}>
                  {x.serviceName}
                </Typography>
                <Typography variant="caption">{x.serviceAmount}</Typography>
              </span>
            );
          })}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "0.5px solid gray",
              mt: 1,
              pt: 1,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "10px" }}>
              Total in INR
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "12px" }}>
              {totalAmtStr ?? ""}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => setSelectedAction("ADD_ANOTHER_SERVICE")}
          >
            Add another service
          </Button>
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
        {paymentCharges?.length > 0 && (
          <>
            <PaymentSummary />
            <PaymentStatus sx={{ mt: 2 }} status={formValues?.paymentStatus} />
          </>
        )}
      </GlassBG>
      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>{component}</DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Payment;
