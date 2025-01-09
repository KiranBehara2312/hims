import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import {
  FaCalendarAlt,
  FaCalendarPlus,
  FaCircle,
  FaNotesMedical,
  FaTrash,
  FaUndo,
} from "react-icons/fa";
import NoDataFound from "../../components/shared/NoDataFound";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  List,
  ListItem,
  Popover,
} from "@mui/material";
import { postData } from "../../helpers/http";
import F_Autocomplete from "../../components/custom/form/F_AutoComplete";
import DoctorInformationCard from "../../components/shared/DoctorInformationCard";
import F_DatePicker from "../../components/custom/form/F_DatePicker";
import {
  addDaysToCurrentDate,
  infoAlert,
  successAlert,
  warnAlert,
} from "../../helpers";
import { MAX_NO_OF_DAYS_AHEAD_TO_BOOK_APT } from "../../constants/C_Appointment";
import {
  APPOINTMENT_BOOKING_STATUS,
  WEEK_DAYS_LIST,
} from "../../constants/localDB/MastersDB";
import SlotSelection from "./SlotSelection";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { MyHeading } from "../../components/custom";
import { ADMIN, STAFF } from "../../constants/roles";
import WorkInProgress from "../../components/shared/WorkInProgress";
import useConfirmation from "../../hooks/useConfirmation";
import GenerateSlots from "../Doctor/AddEdits/GenerateSlots";

const ACTIONS = [
  {
    name: "Doctor's Instruction",
    privilege: "DOCTORS_INSTRUCTION",
    icon: <IconWrapper defaultColor icon={<FaNotesMedical size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Delete Elapsed Slots",
    privilege: "DELETE_ELAPSED_SLOTS",
    icon: <IconWrapper color={"darkred"} icon={<FaTrash size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Delete Slots",
    privilege: "DELETE_SLOTS",
    icon: <IconWrapper color={"darkred"} icon={<FaTrash size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
  {
    name: "Generate Extra Slots",
    privilege: "GENERATE_EXTRA_SLOTS",
    icon: <IconWrapper defaultColor icon={<FaCalendarPlus size={18} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
    modalWidth: "md",
  },
];

const Appointment = () => {
  const { DialogComponent, openDialog } = useConfirmation();

  const dispatch = useDispatch();
  const [legendEl, setLegendEl] = useState(null);
  const [actionEl, setActionEl] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showSlotGenBtn, setShowSlotGenBtn] = useState(false);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [showDocPopover, setShowDocPopover] = useState(false);
  const [selectedHeaderAction, setSelectedHeaderAction] = useState(null);
  const [component, setComponent] = useState(null);
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

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedHeaderAction === null) return;
    setComponent(actionClickHandler(selectedHeaderAction));
    if (selectedHeaderAction !== "DELETE_ELAPSED_SLOTS") {
      setShowDialog({ rerender: false, show: true });
    }
  }, [selectedHeaderAction]);

  const fetchDoctors = async () => {
    const response = await postData("/doctor/doctors", {
      page: 1,
      limit: 100,
    });
    setDoctors(
      response?.data?.map((x) => {
        return {
          ...x,
          value: x.userName,
          label: `Dr. ${x.firstName} ${x.lastName}`,
        };
      }) ?? []
    );
  };

  const docSelectionHandler = (doc) => {
    const selDoc = doctors.find((x) => x.userName === doc) ?? null;
    setSelectedDoctor(selDoc);
  };

  const loadSlotsHandler = async () => {
    if (formValues.date === "" || formValues.doctor == "") {
      setShowSlotGenBtn(false);
      return warnAlert("Date and Doctor are required to fetch slots", {
        autoClose: 1500,
      });
    }
    dispatch(showLoader("Loading Slots..."));
    const payload = {
      date: formValues.date,
      doctor: formValues.doctor,
    };
    const response = await postData("/appointment/doctorSlots", payload);
    if (response?.data?.length > 0) {
      let slots = response?.data?.map((x) => {
        return {
          ...x,
          slotOrder: x.slotNo?.split("-")[1],
        };
      });
      setDoctorSlots(slots.sort((a, b) => a.slotOrder - b.slotOrder) ?? []);
    }
    dispatch(hideLoader());
    if (!response.isSlotsAvailable) {
      setDoctorSlots([]);
      setShowSlotGenBtn(true);
      infoAlert(response.message, { autoClose: 1500 });
    } else {
      setShowDocPopover(false);
      setShowSlotGenBtn(false);
      successAlert(response.message, { autoClose: 1500 });
    }
  };

  const closeDocPopover = (event, reason) => {
    if (reason === "backdropClick") {
      return; // Do nothing on backdrop click
    }
    setShowDocPopover(false);
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
    setSelectedHeaderAction(null);
  };

  const actionClickHandler = (action) => {
    switch (action) {
      case "DELETE_ELAPSED_SLOTS":
        return openDialog(
          "Are you sure you want to delete elapsed slots?",
          deleteElapsedSlotsHandler
        );
      case "GENERATE_SLOTS":
        return (
          <GenerateSlots
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`Generate Slots for Dr.${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}
            selectedRow={selectedDoctor}
            action={"GENERATE_SLOTS"}
            setShowDialog={setShowDialog}
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

  const getHeaderText = () => {
    let headerText = `Appointment `;
    if (selectedDoctor) {
      headerText += ` for Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`;
    }
    if (formValues?.date) {
      headerText += ` | ${formValues?.date} | ${
        WEEK_DAYS_LIST[new Date(formValues?.date)?.getDay()]?.label
      }`;
    }

    return headerText;
  };

  const deleteElapsedSlotsHandler = async (confirmed) => {
    setSelectedHeaderAction(null);
    if (!confirmed) {
      return;
    }
    if (selectedDoctor === null) return;
    const response = await postData("/appointment/deleteElapsedSlots", {
      doctor: selectedDoctor?.userName,
    });
    successAlert(response.message, { autoClose: 1500 });
    loadSlotsHandler();
  };

  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarAlt size={20} />} />
        }
        headerText={`${getHeaderText()}`}
        html={
          <>
            {doctorSlots?.length > 0 && (
              <>
                <Button
                  size="small"
                  type="button"
                  variant="outlined"
                  sx={{ ml: 2 }}
                  onClick={(e) => {
                    setActionEl(e.currentTarget);
                  }}
                >
                  Actions
                </Button>
                <Button
                  size="small"
                  type="button"
                  variant="outlined"
                  sx={{ ml: 2 }}
                  onClick={(e) => {
                    setLegendEl(e.currentTarget);
                  }}
                >
                  Legend
                </Button>
              </>
            )}
            <Button
              size="small"
              type="button"
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={(e) => {
                setShowDocPopover(true);
              }}
            >
              {selectedDoctor !== null ? "Change" : "Choose"} Doctor
            </Button>
            <Button
              size="small"
              type="button"
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => {
                reset();
                setSelectedDoctor(null);
                setSelectedHeaderAction(null);
                setDoctorSlots([]);
                setShowSlotGenBtn(false);
              }}
            >
              Reset Everything
            </Button>
          </>
        }
      />
      <Dialog
        open={showDocPopover}
        maxWidth={"sm"}
        fullWidth
        onClose={closeDocPopover}
      >
        <HeaderWithSearch
          hideSearchBar
          headerText="Choose/Change Doctor"
          html={
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
              onClick={() => setShowDocPopover(false)}
            >
              X
            </Button>
          }
        />
        <Box
          sx={{
            m: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <F_DatePicker
              name="date"
              control={control}
              errors={errors}
              type="date"
              rules={{
                required: "Date is required",
              }}
              label="Date"
              minDate={new Date().toISOString().split("T")[0]}
              maxDate={
                addDaysToCurrentDate(MAX_NO_OF_DAYS_AHEAD_TO_BOOK_APT)
                  .toISOString()
                  .split("T")[0]
              }
            />
            <F_Autocomplete
              control={control}
              name={"doctor"}
              label={"Doctor"}
              list={doctors}
              rules={{}}
              errors={errors}
              onSelect={docSelectionHandler}
            />
          </Box>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onClick={loadSlotsHandler}
          >
            Load Slots
          </Button>
          {showSlotGenBtn && (
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => {
                setSelectedHeaderAction("GENERATE_SLOTS");
              }}
            >
              <FaCalendarAlt style={{ paddingRight: "10px" }} />
              Generate Slots
            </Button>
          )}
          <DoctorInformationCard selectedDoctor={selectedDoctor} />
        </Box>
      </Dialog>
      <Popover
        open={Boolean(legendEl)}
        anchorEl={legendEl}
        onClose={() => setLegendEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {APPOINTMENT_BOOKING_STATUS?.map((x) => {
          return (
            <List key={x.color} dense>
              <ListItem>
                <FaCircle style={{ color: x.color, paddingRight: "10px" }} />
                <MyHeading variant="caption" text={x.label} />
              </ListItem>
            </List>
          );
        })}
      </Popover>

      <Popover
        open={Boolean(actionEl)}
        anchorEl={actionEl}
        onClose={() => setActionEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {ACTIONS?.map((x, i) => {
          return (
            <Box
              onClick={() => {
                setSelectedHeaderAction(x.privilege);
              }}
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                minWidth: "120px",
                width: "200px",
                maxWidth: "370px",
                m: 1.5,
                mb: 2,
                cursor: x.disabled ? "no-drop" : "pointer",
                opacity: x.disabled ? 0.2 : 1,
                pointerEvents: x.disabled ? "none" : "all",
              }}
            >
              <span style={{ flexBasis: "17%" }}>{x.icon}</span>
              <MyHeading variant="caption" text={x.name} />
            </Box>
          );
        })}
      </Popover>

      {doctorSlots?.length > 0 && <SlotSelection slots={doctorSlots} />}
      {doctorSlots?.length === 0 && <NoDataFound sx={{ mt: 10 }} />}
      {DialogComponent}
      {showDialog.show && (
        <Dialog maxWidth={showDialog.modalWidth} fullWidth open={true}>
          <DialogContent sx={{ m: 1 }}>{component}</DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Appointment;
