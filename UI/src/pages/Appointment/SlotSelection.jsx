import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { GlassBG, MyHeading } from "../../components/custom";
import { useForm } from "react-hook-form";
import F_Input from "../../components/custom/form/F_Input";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import {
  FaCalendarAlt,
  FaCross,
  FaEye,
  FaSearch,
  FaTimesCircle,
  FaUserAltSlash,
} from "react-icons/fa";
import PatientInformationCard from "../../components/shared/PatientInformationCard";
import { ADMIN, STAFF } from "../../constants/roles";
import { useSelector } from "react-redux";
import { camelToTitle, infoAlert, warnAlert } from "../../helpers";
import { BiTransfer } from "react-icons/bi";

import { postData } from "../../helpers/http";
import AppointmentForm from "./AppointmentForm";
import WorkInProgress from "../../components/shared/WorkInProgress";

const ACTIONS = [
  {
    name: "Book",
    privilege: "BOOK_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<FaCalendarAlt size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "View",
    privilege: "VIEW_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<FaEye size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Cancel",
    privilege: "CANCEL_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<FaTimesCircle size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Transfer",
    privilege: "TRANSFER_APPOINTMENT",
    icon: <IconWrapper defaultColor icon={<BiTransfer size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Mark No-Show",
    privilege: "MARK_NO_SHOW",
    icon: (
      <IconWrapper defaultColor icon={<FaUserAltSlash nsfer size={18} />} />
    ),
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
];
const SlotSelection = ({ slots = [] }) => {
  const [patient, setPatient] = useState(null);
  const theme = useTheme();
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const [selectedSlot, setSelectedSlot] = useState({
    data: null,
    action: null,
  });
  const [anchorPosition, setAnchorPosition] = useState(null);
  const lessThanMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });

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
    event.preventDefault();
    setSelectedSlot({
      data: slot,
      action: null,
    });
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };
  const closeActions = () => {
    setAnchorPosition(null);
    setSelectedSlot({
      data: null,
      action: null,
    });
  };

  const actionClickHandler = (action) => {
    setSelectedSlot((prev) => {
      return {
        data: prev.data,
        action: action,
      };
    });
    setShowDialog({
      modalWidth: "md",
      rerender: false,
      show: true,
    });
  };

  const searchPatient = async () => {
    if (formValues?.searchString == "") {
      setPatient(null);
      return warnAlert("Please enter a value to find patient");
    }
    if (
      formValues?.searchString?.charAt(0) === "U" &&
      formValues?.searchString?.length !== 10
    ) {
      setPatient(null);
      return warnAlert("Please enter a valid UHID");
    }
    if (
      formValues?.searchString?.charAt(0) === "P" &&
      formValues?.searchString?.length !== 9
    ) {
      setPatient(null);
      return warnAlert("Please enter a valid Patient Number");
    }
    if (
      !isNaN(formValues?.searchString?.charAt(0)) &&
      formValues?.searchString?.length !== 10
    ) {
      setPatient(null);
      return warnAlert("Please enter a valid Contact Number");
    }
    const response = await postData("/patients/patientById", {
      searchString: formValues?.searchString ?? "",
    });
    setPatient(response?.data ?? null);
  };

  const CloseBtnHtml = () => {
    return (
      <Button
        size="small"
        type="button"
        variant="outlined"
        color="error"
        sx={{
          maxWidth: "30px !important",
          minWidth: "30px !important",
          width: "30px !important",
        }}
        onClick={() => closeDialog()}
      >
        X
      </Button>
    );
  };

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedPatient({ action: null, data: null });
  };

  const getDialogContent = (action) => {
    switch (action) {
      case "BOOK_APPOINTMENT":
        return (
          <AppointmentForm
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`${camelToTitle("book")} Appointment`}
            selectedSlot={selectedSlot?.data}
            action={selectedSlot?.action}
            setShowDialog={setShowDialog}
            patient={patient ?? null}
          />
        );
      default:
        return (
          <>
            <HeaderWithSearch
              hideSearchBar
              headerText={action}
              html={<CloseBtnHtml />}
            />
            <WorkInProgress />
          </>
        );
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={lessThanMd ? 12 : 4}>
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
        <Grid size={lessThanMd ? 12 : 8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              mt: 1,
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
                    height: "55px",
                    border: "0.5px solid gray",
                    borderLeft: `10px solid ${slot.color}`,
                  }}
                >
                  <MyHeading
                    alignCenter
                    text={slot?.slotNo}
                    sx={{ mt: 1, fontSize: "16px", fontWeight: "bold" }}
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
            text={selectedSlot?.data?.slotNo ?? ""}
          />
          {ACTIONS.filter((x) => x.access.includes(loggedInUser?.role))?.map(
            (x, i) => {
              return (
                <Box
                  onClick={() => actionClickHandler(x.privilege)}
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

      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>
            {getDialogContent(selectedSlot?.action)}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SlotSelection;
