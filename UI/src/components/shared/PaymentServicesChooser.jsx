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
  Pagination,
} from "@mui/material";
import { GlassBG, MyHeading } from "../custom";
import Grid from "@mui/material/Grid2";
import { FaServicestack } from "react-icons/fa";
import HeaderWithSearch from "../custom/HeaderWithSearch";
import IconWrapper from "../custom/IconWrapper";
import { useForm } from "react-hook-form";
import F_Input from "../custom/form/F_Input";
import { errorAlert, warnAlert } from "../../helpers";
import NoDataFound from "./NoDataFound";
import { REGEX_PATTERNS } from "../../constants/Regex";

const PaymentServicesChooser = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedRow = null,
  action = null,
  paymentCharges = [],
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
  const [paginationObj, setPaginationObj] = useState({
    totalPages: 0,
    totalRecords: 0,
    page: 0,
  });
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [paymentServices, setPaymentServices] = useState([]);
  const [incomingPaymentCharges, setIncomingPaymentCharges] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setIncomingPaymentCharges(paymentCharges);
  }, [paymentCharges]);

  const fetchPaymentServices = async (page = 1, limit = 15) => {
    if (isNaN(formValues?.searchString)) {
      if (formValues?.searchString?.length < 3) {
        return errorAlert(
          "Please enter service name or code to fetch details",
          {
            autoClose: 1500,
          }
        );
      }
    }
    if (formValues?.searchString?.length > 20) {
      return errorAlert("Length Exceeded, please check the search input", {
        autoClose: 1500,
      });
    }
    const response = await postData("/paymentServices/search", {
      page: page,
      limit: limit,
      searchString: formValues?.searchString ?? "",
    });
    setPaginationObj((prev) => {
      return {
        ...prev,
        totalPages: response?.pagination?.totalPages,
        totalRecords: response?.pagination?.totalRecords,
        page: response?.pagination?.currentPage,
      };
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

  const removeCheckedItem = (val, serviceId) => {
    if (!val) {
      setIncomingPaymentCharges((prev) =>
        prev.filter((x) => x.serviceId !== serviceId)
      );
    }
  };

  const markItemAsChecked = (val, serviceId) => {
    if (!val) {
      removeCheckedItem(val, serviceId);
      setPaymentServices(
        (prev) =>
          prev?.map((x) => {
            return {
              ...x,
              checked: x.serviceId === serviceId ? false : x.checked,
            };
          }) ?? []
      );
      return;
    }
    const alreadyAdded = incomingPaymentCharges?.find(
      (x) => x.serviceId === serviceId
    );
    if (alreadyAdded) {
      return warnAlert("Service is already in use..");
    }
    const newService = paymentServices?.find((x) => x.serviceId === serviceId);
    if (newService) {
      newService.checked = val;
      newService.canUncheck = true;
    }
    setIncomingPaymentCharges((prev) => {
      return [...prev, newService];
    });
  };

  const addButtonHandler = () => {
    setPaymentCharges(() => incomingPaymentCharges);
    setShowDialog(() => {
      return { show: false, rerender: true };
    });
    setAddButtonClicked((prev) => false);
    reset();
    setPaymentServices(() => []);
  };

  useEffect(() => {
    if (addButtonClicked) {
      addButtonHandler();
    }
    const totalAmount = incomingPaymentCharges?.reduce(
      (acc, cur) => acc + +cur.serviceAmount,
      0
    );
    const roundedTotalAmount = totalAmount ? totalAmount.toFixed(2) : "0.00";
    setTotalAmount(roundedTotalAmount);
  }, [incomingPaymentCharges, addButtonClicked]);

  const paginationChangeHandler = (event, newPage) => {
    fetchPaymentServices(newPage, 15);
  };

  return (
    <Box sx={{ minHeight: "500px" }}>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper
            defaultColor
            icon={<FaServicestack size={"1.15rem"} />}
          />
        }
        headerText={headerText}
        html={
          <>
            <Button
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => setAddButtonClicked(() => true)}
            >
              Submit
            </Button>
            {dialogCloseBtn}
          </>
        }
      />
      <Grid container spacing={1} sx={{ m: 0.5 }}>
        <Grid size={6}>
          <GlassBG>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MyHeading
                text={`Service's in use (${incomingPaymentCharges?.length})`}
                variant="rem095"
                sx={{ mt: -1, pl: 1 }}
              />
              <MyHeading
                text={totalAmount}
                variant="rem095"
                sx={{ mt: -1, pr: 2 }}
              />
            </Box>
            {incomingPaymentCharges?.length === 0 && (
              <NoDataFound headingVariant="rem1" />
            )}
            <Box
              sx={{ minHeight: "360px", maxHeight: "360px", overflowY: "auto" }}
            >
              {incomingPaymentCharges?.map((x, i) => {
                return (
                  <Box
                    key={x.serviceId}
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
                          removeCheckedItem(event.target.checked, x.serviceId)
                        }
                      />
                      <MyHeading
                        variant="rem075"
                        text={`${x.serviceName} (${x.serviceId})`}
                      />
                    </span>
                    <MyHeading variant="rem075" text={x.serviceAmount} />
                  </Box>
                );
              })}
            </Box>
          </GlassBG>
        </Grid>
        <Grid size={6}>
          <GlassBG>
            <MyHeading
              alignCenter
              text="Service's that can be opted"
              variant="rem095"
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
                  rules={{
                    pattern: {
                      value: REGEX_PATTERNS.alphaNumeric,
                      message: "Invalid Service Code / Service Name",
                    },
                  }}
                  label="Service Code / Service Name"
                />
              </Grid>
              <Grid size={2}>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => fetchPaymentServices(1, 15)}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{ minHeight: "280px", maxHeight: "300px", overflowY: "auto" }}
            >
              {paymentServices?.length === 0 && <NoDataFound sx={{ mt: 10 }} />}
              {paymentServices?.map((x) => {
                return (
                  <Box
                    key={x.serviceId}
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
                          markItemAsChecked(event.target.checked, x.serviceId)
                        }
                      />
                      <MyHeading
                        variant="rem075"
                        text={`${x.serviceName} (${x.serviceId})`}
                      />
                    </span>
                    <MyHeading variant="rem075" text={x.serviceAmount} />
                  </Box>
                );
              })}
            </Box>
            <Pagination
              sx={{ pt: 3, mb: -2, float: "right" }}
              variant="outlined"
              color="primary"
              size="small"
              shape="rounded"
              count={paginationObj?.totalPages}
              page={paginationObj?.page ?? 1}
              onChange={paginationChangeHandler}
            />
          </GlassBG>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentServicesChooser;
