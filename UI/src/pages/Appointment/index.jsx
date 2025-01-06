import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt, FaCircle, FaUndo } from "react-icons/fa";
import NoDataFound from "../../components/shared/NoDataFound";
import { useForm } from "react-hook-form";
import { Box, Button, Dialog, List, ListItem, Popover } from "@mui/material";
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

const Appointment = () => {
  const [legendEl, setLegendEl] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showSlotGenBtn, setShowSlotGenBtn] = useState(false);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [showDocPopover, setShowDocPopover] = useState(false);
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
    if (!response.isSlotsAvailable) {
      setShowSlotGenBtn(true);
      infoAlert(response.message, { autoClose: 1500 });
    } else {
      setShowDocPopover(false);
      setShowSlotGenBtn(false);
      successAlert(response.message, { autoClose: 1500 });
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
              }}
            >
              Reset Everything
            </Button>
          </>
        }
      />
      <Dialog open={showDocPopover} onClose={() => setShowDocPopover(false)}>
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
            width: "500px !important",
            minWidth: "500px !important",
            maxWidth: "500px !important",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              maxWidth: "99%",
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
              maxWidth="100%"
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
              maxWidth="100%"
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
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
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
                {x.label}
              </ListItem>
            </List>
          );
        })}
      </Popover>

      {doctorSlots?.length > 0 && <SlotSelection slots={doctorSlots} />}
      {doctorSlots?.length === 0 && <NoDataFound sx={{ mt: 10 }} />}
    </>
  );
};

export default Appointment;
