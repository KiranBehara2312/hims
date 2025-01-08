import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import F_Input from "../../components/custom/form/F_Input";
import F_Select from "../../components/custom/form/F_Select";
import { BLOOD_GROUPS, SALUTATIONS } from "../../constants/localDB/MastersDB";
import { GlassBG, MyHeading } from "../../components/custom";
import F_DatePicker from "../../components/custom/form/F_DatePicker";

const DEFAULT_VALUES = {
  firstName: "",
  middleName: "",
  lastName: "",
  salutation: "",
  contactNumber: "",
  bloodGroup: "",
  dateOfBirth: "",
  UHID: "",
  patientNo: "",
  slotNo: "",
  slotTime: "",
  bookingStatus: "",
  calSlotCode: "",
  appointmentDate: "",
  doctor: "",
  doctorDepartment: "",
  doctorDesignation: "",
};

const AppointmentForm = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Book Appointment",
  selectedPatient = null,
  action = null,
}) => {
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CARD_WIDTH = isSmallScreen ? "100%" : "250px";

  useEffect(() => {
    if (selectedPatient !== null) {
      Object.entries(selectedPatient)?.map(([key, val], index) => {
        setValue(key, val, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      });
    }
  }, [selectedPatient]);
  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarAlt size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, mt: "50px" }}>
        <form>
          <MyHeading
            alignCenter
            text="Patient Information"
            variant="h6"
            sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
          />
          <F_Select
            control={control}
            // readOnly={readOnly}
            name={"salutation"}
            label={"Salutation"}
            list={SALUTATIONS}
            rules={{ required: "Salutation is required" }}
            isRequired={true}
            errors={errors}
          />
          <F_Input
            name="firstName"
            control={control}
            // readOnly={readOnly}
            errors={errors}
            rules={{
              required: "First Name is required",
            }}
            label="First Name"
          />
          <F_Input
            name="middleName"
            control={control}
            // readOnly={readOnly}
            errors={errors}
            rules={{
              required: "Middle Name is required",
            }}
            label="Middle Name"
          />
          <F_Input
            name="lastName"
            control={control}
            // readOnly={readOnly}
            errors={errors}
            rules={{
              required: "Last Name is required",
            }}
            label="Last Name"
          />
          <F_DatePicker
            name="dateOfBirth"
            control={control}
            // readOnly={readOnly}
            errors={errors}
            rules={{
              required: "Date Of Birth is required",
            }}
            label="Date Of birth"
          />
          <F_Select
            control={control}
            // readOnly={readOnly}
            name={"bloodGroup"}
            label={"Blood Group"}
            list={BLOOD_GROUPS}
            rules={{}}
            isRequired={true}
            errors={errors}
          />
        </form>
      </GlassBG>
    </>
  );
};

export default AppointmentForm;
