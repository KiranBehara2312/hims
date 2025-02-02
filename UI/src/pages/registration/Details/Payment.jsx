import React, { useEffect, useState, useCallback } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import { PAYMENT_STATUSES } from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  Typography,
} from "@mui/material";
import PaymentStatus from "../../../components/custom/PaymentStatus";
import { postData } from "../../../helpers/http";
import PaymentServicesChooser from "../../../components/shared/PaymentServicesChooser";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import WorkInProgress from "../../../components/shared/WorkInProgress";
import { FaPencilAlt } from "react-icons/fa";
import MyTooltip from "../../../components/shared/MyTootlip";
import { useSelector } from "react-redux";
import { c_paymentTypes } from "../../../redux/slices/apiCacheSlice";
import { NEVER_CHANGING_VALS } from "../../../constants/localDB/neverChanging";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";

const Payment = ({
  control,
  errors,
  formValues,
  setValue,
  setPaymentChargeDetails = () => {},
}) => {
  const cachedPaymentTypes = useSelector(c_paymentTypes);
  const [paymentCharges, setPaymentCharges] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [totalAmtStr, setTotalAmtStr] = useState("");
  const [component, setComponent] = useState(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });

  // Use callback to prevent unnecessary re-renders
  const actionClickHandler = useCallback(
    (action) => {
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
    },
    [paymentCharges]
  );

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
        onClick={closeDialog}
      >
        X
      </Button>
    );
  };

  const closeDialog = () => {
    setShowDialog((prev) => ({ ...prev, show: false }));
    setSelectedAction(() => "");
    setComponent(() => null);
  };

  // Fetch payment details
  const fetchPaymentDetails = async () => {
    const response = await postData("/paymentServices/registrationServices", {
      doctor: formValues?.doctor,
      uhid: null,
      patientType: formValues?.patientType,
    });
    const charges = response?.data ?? [];
    if (!charges.length) return;
    setPaymentCharges(charges);
    calculateTotalAmount(charges);
  };

  const calculateTotalAmount = (charges) => {
    const totalAmount = charges?.reduce(
      (acc, cur) => acc + +cur.serviceAmount,
      0
    );
    const roundedTotalAmount = totalAmount ? totalAmount.toFixed(2) : "0.00";
    setPaymentChargeDetails(charges);
    setTotalAmtStr(`${roundedTotalAmount}`);
  };

  // Side effects to handle dialog and selectedAction
  useEffect(() => {
    if (!selectedAction) return;
    const componentToRender = actionClickHandler(selectedAction);
    setComponent(componentToRender);

    return () => {
      setSelectedAction(() => "");
      setComponent(() => null);
      setShowDialog((prev) => ({
        rerender: false,
        show: false,
        modalWidth: "md",
      }));
    };
  }, [selectedAction, actionClickHandler]);

  useEffect(() => {
    if (component !== null) {
      setShowDialog((prev) => ({
        rerender: false,
        show: true,
        modalWidth: "md",
      }));
    }
  }, [component]);

  useEffect(() => {
    // if (formValues?.doctor?.length > 0) {
    //   fetchPaymentDetails();
    // } else {
    //   setPaymentCharges([]);
    // }
    fetchPaymentDetails();
  }, [formValues.doctor, formValues?.patientType, formValues?.patientCategory]);

  useEffect(() => {
    if (showDialog.rerender) {
      calculateTotalAmount(paymentCharges);
      setComponent(null);
      setSelectedAction("");
    }
  }, [showDialog.rerender, paymentCharges]);

  // Payment Summary component
  const PaymentSummary = () => {
    return (
      <>
        {paymentCharges?.map((x, i) => (
          <span
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "0.25px solid gray",
            }}
          >
            <MyTooltip
              title={x.serviceName?.length > 30 ? x.serviceName : null}
            >
              <MyHeading variant="rem055" text={x.serviceName} />
            </MyTooltip>
            <MyHeading variant="rem075" text={x.serviceAmount} sx={{ pr: 1 }} />
          </span>
        ))}
      </>
    );
  };

  const fillPayeeNameHanlder = () => {
    if (formValues?.patientCategory !== NEVER_CHANGING_VALS.PAT_CAT_PAYER) {
      setValue(
        "payeeName",
        `${formValues?.firstName} ${formValues?.middleName} ${formValues?.lastName}`
      );
    } else {
      setValue("payeeName", `${formValues?.sponsorName}`);
    }
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Payment"
          variant="rem095"
          sx={{ mt: "-10px" }}
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
        <F_Autocomplete
          control={control}
          name={"paymentType"}
          label={"Payment Type"}
          list={
            formValues?.patientCategory === NEVER_CHANGING_VALS.PAT_CAT_PAYER
              ? cachedPaymentTypes?.filter(
                  (x) =>
                    x.dropdownValue === NEVER_CHANGING_VALS.PAY_TYPE_INSURANCE
                )
              : cachedPaymentTypes?.filter(
                  (x) =>
                    x.dropdownValue !== NEVER_CHANGING_VALS.PAY_TYPE_INSURANCE
                )
          }
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
          endAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() => fillPayeeNameHanlder()}
            >
              <MyTooltip title="Click to fill Payee Name">
                <FaPencilAlt />
              </MyTooltip>
            </InputAdornment>
          }
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
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <MyHeading variant="rem065" text="Service" />
              <MyHeading variant="rem065" text="Amount" sx={{ pr: 1 }} />
            </span>

            <Box sx={{ maxHeight: "245px", overflowY: "auto" }}>
              <PaymentSummary />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 0.5,
                borderTop: "0.25px solid gray",
              }}
            >
              <MyHeading variant="rem065" text="Total in INR" />
              <MyHeading
                variant="rem075"
                text={totalAmtStr ?? ""}
                sx={{ pr: 1 }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
              onClick={() => setSelectedAction("ADD_ANOTHER_SERVICE")}
            >
              Add another service
            </Button>
            <PaymentStatus sx={{ mt: 1 }} status={formValues?.paymentStatus} />
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
