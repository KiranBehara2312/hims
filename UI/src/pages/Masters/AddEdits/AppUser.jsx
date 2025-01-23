import { Alert, Box, Button, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import { FaUserPlus } from "react-icons/fa";
import { GlassBG } from "../../../components/custom";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import F_Input from "../../../components/custom/form/F_Input";
import F_Checkbox from "../../../components/custom/form/F_Checkbox";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import IconWrapper from "../../../components/custom/IconWrapper";
import { postData } from "../../../helpers/http";
import { successAlert } from "../../../helpers";
import { c_org, c_userRoles } from "../../../redux/slices/apiCacheSlice";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";

const DEFAULT_VAL = {
  orgId: "",
};

const ApplicationUser = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedRow = null,
  action = null,
}) => {
  const theme = useTheme();
  const cachedOrgData = useSelector(c_org);
  const cachedUserRolesData = useSelector(c_userRoles);
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
    // const a = "Thank you for adding an user into our database";
    // const utterance = new SpeechSynthesisUtterance(a);
    // window.speechSynthesis.speak(utterance)
    const payload = {
      userId: null,
      ...formData,
      fullName: `${formData?.firstName} ${formData?.middleName} ${formData?.lastName}`,
    };
    return;
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
          <IconWrapper defaultColor icon={<FaUserPlus size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <Box sx={{ display: "flex", gap: 1, m: 1 }}>
        <GlassBG cardStyles={{ width: "100%", height: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid size={6}>
                <F_Autocomplete
                  control={control}
                  name={"orgId"}
                  label={"Organisation"}
                  list={cachedOrgData}
                  rules={{ required: "org is required" }}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>
              <Grid size={6}>
                <F_Autocomplete
                  control={control}
                  name={"roleId"}
                  label={"Role"}
                  list={cachedUserRolesData?.filter((x) => x.id !== "RID0004")}
                  rules={{ required: "Role is required" }}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>
              <Grid size={6}>
                <F_Input
                  name="firstName"
                  control={control}
                  errors={errors}
                  rules={{}}
                  label="First Name"
                />
              </Grid>
              <Grid size={6}>
                <F_Input
                  name="middleName"
                  control={control}
                  errors={errors}
                  rules={{}}
                  label="Middle Name"
                />
              </Grid>
              <Grid size={6}>
                <F_Input
                  name="lastName"
                  control={control}
                  errors={errors}
                  rules={{}}
                  label="Last Name"
                />
              </Grid>
              <Grid size={6}>
                <F_Input
                  name="userPhone"
                  control={control}
                  errors={errors}
                  rules={{
                    pattern: {
                      value: REGEX_PATTERNS.mobileNumber,
                      message: "Invalid Phone no",
                    },
                  }}
                  label="Phone no"
                />
              </Grid>
              <Grid size={6}>
                <F_Input
                  name="userAadhar"
                  control={control}
                  errors={errors}
                  rules={{
                    pattern: {
                      value: REGEX_PATTERNS.aadhaarNumber,
                      message: "Invalid Aadhar no",
                    },
                  }}
                  label="Aadhar"
                />
              </Grid>
            </Grid>

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
          <Alert severity="info" sx={{ mt: 2 }}>
            Even ADMIN can't create a Doctor user from here
          </Alert>
        </GlassBG>
      </Box>
    </Box>
  );
};

export default ApplicationUser;
