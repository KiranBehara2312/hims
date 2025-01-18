import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { GlassBG, MyHeading } from "../custom";
import F_Select from "../custom/form/F_Select";
import {
  PAYMENT_STATUSES,
  PAYMENT_TYPES,
} from "../../constants/localDB/MastersDB";
import F_Input from "../custom/form/F_Input";
import PaymentStatus from "../custom/PaymentStatus";
import { useEffect, useState } from "react";
import HeaderWithSearch from "../custom/HeaderWithSearch";
import { FaMoneyBill } from "react-icons/fa";
import IconWrapper from "../custom/IconWrapper";
import Grid from "@mui/material/Grid2";
import { errorAlert, formatDate, successAlert } from "../../helpers";
import { postData } from "../../helpers/http";

const SubmitPayment = ({
  payments = [],
  UHID = "",
  dialogCloseBtn = null,
  setShowDialog = () => {},
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { searchString: "" },
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();
  const [totalAmtStr, setTotalAmtStr] = useState("");

  useEffect(() => {
    if (payments?.length > 0) calculateTotalAmount(payments);
  }, [payments]);

  const addServicesAgainstPatient = async (formData) => {
    if (UHID === "" || payments?.length === 0) {
      return errorAlert("Unable to add services against patient...");
    }
    const paymentDate = formatDate("DD/MM/YYYY hh:mm:ss");
    const response = await postData("/serviceBilling/new", {
      UHID: UHID,
      payments: payments?.map((x) => {
        return { ...x, ...formData, paymentDate };
      }),
    });
    successAlert(response?.message);
    setShowDialog((prev) => {
      return {
        ...prev,
        show: false,
        rerender: true,
      };
    });
  };

  const calculateTotalAmount = (charges) => {
    const totalAmount = charges?.reduce(
      (acc, cur) => acc + cur.serviceAmount,
      0
    );
    setTotalAmtStr(`${totalAmount}`);
  };

  // Payment Summary component
  const PaymentSummary = () => {
    return (
      <GlassBG
        cardStyles={{
          minWidth: "250px",
          minHeight: "227px",
          maxHeight: "300px",
          overflowY: "auto",
          height: "auto",
        }}
      >
        <MyHeading
          alignCenter
          text="Service Details"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />
        <Grid container spacing={1} sx={{ borderBottom: "0.5px solid gray" }}>
          <Grid size={2} sx={{ fontSize: "13px" }}>
            Code
          </Grid>
          <Grid size={8} sx={{ fontSize: "13px" }}>
            Name
          </Grid>
          <Grid size={2} sx={{ fontSize: "13px", textAlign: "right" }}>
            Amount
          </Grid>
        </Grid>
        <Box sx={{ maxHeight: "180px", overflowY: "auto" }}>
          {payments?.map((x, i) => (
            <Grid
              container
              direction={"row"}
              key={i}
              style={{
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              <Grid size={2}>{x.serviceCode}</Grid>
              <Grid size={8}>{x.serviceName}</Grid>
              <Grid size={2} sx={{ textAlign: "right", pr: 0.5 }}>
                {x.serviceAmount}
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "0.5px solid gray",
              mt: 1,
              pt: 1,
              position: "absolute",
              width: "95%",
              bottom: "0px",
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "10px" }}>
              Total in INR
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "12px" }}>
              {totalAmtStr ?? ""}
            </Typography>
          </Box>
        </Box>
      </GlassBG>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(addServicesAgainstPatient)}>
        <HeaderWithSearch
          hideSearchBar
          notScrollable
          headerIcon={
            <IconWrapper defaultColor icon={<FaMoneyBill size={20} />} />
          }
          headerText={"Review & pay"}
          html={
            <>
              <Button
                sx={{ mr: 1 }}
                variant="outlined"
                type="submit"
                size="small"
              >
                Save
              </Button>
              {dialogCloseBtn}
            </>
          }
        />
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid size={4}>
            <GlassBG cardStyles={{ height: "auto" }}>
              <MyHeading
                alignCenter
                text="Submit Payment"
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
            </GlassBG>
          </Grid>
          <Grid size={8}>
            {payments?.length > 0 && (
              <>
                <PaymentSummary />
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SubmitPayment;
