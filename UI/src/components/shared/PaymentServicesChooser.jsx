import React, { useEffect, useState } from "react";
import { postData } from "../../helpers/http";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { GlassBG, MyHeading } from "../custom";
import Grid from "@mui/material/Grid2";
import { FaServicestack } from "react-icons/fa";
import HeaderWithSearch from "../custom/HeaderWithSearch";
import IconWrapper from "../custom/IconWrapper";
import { useForm } from "react-hook-form";
import F_Input from "../custom/form/F_Input";
import { errorAlert, warnAlert } from "../../helpers";

const PaymentServicesChooser = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedRow = null,
  action = null,
  paymentCharges = [], // incoming from parent
  setPaymentCharges = () => {},
}) => {
  const {
    handleSubmit: handleSubmit1,
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
  const [paymentServices, setPaymentServices] = useState([]);
  const [incomingPaymentCharges, setIncomingPaymentCharges] = useState([]);

  useEffect(() => {
    setIncomingPaymentCharges(paymentCharges);
  }, [paymentCharges]);

  const fetchPaymentServices = async () => {
    if (formValues?.searchString?.length < 3) {
      return errorAlert("Please enter service name or code to fetch details", {
        autoClose: 1500,
      });
    }
    if (formValues?.searchString?.length > 15) {
      return errorAlert("Length Exceeded, please check the search input", {
        autoClose: 1500,
      });
    }
    const response = await postData("/payment/paymentServices", {
      page: 1,
      limit: 20,
      searchString: formValues?.searchString ?? "",
    });
    setPaymentServices(
      response?.data?.map((x) => {
        return {
          ...x,
          checked: false,
        };
      }) ?? []
    );
  };

  const removeCheckedItem = (val, serviceCode) => {
    if (!val) {
      setIncomingPaymentCharges((prev) =>
        prev.filter((x) => x.serviceCode !== serviceCode)
      );
    }
  };

  const markItemAsChecked = (val, serviceCode) => {
    if (!val) {
      removeCheckedItem(val, serviceCode);
      setPaymentServices(
        (prev) =>
          prev?.map((x) => {
            return {
              ...x,
              checked: x.serviceCode === serviceCode ? false : x.checked,
            };
          }) ?? []
      );
      return;
    }
    const alreadyAdded = incomingPaymentCharges?.find(
      (x) => x.serviceCode === serviceCode
    );
    if (alreadyAdded) {
      return warnAlert("Service is already in user, can not add...");
    }
    const newService = paymentServices?.find(
      (x) => x.serviceCode === serviceCode
    );
    if (newService) {
      newService.checked = val;
      newService.canUncheck = true;
    }
    setIncomingPaymentCharges((prev) => {
      return [...prev, newService];
    });
  };

  const addButtonHandler = () => {
    setPaymentCharges(incomingPaymentCharges);
    setShowDialog({ show: false, rerender: true });
  };

  return (
    <Box>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper defaultColor icon={<FaServicestack size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <Grid container spacing={1} sx={{ pt: 6, m: 1 }}>
        <Grid size={6}>
          <GlassBG cardStyles={{ height: "100%" }}>
            <MyHeading
              alignCenter
              text="Service's in use"
              variant="body1"
              sx={{ mt: -1 }}
            />
            {incomingPaymentCharges?.map((x) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pr: 2,
                    alignItems: "center",
                  }}
                >
                  <span>
                    <Checkbox
                      size="small"
                      checked={x.checked ?? true}
                      disabled={
                        x.canUncheck === undefined ? true : !x.canUncheck
                      }
                      onChange={(event) =>
                        removeCheckedItem(event.target.checked, x.serviceCode)
                      }
                    />
                    <MyHeading
                      variant="caption"
                      text={`${x.serviceName} (${x.serviceCode})`}
                    />
                  </span>
                  <MyHeading variant="caption" text={x.serviceAmount} />
                </Box>
              );
            })}
          </GlassBG>
        </Grid>
        <Grid size={6}>
          <GlassBG cardStyles={{ height: "100%" }}>
            <MyHeading
              alignCenter
              text="Service's that can be opted"
              variant="body1"
              sx={{ mt: -1 }}
            />
            <Grid
              container
              spacing={1}
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <Grid size={10}>
                <F_Input
                  name="searchString"
                  placeholder="Enter 3 characters"
                  control={control}
                  errors={errors}
                  rules={{}}
                  label="Service Code / Service Name"
                />
              </Grid>
              <Grid size={2}>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={fetchPaymentServices}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            {paymentServices?.map((x) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pr: 2,
                    alignItems: "center",
                  }}
                >
                  <span>
                    <Checkbox
                      size="small"
                      checked={x?.checked ?? false}
                      onChange={(event) =>
                        markItemAsChecked(event.target.checked, x.serviceCode)
                      }
                    />
                    <MyHeading
                      variant="caption"
                      text={`${x.serviceName} (${x.serviceCode})`}
                    />
                  </span>
                  <MyHeading variant="caption" text={x.serviceAmount} />
                </Box>
              );
            })}
          </GlassBG>
        </Grid>
      </Grid>
      <Box sx={{ pt: 5 }}></Box>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => addButtonHandler()}
        sx={{ mt: 2 }}
      >
        Add
      </Button>
      <Alert severity="info" sx={{ mt: 2 }}>
        Disabled services are the default services for this procedure.
      </Alert>
    </Box>
  );
};

export default PaymentServicesChooser;
