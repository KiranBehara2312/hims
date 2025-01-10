import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import F_Input from "../../components/custom/form/F_Input";
import F_Select from "../../components/custom/form/F_Select";
import {
  APPT_SOURCE_TYPES,
  APPT_VISIT_FOR,
  BLOOD_GROUPS,
  SALUTATIONS,
} from "../../constants/localDB/MastersDB";
import { GlassBG, MyHeading } from "../../components/custom";
import F_DatePicker from "../../components/custom/form/F_DatePicker";
import DisplayData from "../../components/shared/DisplayData";
import { REGEX_PATTERNS } from "../../constants/Regex";
import { formatDate, successAlert } from "../../helpers";
import { useSelector } from "react-redux";
import { postData } from "../../helpers/http";

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
  selectedSlot = null,
  action = null,
}) => {
  const theme = useTheme();
  const doctorsFromCache = useSelector((state) => state.apiCache.doctors);
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
    populatePatientDetails();
  }, [selectedPatient]);

  const populatePatientDetails = () => {
    if (selectedPatient !== null) {
      Object.entries(selectedPatient)?.map(([key, val], index) => {
        if (DEFAULT_VALUES.hasOwnProperty(key)) {
          setValue(key, val, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
          });
        }
      });
    }
    if (selectedSlot !== null) {
      Object.entries(selectedSlot)?.map(([key, val], index) => {
        if (DEFAULT_VALUES.hasOwnProperty(key)) {
          setValue(key, val, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
          });
        }
      });
    }
  };

  const onSubmit = async (formData) => {
    const docObj = doctorsFromCache?.find(
      (x) => x.userName === selectedSlot?.doctor
    );
    if (!docObj) return;

    const payload = {
      ...formData,
      slotTime: `${selectedSlot?.startTime} - ${selectedSlot?.endTime}`,
      doctorName: `Dr. ${docObj?.firstName} ${docObj?.lastName}`,
      appointmentDate: formatDate("DD/MM/YYYY", formValues.date),
      slotNextStatus: "Booked",
      slotNextStatusColor: "#0e0e93",
    };
    const response = await postData("/appointment/book", payload);
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({ rerender: true, show: false });
  };

  const resetForm = () => {
    reset();
    populatePatientDetails();
  };

  const FormButtons = () => {
    return (
      <Box sx={{ display: "flex", gap: 1, mr: 1 }}>
        <Button variant="outlined" size="small" type="submit">
          Submit
        </Button>
        <Button
          variant="outlined"
          size="small"
          type="reset"
          onClick={() => resetForm()}
        >
          Reset
        </Button>
      </Box>
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderWithSearch
          hideSearchBar
          notScrollable
          headerIcon={
            <IconWrapper defaultColor icon={<FaCalendarAlt size={20} />} />
          }
          headerText={headerText}
          html={
            <>
              <FormButtons />
              {dialogCloseBtn}
            </>
          }
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", m: 1, gap: 1 }}>
          <GlassBG cardStyles={{ width: CARD_WIDTH, mt: "50px" }}>
            <MyHeading
              alignCenter
              text="Slot & Doctor"
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />
            <Box
              sx={{
                borderRadius: "10px",
                width: "100%",
                height: "55px",
                mt: 1,
                mb: 2,
                border: "0.5px solid gray",
                borderLeft: `10px solid ${selectedSlot.color}`,
              }}
            >
              <MyHeading
                alignCenter
                text={`${selectedSlot?.slotNo} | ${selectedSlot?.bookingStatus}`}
                sx={{ mt: 1, fontSize: "16px", fontWeight: "bold" }}
              />
              <MyHeading
                alignCenter
                text={`${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}
                variant="caption"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <DisplayData label="Doctor" value={selectedSlot?.doctorName} />
              <DisplayData
                label="Designation"
                value={selectedSlot?.doctorDesignation}
              />
              <DisplayData
                label="Department"
                value={selectedSlot?.doctorDepartment}
              />
            </Box>
          </GlassBG>
          <GlassBG cardStyles={{ width: CARD_WIDTH, mt: "50px" }}>
            <MyHeading
              alignCenter
              text={`Patient ${selectedPatient?.UHID ?? ""} ${
                selectedPatient?.patientNo ?? ""
              }`}
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />
            <F_Select
              control={control}
              readOnly={selectedPatient !== null}
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
              readOnly={selectedPatient !== null}
              errors={errors}
              rules={{
                required: "First Name is required",
              }}
              label="First Name"
            />
            <F_Input
              name="middleName"
              control={control}
              readOnly={selectedPatient !== null}
              errors={errors}
              rules={{}}
              label="Middle Name"
            />
            <F_Input
              name="lastName"
              control={control}
              readOnly={selectedPatient !== null}
              errors={errors}
              rules={{
                required: "Last Name is required",
              }}
              label="Last Name"
            />
            <F_DatePicker
              name="dateOfBirth"
              control={control}
              readOnly={selectedPatient !== null}
              errors={errors}
              rules={{
                required: "Date Of Birth is required",
              }}
              label="Date Of birth"
            />
            <F_Select
              control={control}
              readOnly={selectedPatient !== null}
              name={"bloodGroup"}
              label={"Blood Group"}
              list={BLOOD_GROUPS}
              rules={{}}
              isRequired={true}
              errors={errors}
            />
            <F_Input
              name="contactNumber"
              control={control}
              readOnly={selectedPatient !== null}
              errors={errors}
              rules={{
                required: "Contact Number is required",
                pattern: {
                  value: REGEX_PATTERNS.mobileNumber,
                  message: "Invalid Contact number",
                },
              }}
              label="Contact Number"
            />
          </GlassBG>
          <GlassBG cardStyles={{ width: CARD_WIDTH, mt: "50px" }}>
            <MyHeading
              alignCenter
              text="Others"
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />
            <F_Select
              control={control}
              // readOnly={readOnly}
              name={"visitFor"}
              label={"Visit For"}
              list={APPT_VISIT_FOR}
              rules={{ required: "Visit For is required" }}
              isRequired={true}
              errors={errors}
            />
            <F_Select
              control={control}
              // readOnly={readOnly}
              name={"source"}
              label={"Source"}
              list={APPT_SOURCE_TYPES}
              rules={{ required: "Source is required" }}
              isRequired={true}
              errors={errors}
            />
            <F_Input
              name="additionalNotes"
              control={control}
              errors={errors}
              multiline
              maxRows={3}
              rules={{
                maxLength: {
                  value: 500,
                  message: "Max length exceeeded",
                },
              }}
              label="Additional Notes"
            />
          </GlassBG>
        </Box>
      </form>
    </>
  );
};

export default AppointmentForm;
