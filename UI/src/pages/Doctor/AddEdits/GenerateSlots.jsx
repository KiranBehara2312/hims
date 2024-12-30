import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import IconWrapper from "../../../components/custom/IconWrapper";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, InputAdornment, useTheme } from "@mui/material";
import { FaCalendarCheck, FaExpand, FaHistory } from "react-icons/fa";
import { postData } from "../../../helpers/http";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_TimeSelect from "../../../components/custom/form/F_TimeSelect";
import F_Input from "../../../components/custom/form/F_Input";
import F_DatePicker from "../../../components/custom/form/F_DatePicker";
import { errorAlert, successAlert } from "../../../helpers";
import {
  DAILY_SHIFT,
  WEEK_DAYS_LIST,
} from "../../../constants/localDB/MastersDB";
import DisplayData from "../../../components/shared/DisplayData";

const DEFAULT_VAL = {};

const GenerateSlots = ({
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

  useEffect(() => {
    if (formValues.date) {
      checkShouldWeGenerateSlots();
    }
  }, [formValues.date]);

  const checkShouldWeGenerateSlots = () => {
    const selectedDayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(new Date(formValues.date));
    const doctorAvailableDays = selectedRow?.availableDays ?? [];
    if (!doctorAvailableDays.includes(selectedDayName)) {
      errorAlert(
        `Dr. ${selectedRow?.firstName} ${selectedRow?.lastName} is not available on ${selectedDayName}`
      );
      setValue("date", "");
    }
  };

  const onSubmit = async (formData) => {
    const payload = {
      doctor: selectedRow?.userName,
      doctorName: `Dr. ${selectedRow?.firstName} ${selectedRow?.lastName}`,
      doctorDepartment: selectedRow?.department,
      doctorDesignation: selectedRow?.designation,
      startDate: `${formData.date}T${formData.fromTime}:00`,
      endDate: `${formData.date}T${formData.toTime}:00`,
      ...formData,
    };
    const response = await postData("/appointment/daySlotGeneration", payload);
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };

  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarCheck size={20} />} />
        }
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <MyHeading
        alignCenter
        text="Doctor Avialable Days"
        variant="h6"
        sx={{
          mt: "-10px",
          fontSize: "15px",
          fontWeight: "bold",
          pt: "60px",
          pb: "10px",
        }}
      />
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        {WEEK_DAYS_LIST?.map((x) => {
          return (
            <Button
              size="small"
              variant={
                selectedRow?.availableDays?.includes(x.label)
                  ? "contained"
                  : "outlined"
              }
              key={x.label}
              sx={{
                height: "25px",
                pointerEvents: "none",
                textDecoration: selectedRow?.availableDays?.includes(x.label)
                  ? ""
                  : "line-through",
              }}
            >
              <MyHeading text={x.shortName} variant="body2" alignCenter />
            </Button>
          );
        })}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <GlassBG cardStyles={{ width: "100%", m: 2, height: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            />
            <F_TimeSelect
              name="fromTime"
              control={control}
              errors={errors}
              rules={{
                required: "From Time is required",
              }}
              maxWidth="100%"
              label="From Time"
              minTime={
                DAILY_SHIFT?.find((x) => x.value === selectedRow?.shiftTimings)
                  ?.shiftTimingsFrom
              }
            />

            <F_TimeSelect
              name="toTime"
              control={control}
              errors={errors}
              rules={{
                required: "To Time is required",
              }}
              maxWidth="100%"
              label="To Time"
              maxTime={
                DAILY_SHIFT?.find((x) => x.value === selectedRow?.shiftTimings)
                  ?.shiftTimingsTo
              }
            />
            <F_Input
              name="slotDuration"
              control={control}
              errors={errors}
              rules={{}}
              maxWidth="100%"
              label="Slot Duration"
              readOnly
              defaultValue={selectedRow?.slotTime}
              isDisabled
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "0.75rem !important" }}
                >
                  Min
                </InputAdornment>
              }
            />
            <F_Input
              name="timeGap"
              control={control}
              errors={errors}
              rules={{}}
              maxWidth="100%"
              label="Time Gap"
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  Min
                </InputAdornment>
              }
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
            <Alert severity="info" sx={{ mt: 1 }}>
              Doctor is available in{" "}
              {
                DAILY_SHIFT?.find((x) => x.value === selectedRow?.shiftTimings)
                  ?.label
              }
            </Alert>
          </form>
        </GlassBG>
      </Box>
    </>
  );
};

export default GenerateSlots;
