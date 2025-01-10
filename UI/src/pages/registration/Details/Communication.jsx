import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import {
  BLOOD_GROUPS,
  GENDER_LIST,
  MARITAL_STATUS,
  SALUTATIONS,
} from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import { postData } from "../../../helpers/http";

const Communication = ({ control, errors, readOnly = false }) => {
  const [states, setStates] = useState([]);
  useEffect(() => {
    fetchStates();
  }, []);
  const fetchStates = async () => {
    const response = await postData("/masters/states", {
      page: 1,
      limit: 100,
    });
    setStates(response?.data ?? []);
  };
  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Communication Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Input
          name="contactNumber"
          control={control}
          errors={errors}
          rules={{
            required: "Contact No is required",
            pattern: {
              value: REGEX_PATTERNS.mobileNumber,
              message: "Invalid Contact number",
            },
          }}
          label="Contact No"
          readOnly={readOnly}
        />

        <F_Input
          name="alternateMobileNo"
          control={control}
          errors={errors}
          rules={{
            pattern: {
              value: REGEX_PATTERNS.mobileNumber,
              message: "Invalid mobile number",
            },
          }}
          label="Alt Contact No"
          readOnly={readOnly}
        />

        <F_Input
          name="addressLineOne"
          control={control}
          errors={errors}
          rules={{ required: "Address line is required" }}
          label="Address Line 1"
          isRequired={true}
          readOnly={readOnly}
        />

        <F_Input
          name="addressLineTwo"
          control={control}
          errors={errors}
          rules={{}}
          label="Address Line 2"
          readOnly={readOnly}
        />

        <F_Select
          control={control}
          name={"state"}
          label={"State"}
          list={states}
          rules={{ required: "State is required" }}
          isRequired={true}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Input
          name="pinCode"
          control={control}
          errors={errors}
          rules={{
            pattern: {
              value: REGEX_PATTERNS.postalCode,
              message: "Invalid Pin code",
            },
          }}
          label="Pin Code"
          readOnly={readOnly}
        />
      </GlassBG>
    </>
  );
};

export default Communication;
