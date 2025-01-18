import React, { useEffect, useState } from "react";
import PaymentServicesChooser from "../../components/shared/PaymentServicesChooser";
import { GlassBG } from "../../components/custom";
import Grid from "@mui/material/Grid2";
import F_Input from "../../components/custom/form/F_Input";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import PatientInformationCard from "../../components/shared/PatientInformationCard";
import { useForm } from "react-hook-form";
import { errorAlert, successAlert, warnAlert } from "../../helpers";
import { postData } from "../../helpers/http";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaHandHoldingUsd, FaSearch } from "react-icons/fa";
import SubmitPayment from "../../components/shared/SubmitPayment";
import WorkInProgress from "../../components/shared/WorkInProgress";

const ServiceBilling = () => {
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
  const [paymentCharges, setPaymentCharges] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [resetEverything, setResetEverything] = useState(false);
  const [selectedHeaderAction, setSelectedHeaderAction] = useState(null);
  const [component, setComponent] = useState(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });

  useEffect(() => {
    if (selectedHeaderAction === null) return;
    setComponent(() => actionClickHandler(selectedHeaderAction));
    setShowDialog((prev) => {
      return {
        ...prev,
        show: true,
      };
    });
  }, [selectedHeaderAction]);

  useEffect(() => {
    if (!showDialog.show) {
      setSelectedHeaderAction(() => null);
    }
  }, [showDialog.show]);

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
    setShowDialog((prev) => {
      return {
        ...prev,
        show: false,
        rerender: false,
      };
    });
    setSelectedHeaderAction(() => null);
  };

  const actionClickHandler = (action) => {
    switch (action) {
      case "REVIEW_AND_PAY":
        return (
          <SubmitPayment
            UHID={selectedPatient?.UHID}
            payments={paymentCharges}
            dialogCloseBtn={<CloseBtnHtml />}
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

  const searchPatient = async ({ searchString }) => {
    if (searchString === "") {
      setSelectedPatient(null);
      return warnAlert("Please enter a value to find patient");
    }
    if (searchString?.charAt(0) === "U" && searchString?.length !== 10) {
      setSelectedPatient(null);
      return warnAlert("Please enter a valid UHID");
    }
    if (searchString?.charAt(0) === "P" && searchString?.length !== 9) {
      setSelectedPatient(null);
      return warnAlert("Please enter a valid Patient Number");
    }
    if (!isNaN(searchString?.charAt(0)) && searchString?.length !== 10) {
      setSelectedPatient(null);
      return warnAlert("Please enter a valid Contact Number");
    }
    const response = await postData("/patients/patientById", {
      searchString: searchString ?? "",
    });
    setSelectedPatient(response?.data ?? null);
  };

  const resetEverythingHandler = () => {
    setResetEverything((prev) => !prev);
    setSelectedPatient(() => null);
    setPaymentCharges(() => []);
    reset();
  };

  const showReviewAndPayDialog = () => {
    if (selectedPatient === null || paymentCharges?.length === 0) {
      return errorAlert("Patient and Payments are required to proceed...");
    }
    setSelectedHeaderAction(() => "REVIEW_AND_PAY");
  };

  return (
    <>
      <HeaderWithSearch
        headerText="Service Billing"
        hideSearchBar
        headerIcon={<IconWrapper defaultColor icon={<FaHandHoldingUsd />} />}
        html={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => showReviewAndPayDialog()}
            >
              Review & Pay
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={resetEverythingHandler}
            >
              Reset Everything
            </Button>
          </Box>
        }
      />
      <Grid container spacing={1} key={resetEverything}>
        <Grid size={4}>
          <HeaderWithSearch
            headerText="Search Patient"
            hideSearchBar
            headerIcon={<IconWrapper defaultColor icon={<FaSearch />} />}
          />
          <form onSubmit={handleSubmit(searchPatient)}>
            <GlassBG>
              <Grid container spacing={1}>
                <Grid size={8}>
                  <F_Input
                    name="searchString"
                    control={control}
                    errors={errors}
                    rules={{}}
                    label="UHID / Patient No / Contact No"
                  />
                </Grid>
                <Grid size={4} sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button
                    fullWidth
                    size="small"
                    type="submit"
                    variant="outlined"
                    sx={{ height: "35px" }}
                  >
                    Search
                  </Button>
                  <Button
                    fullWidth
                    size="small"
                    type="button"
                    variant="outlined"
                    sx={{ height: "35px" }}
                    onClick={() => {
                      resetEverythingHandler();
                    }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>

              <PatientInformationCard patient={selectedPatient} />
            </GlassBG>
          </form>
        </Grid>
        <Grid size={8} sx={{ mt: 1 }}>
          {selectedPatient !== null && (
            <PaymentServicesChooser
              headerText="Payment Sevices"
              paymentCharges={paymentCharges}
              setPaymentCharges={setPaymentCharges}
            />
          )}
        </Grid>
      </Grid>
      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>{component}</DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ServiceBilling;
