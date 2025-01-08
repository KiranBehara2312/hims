import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import F_Input from "../../components/custom/form/F_Input";
import F_Select from "../../components/custom/form/F_Select";
import { SALUTATIONS } from "../../constants/localDB/MastersDB";

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

  return (
    <Box>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarAlt size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <form>
        <HeaderWithSearch
          hideSearchBar
          headerText="Patient Details"
          headerIcon={<IconWrapper icon={<FaUser />} defaultColor />}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
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
        </Box>
      </form>
    </Box>
  );
};

export default AppointmentForm;
