import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../../components/custom/HeaderWithSearch";
import IconWrapper from "../../../components/custom/IconWrapper";
import { MdNoteAlt } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { FaArrowCircleDown, FaExpand, FaHistory } from "react-icons/fa";
import { IoIosArrowDropupCircle } from "react-icons/io";
import DisplayData from "../../../components/shared/DisplayData";
import { getData, postData } from "../../../helpers/http";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Select from "../../../components/custom/form/F_Select";
import F_Input from "../../../components/custom/form/F_Input";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import { formatDate, successAlert } from "../../../helpers";
import MyTable from "../../../components/custom/MyTable";
import NoDataFound from "../../../components/shared/NoDataFound";

const DEFAULT_VAL = {};

const PatientVitals = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Add Vitals",
  selectedPatient = null,
  action = null,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  const [doctor, setDoctor] = useState(null);
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
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });

  useEffect(() => {
    if (selectedPatient !== null) {
      fetchDoctorById();
      fetchVitalHistory({
        page: 1,
        limit: 10,
        UHID: selectedPatient?.UHID,
      });
    }
  }, []);

  const fetchVitalHistory = async (paginationObj) => {
    const response = await postData(`/patients/vitalHistory`, paginationObj);
    if (response) {
      const oneObj = response?.data?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            id: x,
            label: x,
            minWidth: 110,
            type: x === "createdAt" || x === "updatedAt" ? "date" : "string",
          };
        }),
        data: response?.data ?? [],
        totalCount: response?.totalPages || 0,
        defaultPage: response?.page || 0,
      });
    } else {
      setTableObj({
        columns: [],
        data: [],
        totalCount: 0,
        defaultPage: 0,
      });
    }
  };

  const fetchDoctorById = async () => {
    const doc = await getData(`doctor/doctorById/${selectedPatient?.doctor}`);
    setDoctor(doc?.data?.[0]);
  };

  const onSubmit = async (formData) => {
    const payload = {
      UHID: selectedPatient?.UHID,
      patientNo: selectedPatient?.patientNo,
      datedOn: formatDate("DD/MM/YYYY HH:mm"),
      ...formData,
    };
    const response = await postData("/patients/addVitals", payload);
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: false,
    });
  };

  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        notScrollable
        headerIcon={<IconWrapper defaultColor icon={<MdNoteAlt size={20} />} />}
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{ mb: 1, pt: "40px" }}
      >
        <AccordionSummary
          expandIcon={<FaArrowCircleDown style={{ color: "white" }} />}
        >
          Patient Details
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 3,
            }}
          >
            <DisplayData value={selectedPatient?.UHID} label="UHID" />
            <DisplayData
              value={selectedPatient?.patientNo}
              label="Patient No"
            />
            <DisplayData value={selectedPatient?.fullName} label="Name" />
            <DisplayData value={selectedPatient?.ageString} label="Age" />
            {/* <DisplayData value={selectedPatient?.dateOfBirth} label="D.O.B" /> */}
            <DisplayData value={selectedPatient?.gender} label="Gender" />
            <DisplayData
              value={selectedPatient?.bloodGroup}
              label="Blood Group"
            />
            <DisplayData
              value={"Dr. " + doctor?.firstName + " " + doctor?.lastName}
              label="Doctor"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ display: "flex", gap: 1 }}>
        <GlassBG cardStyles={{ width: "240px", m: 2, height: "auto" }}>
          <MyHeading
            alignCenter
            text="Vital Information"
            variant="h6"
            sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <F_Input
              name="weight"
              control={control}
              errors={errors}
              rules={{
                required: "Weight is required",
                pattern: {
                  value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                  message: "Invalid Weight",
                },
                maxLength: { value: 3, message: "Max Length exceeded" },
              }}
              label="Weight"
              isRequired={true}
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  Kg
                </InputAdornment>
              }
            />
            <F_Input
              name="height"
              control={control}
              errors={errors}
              rules={{
                required: "Height is required",
                pattern: {
                  value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                  message: "Invalid Height",
                },
                maxLength: { value: 3, message: "Max Length exceeded" },
              }}
              label="Height"
              isRequired={true}
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  cm
                </InputAdornment>
              }
            />
            <F_Input
              name="temperature"
              control={control}
              errors={errors}
              rules={{
                required: "Temperature is required",
                pattern: {
                  value: REGEX_PATTERNS.BODY_TEMPERATURE,
                  message: "Invalid Temperature",
                },
              }}
              label="Temperature"
              isRequired={true}
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  °F
                </InputAdornment>
              }
            />
            <F_Input
              name="bloodPressure"
              control={control}
              errors={errors}
              rules={{
                required: "Blood Pressure is required",
                pattern: {
                  value: REGEX_PATTERNS.BLOOD_PRESSURE,
                  message: "Invalid Blood Pressure",
                },
              }}
              label="Blood Pressure"
              isRequired={true}
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  sys/dia
                </InputAdornment>
              }
            />
            <F_Input
              name="pulse"
              control={control}
              errors={errors}
              rules={{
                required: "Heart Rate (pulse) is required",
                maxLength: { value: 3, message: "Max Length exceeded" },
                pattern: {
                  value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                  message: "Invalid Pulse",
                },
              }}
              label="Pulse"
              isRequired={true}
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "13px !important" }}
                >
                  BPM
                </InputAdornment>
              }
            />
            <F_Input
              name="additionalNotes"
              control={control}
              errors={errors}
              rules={{}}
              multiline
              maxRows={3}
              label="Additional Information"
            />
            <Button variant="contained" size="small" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </GlassBG>

        <Box sx={{ width: "80%", overflow: "auto" }}>
          <HeaderWithSearch
            headerText="Vital History"
            hideSearchBar
            headerIcon={
              <IconWrapper
                icon={
                  <FaHistory size={20} color={theme.palette.primary.main} />
                }
              />
            }
          />
          {tableObj?.columns?.length === 0 && (
            <Box sx={{ height: "70%" }}>
              <NoDataFound />
            </Box>
          )}
          {tableObj.columns?.length > 0 && (
            <MyTable
              {...tableObj}
              helperNote={
                "Note: Weight(Kg), Height(Cm), Temperature(Fahrenheit)"
              }
              actions={[]}
              actionWithRecord={null}
              changedPage={(newPage) => {
                fetchVitalHistory({
                  page: newPage,
                  limit: 10,
                });
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default PatientVitals;
