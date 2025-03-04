import React from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import {
  BLOOD_GROUPS,
  DISABILITY_TYPES,
  GENDER_LIST,
  MARITAL_STATUS,
  SALUTATIONS,
} from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import F_DatePicker from "../../../components/custom/form/F_DatePicker";

const Personal = ({ control, errors, readOnly = false }) => {
  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Personal Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Select
          control={control}
          name={"salutation"}
          label={"Salutation"}
          list={SALUTATIONS}
          rules={{ required: "Salutation is required" }}
          isRequired={true}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Input
          name="firstName"
          control={control}
          errors={errors}
          rules={{ required: "First Name is required" }}
          label="First Name"
          isRequired={true}
          readOnly={readOnly}
        />
        <F_Input
          name="middleName"
          control={control}
          errors={errors}
          rules={{ required: "Middle Name is required" }}
          label="Middle Name"
          isRequired={true}
          readOnly={readOnly}
        />
        <F_Input
          name="lastName"
          control={control}
          errors={errors}
          rules={{ required: "Last Name is required" }}
          label="Last Name"
          isRequired={true}
          readOnly={readOnly}
        />
        <F_DatePicker
          name="dateOfBirth"
          type="date"
          control={control}
          errors={errors}
          rules={{ required: "Date Of birth is required" }}
          label="Date Of Birth"
          isRequired={true}
          readOnly={readOnly}
          maxDate={new Date().toISOString().split("T")[0]}
        />

        <F_Select
          control={control}
          name={"gender"}
          label={"Gender"}
          list={GENDER_LIST}
          rules={{ required: "Gender is required" }}
          isRequired={true}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Select
          control={control}
          name={"bloodGroup"}
          label={"Blood Group"}
          list={BLOOD_GROUPS}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Select
          control={control}
          name={"maritalStatus"}
          label={"Marital Status"}
          list={MARITAL_STATUS}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Select
          control={control}
          name={"disableType"}
          label={"Disablity Type"}
          list={DISABILITY_TYPES}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />
      </GlassBG>
    </>
  );
};

export default Personal;
