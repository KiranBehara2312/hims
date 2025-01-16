import React, { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme,
  DialogTitle,
} from "@mui/material";
import {
  DAILY_SHIFT,
  DOCTOR_DEPARTMENTS,
  DOCTOR_DESIGNATIONS,
  GENDER_LIST,
  WEEK_DAYS_LIST,
} from "../../../constants/localDB/MastersDB";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Select from "../../../components/custom/form/F_Select";
import F_Input from "../../../components/custom/form/F_Input";
import { IoCloseCircle } from "react-icons/io5";
import { postData } from "../../../helpers/http";
import { camelToTitle, successAlert } from "../../../helpers";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import { FaPlus } from "react-icons/fa";
import IconWrapper from "../../../components/custom/IconWrapper";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import F_DatePicker from "../../../components/custom/form/F_DatePicker";

const DoctorInformation = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedRow = null,
  action = null,
}) => {
  const theme = useTheme();
  const readOnly = action === "VIEW";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CARD_WIDTH = isSmallScreen ? "100%" : "250px";
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedRow !== null) {
      Object.entries(selectedRow)?.map(([key, val], index) => {
        setValue(key, val, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      });
    }
  }, [selectedRow]);

  const onSubmit = async (formData) => {
    const response = await postData("/doctor/add", formData);
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };
  const onUpdate = async (formData) => {
    const response = await postData(
      `/doctor/update/${selectedRow?.userName}`,
      formData
    );
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };

  return (
    <>
      <HeaderWithSearch
        notScrollable
        hideSearchBar
        headerIcon={<IconWrapper defaultColor icon={<FaPlus size={20} />} />}
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <form
        onSubmit={handleSubmit(action === "ADD" ? onSubmit : onUpdate)}
        style={{ width: "100%", paddingTop: "50px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: isSmallScreen ? "wrap" : "nowrap",
          }}
        >
          <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, height: "auto" }}>
            <MyHeading
              alignCenter
              text="Doctor Information"
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />
            <F_Input
              name="firstName"
              readOnly={readOnly}
              control={control}
              errors={errors}
              rules={{ required: "First Name is required" }}
              label="First Name"
            />
            <F_Input
              name="lastName"
              readOnly={readOnly}
              control={control}
              errors={errors}
              rules={{ required: "Last Name is required" }}
              label="Last Name"
            />

            <F_DatePicker
              name="dateOfBirth"
              readOnly={readOnly}
              control={control}
              errors={errors}
              type="date"
              rules={{ required: "DOB is required" }}
              label="Date Of Birth"
            />

            <F_Select
              control={control}
              name={"gender"}
              readOnly={readOnly}
              label={"Gender"}
              list={GENDER_LIST}
              rules={{ required: "Gender is required" }}
              isRequired={true}
              errors={errors}
            />

            <F_Input
              name="contactNumber"
              control={control}
              readOnly={readOnly}
              errors={errors}
              rules={{
                required: "Contact No is required",
                pattern: {
                  value: REGEX_PATTERNS.mobileNumber,
                  message: "Invalid Contact number",
                },
              }}
              label="Contact No"
            />

            <F_Input
              name="alternateMobileNo"
              control={control}
              readOnly={readOnly}
              errors={errors}
              rules={{
                pattern: {
                  value: REGEX_PATTERNS.mobileNumber,
                  message: "Invalid mobile number",
                },
              }}
              label="Alt Contact No"
            />
          </GlassBG>
          <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, height: "auto" }}>
            <MyHeading
              alignCenter
              text="Professional Information"
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />
            <F_Select
              control={control}
              readOnly={readOnly}
              name={"designation"}
              label={"Designation"}
              list={DOCTOR_DESIGNATIONS}
              rules={{ required: "Designation is required" }}
              isRequired={true}
              errors={errors}
            />

            <F_Autocomplete
              control={control}
              readOnly={readOnly}
              name={"department"}
              label={"Department"}
              list={DOCTOR_DEPARTMENTS}
              rules={{ required: "Department is required" }}
              isRequired={true}
              errors={errors}
            />

            <F_Input
              name="specialization"
              control={control}
              readOnly={readOnly}
              errors={errors}
              rules={{
                required: "Specialization is required",
              }}
              label="Specialization"
            />
            <F_Input
              name="qualification"
              control={control}
              readOnly={readOnly}
              errors={errors}
              rules={{
                required: "Qualification is required",
              }}
              label="Qualification"
            />
            <F_Input
              name="medicalLicenseNumber"
              control={control}
              readOnly={readOnly}
              errors={errors}
              defaultHelperText={"Ex: DL-12345/2020"}
              rules={{
                required: "Medical License Number is required",
                pattern: {
                  value: REGEX_PATTERNS.MEDICAL_LICENSE_NUMBER,
                  message: "Invalid MLN",
                },
              }}
              label="Medical License Number"
            />
          </GlassBG>

          <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, height: "auto" }}>
            <MyHeading
              alignCenter
              text="Shift & Fee Information"
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />

            <F_Select
              control={control}
              readOnly={readOnly}
              name={"shiftTimings"}
              label={"Shift Timings"}
              list={DAILY_SHIFT}
              rules={{ required: "Shift Timings is required" }}
              isRequired={true}
              errors={errors}
            />

            <F_Select
              control={control}
              readOnly={readOnly}
              name={"availableDays"}
              label={"Available Days"}
              list={WEEK_DAYS_LIST}
              rules={{ required: "Available Days is required" }}
              isRequired={true}
              errors={errors}
              multiple
            />

            <F_Input
              name="slotTime"
              control={control}
              readOnly={readOnly}
              errors={errors}
              rules={{
                required: "Slot Time is required",
              }}
              label="Slot Time"
            />
            <F_Input
              name="fee"
              control={control}
              readOnly={readOnly}
              errors={errors}
              rules={{
                required: "Fee is required",
              }}
              label="Fee"
            />

            {action !== "VIEW" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ m: 0.5 }}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  onClick={() => resetForm()}
                  variant="contained"
                  fullWidth
                  sx={{ m: 0.5 }}
                >
                  Reset
                </Button>
              </Box>
            )}
          </GlassBG>
        </Box>
      </form>
    </>
  );
};

export default DoctorInformation;
