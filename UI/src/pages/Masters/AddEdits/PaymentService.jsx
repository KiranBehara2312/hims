import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import { FaServicestack } from "react-icons/fa";
import { GlassBG } from "../../../components/custom";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import F_Input from "../../../components/custom/form/F_Input";
import F_Checkbox from "../../../components/custom/form/F_Checkbox";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import { SERVICE_LOCATIONS } from "../../../constants/localDB/PaymentServices";
import IconWrapper from "../../../components/custom/IconWrapper";
import { postData } from "../../../helpers/http";
import { successAlert } from "../../../helpers";

const DEFAULT_VAL = {
  serviceName: "",
  serviceAmount: "",
  isDiscountApplicable: false,
  maximumDiscountInPercent: 0,
  serviceLocation: "",
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

  const onSubmit = async (formData) => {
    const response = await postData(
      "/payment/addPaymentService",
      formData,
      "Saving Payment Service..."
    );
    setShowDialog({ show: false, rerender: true });
    successAlert(response?.message);
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
      <Box sx={{ display: "flex", gap: 1, m: 1 }}>
        <GlassBG cardStyles={{ width: "100%", height: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <F_Autocomplete
              control={control}
              name={"serviceLocation"}
              label={"Service Location"}
              list={SERVICE_LOCATIONS}
              rules={{ required: "Service Location is required" }}
              isRequired={true}
              errors={errors}
            />
            <F_Input
              name="serviceName"
              control={control}
              errors={errors}
              rules={{}}
              label="Service Name"
            />
            <F_Input
              name="serviceAmount"
              control={control}
              errors={errors}
              rules={{
                pattern: {
                  value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                  message: "Invalid amount",
                },
                maxLength: {
                  value: 4,
                  message: "Exceeded the max limit, contact Administrator",
                },
              }}
              label="Service Amount"
            />

            <F_Checkbox
              name="isDiscountApplicable"
              label="Is Discount Applicable?"
              control={control}
              errors={errors}
              rules={{}}
            />

            <F_Checkbox
              name="isActive"
              label="Is Active?"
              control={control}
              errors={errors}
              rules={{}}
            />

            <Button
              variant="contained"
              size="small"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </GlassBG>
      </Box>
    </Box>
  );
};

export default PaymentService;
