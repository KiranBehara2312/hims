import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt, FaUndo } from "react-icons/fa";
import NoDataFound from "../../components/shared/NoDataFound";
import { useForm } from "react-hook-form";
import { Box, Button, Popover } from "@mui/material";
import { postData } from "../../helpers/http";
import F_Autocomplete from "../../components/custom/form/F_AutoComplete";
import DoctorInformationCard from "../../components/shared/DoctorInformationCard";
import F_DatePicker from "../../components/custom/form/F_DatePicker";
import { addDaysToCurrentDate } from "../../helpers";
import { MAX_NO_OF_DAYS_AHEAD_TO_BOOK_APT } from "../../constants/C_Appointment";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
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
    setShowDocPopover(false);
  };
  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarAlt size={20} />} />
        }
        headerText={`Appointment ${selectedDoctor ? "- Dr." : ""}
        ${selectedDoctor?.firstName ?? ""} ${selectedDoctor?.lastName ?? ""}`}
        html={
          <>
            <Button
              size="small"
              type="button"
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
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
      <Popover
        open={showDocPopover}
        anchorEl={anchorEl}
        onClose={() => setShowDocPopover(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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
          <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
            Load Slots
          </Button>
          <DoctorInformationCard selectedDoctor={selectedDoctor} />
        </Box>
      </Popover>
      <NoDataFound sx={{ mt: 10 }} />
    </>
  );
};

export default Appointment;
