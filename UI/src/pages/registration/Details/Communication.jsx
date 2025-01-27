import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Input from "../../../components/custom/form/F_Input";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import { postData } from "../../../helpers/http";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import { InputAdornment } from "@mui/material";
import { FaAngleDoubleDown } from "react-icons/fa";
import MyTooltip from "../../../components/shared/MyTootlip";

const Communication = ({ control, errors, readOnly = false, formValues, setValue }) => {
  const [dropdownData, setDropdownData] = useState({
    country: [],
    states: [],
  });

  useEffect(() => {
    loadMasterItems();
  }, []);

  const loadMasterItems = async () => {
    const [res1, res2, res3] = await Promise.all([
      postData("/masters/data", {
        type: "countries",
        limit: "Infinity",
      }),
      postData("/masters/data", {
        type: "allStates",
        limit: "Infinity",
      }),
    ]);
    setDropdownData((prev) => {
      return {
        ...prev,
        country: res1?.data?.filter((x) => x.isDefault === 1) ?? [],
        states: res2?.data ?? [],
      };
    });
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Communication"
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
          name="whatsAppNo"
          control={control}
          errors={errors}
          rules={{
            pattern: {
              value: REGEX_PATTERNS.mobileNumber,
              message: "Invalid Contact number",
            },
          }}
          label="WhatsApp No"
          endAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                setValue("whatsAppNo", `${formValues?.contactNumber}`)
              }
            >
              <MyTooltip title="Same as Contact Number">
                <FaAngleDoubleDown />
              </MyTooltip>
            </InputAdornment>
          }
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

        <F_Autocomplete
          control={control}
          name={"state"}
          label={"State"}
          list={dropdownData.states}
          rules={{ required: "State is required" }}
          isRequired={true}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"country"}
          label={"Country"}
          list={dropdownData.country}
          rules={{ required: "Country is required" }}
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
