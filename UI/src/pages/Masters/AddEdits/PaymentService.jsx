import { Box, Button, InputAdornment, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import { FaServicestack } from "react-icons/fa";
import { GlassBG } from "../../../components/custom";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import F_Input from "../../../components/custom/form/F_Input";
import F_Checkbox from "../../../components/custom/form/F_Checkbox";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import IconWrapper from "../../../components/custom/IconWrapper";
import { postData } from "../../../helpers/http";
import { successAlert } from "../../../helpers";

const DEFAULT_VAL = {
  serviceName: "",
  serviceAmount: "",
  serviceDescription: "",
  isDiscountApplicable: false,
  maxDiscountInPercent: 0,
  serviceLocationId: "",
  isSponsorPayService: false,
  isOpService: false,
  isIpService: false,
  isHospitalService: true,
  isExternalService: false,
  isPackage: false,
  isActive: true,
};

const PaymentService = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedRow = null,
  action = null,
}) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VAL,
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();
  const [serviceLocations, setServiceLocations] = useState([]);

  useEffect(() => {
    fetchServiceLocations();
  }, []);

  const fetchServiceLocations = async () => {
    const res = await postData("masters/data", {
      type: "paymentServiceLocations",
      limit: "infinity",
    });
    setServiceLocations(res?.data ?? []);
  };

    const memoizedServiceLocations = useMemo(
      () => serviceLocations,
      [serviceLocations]
    );


  const onSubmit = async (formData) => {
    const response = await postData(
      "/paymentServices/add",
      {
        ...formData,
        isDiscountApplicable: formData.isDiscountApplicable ? 1 : 0,
        isSponsorPayService: formData.isSponsorPayService ? 1 : 0,
        isDiscountApplicable: formData.isDiscountApplicable ? 1 : 0,
        isOpService: formData.isOpService ? 1 : 0,
        isIpService: formData.isIpService ? 1 : 0,
        isHospitalService: formData.isHospitalService ? 1 : 0,
        isExternalService: 0, // if isHospitalService is true, then no need of this field
        isPackage: formData.isPackage ? 1 : 0,
        isActive: formData.isActive ? 1 : 0,
      },
      "Saving Payment Service..."
    );
    setShowDialog({ show: false, rerender: true });
    successAlert(response?.message);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderWithSearch
          hideSearchBar
          notScrollable
          headerIcon={
            <IconWrapper defaultColor icon={<FaServicestack size={20} />} />
          }
          headerText={headerText}
          html={
            <>
              <Button
                variant="outlined"
                size="small"
                type="submit"
                sx={{ mr: 1 }}
              >
                Submit
              </Button>
              {dialogCloseBtn}
            </>
          }
        />
        <GlassBG cardStyles={{ height: "auto" }}>
          <F_Autocomplete
            control={control}
            name={"serviceLocationId"}
            label={"Service Location"}
            list={memoizedServiceLocations}
            rules={{ required: "Service Location is required" }}
            isRequired={true}
            errors={errors}
          />
          <F_Input
            name="serviceName"
            control={control}
            errors={errors}
            rules={{ maxLength: 150 }}
            label="Service Name"
          />
          <F_Input
            name="serviceDescription"
            control={control}
            errors={errors}
            multiline
            maxRows={3}
            rules={{ maxLength: 500 }}
            label="Service Description"
          />
          <F_Input
            name="serviceAmount"
            control={control}
            errors={errors}
            rules={{
              pattern: {
                value: REGEX_PATTERNS.decimalNumber,
                message: "Invalid amount",
              },
            }}
            label="Service Amount"
            endAdornment={<InputAdornment position="start">INR</InputAdornment>}
          />
          <F_Checkbox
            name="isDiscountApplicable"
            label="Is Discount Applicable?"
            control={control}
            errors={errors}
            rules={{}}
          />
          {formValues.isDiscountApplicable && (
            <F_Input
              name="maxDiscountInPercent"
              control={control}
              errors={errors}
              rules={{
                pattern: {
                  value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                  message: "Invalid amount",
                },
                max: {
                  value: 100,
                  message: "Value can not be more than 100",
                },
              }}
              label="Max discount in Percent"
              endAdornment={<InputAdornment position="start">%</InputAdornment>}
            />
          )}
          <F_Checkbox
            name="isSponsorPayService"
            label="Is Sponsor Pay Service?"
            control={control}
            errors={errors}
            rules={{}}
          />
          <F_Checkbox
            name="isOpService"
            label="Is OP Service?"
            control={control}
            errors={errors}
            rules={{}}
          />
          <F_Checkbox
            name="isIpService"
            label="Is IP Service?"
            control={control}
            errors={errors}
            rules={{}}
          />
          <F_Checkbox
            name="isHospitalService"
            label="Is Hospital Service?"
            control={control}
            errors={errors}
            rules={{}}
          />
          <F_Checkbox
            name="isPackage"
            label="Is this Service a Package?"
            control={control}
            errors={errors}
            rules={{}}
          />
          <F_Checkbox
            name="isActive"
            label="Is this Service Active?"
            control={control}
            errors={errors}
            rules={{}}
          />
        </GlassBG>
      </form>
    </Box>
  );
};

export default PaymentService;
