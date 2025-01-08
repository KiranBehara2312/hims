import { Box, Button, Popover } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { GlassBG, MyHeading } from "../../components/custom";
import { useForm } from "react-hook-form";
import F_Input from "../../components/custom/form/F_Input";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt, FaEye, FaSearch } from "react-icons/fa";
import PatientInformationCard from "../../components/shared/PatientInformationCard";
import { ADMIN, STAFF } from "../../constants/roles";
import { useSelector } from "react-redux";
import { infoAlert } from "../../helpers";
import { postData } from "../../helpers/http";

const ACTIONS = [
  {
    name: "Book Appointment",
    privilege: "BOOK_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<FaCalendarAlt size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "View Appointment",
    privilege: "VIEW_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<FaEye size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
];
const SlotSelection = ({ slots = [] }) => {
  const [patient, setPatient] = useState(null);
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { doctor: "" },
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();

  const showActions = (event, slot) => {
    console.log(event, slot);
    event.preventDefault();
    setSelectedSlot(slot);
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };
  const closeActions = () => {
    setAnchorPosition(null);
    setSelectedSlot(null);
  };

  const searchPatient = async () => {
    if (formValues?.searchString == "") {
      return infoAlert("Please enter a value to find patient");
    }
    if (
      formValues?.searchString?.charAt(0) === "U" &&
      formValues?.searchString?.length !== 10
    ) {
      return infoAlert("Please enter a valid UHID");
    }
    if (
      formValues?.searchString?.charAt(0) === "P" &&
      formValues?.searchString?.length !== 9
    ) {
      return infoAlert("Please enter a valid Patient Number");
    }
    if (
      !isNaN(formValues?.searchString?.charAt(0)) &&
      formValues?.searchString?.length !== 10
    ) {
      return infoAlert("Please enter a valid Contact Number");
    }
    const response = await postData("/patients/patientById", {
      searchString: formValues?.searchString ?? "",
    });
    setPatient(response?.data ?? null);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={4}>
          <HeaderWithSearch
            headerText="Search Patient"
            hideSearchBar
            headerIcon={<IconWrapper defaultColor icon={<FaSearch />} />}
          />
          <GlassBG cardStyles={{ width: "90%", ml: 1 }}>
            <Grid container spacing={1}>
              <Grid size={8}>
                <F_Input
                  name="searchString"
                  control={control}
                  errors={errors}
                  rules={{}}
                  maxWidth="100%"
                  label="UHID / Patient No / Contact No"
                />
              </Grid>
              <Grid size={4} sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  size="small"
                  type="button"
                  variant="outlined"
                  sx={{ height: "35px" }}
                  onClick={searchPatient}
                >
                  Search
                </Button>
                <Button
                  fullWidth
                  size="small"
                  type="button"
                  variant="outlined"
                  sx={{ height: "35px" }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
            {patient !== null && <PatientInformationCard patient={patient} />}
          </GlassBG>
        </Grid>
        <Grid size={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {slots?.map((slot, i) => {
              return (
                <Box
                  onContextMenu={(event) => showActions(event, slot)}
                  key={slot?.calSlotCode}
                  sx={{
                    borderRadius: "10px",
                    width: "180px",
                    height: "75px",
                    border: "0.5px solid gray",
                    borderLeft: `10px solid ${slot.color}`,
                  }}
                >
                  <MyHeading
                    alignCenter
                    text={slot?.slotNo}
                    variant="h6"
                    sx={{ mt: 1 }}
                  />
                  <MyHeading
                    alignCenter
                    text={`${slot?.startTime} - ${slot?.endTime}`}
                    variant="caption"
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Popover
        open={Boolean(anchorPosition)}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        onClose={closeActions}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          <MyHeading
            variant="h6"
            alignCenter
            text={selectedSlot?.slotNo ?? ""}
          />
          {ACTIONS.filter((x) => x.access.includes(loggedInUser?.role))?.map(
            (x, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: "120px",
                    width: "200px",
                    maxWidth: "370px",
                    m: 1,
                    cursor: x.disabled ? "no-drop" : "pointer",
                    opacity: x.disabled ? 0.2 : 1,
                    pointerEvents: x.disabled ? "none" : "all",
                  }}
                >
                  <span style={{ flexBasis: "17%" }}>{x.icon}</span>
                  <MyHeading variant="caption" text={x.name} />
                </Box>
              );
            }
          )}
        </Box>
      </Popover>
    </>
  );
};

export default SlotSelection;
