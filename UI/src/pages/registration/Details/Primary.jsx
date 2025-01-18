import React from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import {
  PATIENT_TYPES,
  REGISTRATION_TYPES,
  VISIT_TYPES,
} from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import { Box, InputAdornment, Tooltip } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import F_Checkbox from "../../../components/custom/form/F_Checkbox";
import IconWrapper from "../../../components/custom/IconWrapper";
import { FaCircleInfo } from "react-icons/fa6";
import MyTootlip from "../../../components/shared/MyTootlip";

const Primary = ({ control, errors, readOnly = "" }) => {
  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Primary Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Input
          name="registrationDate"
          control={control}
          errors={errors}
          rules={{}}
          label="Registration Date"
          isDisabled
        />

        <F_Select
          control={control}
          name={"patientType"}
          label={"Patient Type"}
          list={PATIENT_TYPES}
          rules={{ required: "Patient Type is required" }}
          defaultValue={"Out Patient" ?? ""}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />
        <F_Select
          control={control}
          name={"registrationType"}
          label={"Registration Type"}
          list={REGISTRATION_TYPES}
          rules={{ required: "Registration Type is required" }}
          defaultValue={"New" ?? ""}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />
        <F_Select
          control={control}
          name={"visitType"}
          label={"Visit Type"}
          list={VISIT_TYPES}
          rules={{ required: "Visit Type is required" }}
          defaultValue={"New Case" ?? ""}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />
        <F_Input
          name="UHID"
          control={control}
          errors={errors}
          rules={{}}
          label="UHID"
          readOnly={readOnly === "EDIT" || readOnly === "VIEW"}
          isDisabled={readOnly === "EDIT" || readOnly === "VIEW"}
          endAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() => alert("Hi")}
            >
              <FaSearch />
            </InputAdornment>
          }
          defaultHelperText="Type UHID and hit enter to load data"
        />
        <F_Input
          name="patientNo"
          control={control}
          errors={errors}
          rules={{}}
          label="Patient No"
          defaultHelperText="Type PatientNo and hit enter to load data"
          readOnly={readOnly === "EDIT" || readOnly === "VIEW"}
          isDisabled={readOnly === "EDIT" || readOnly === "VIEW"}
          endAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() => alert("Hi")}
            >
              <FaSearch />
            </InputAdornment>
          }
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <F_Checkbox
            minWidth="95%"
            name="isMlc"
            label="MLC"
            control={control}
            errors={errors}
            rules={{}}
          />
          <MyTootlip
            title={`MLC stands for Medico-Legal Certificate. It is a medical record that is required by law in cases of injury or ailment that may have legal implications. Some examples are \n
               - Injuries due to battery\n
               - Injuries due to accidents, such as industrial or vehicular accidents\n
               - Injuries due to firearms\n
               - Suspected or evident suicides or homicides\n
               - Suspected or evident poisoning or intoxication`}
          >
            <IconWrapper defaultColor icon={<FaCircleInfo />} />
          </MyTootlip>
        </Box>
      </GlassBG>
    </>
  );
};

export default Primary;
