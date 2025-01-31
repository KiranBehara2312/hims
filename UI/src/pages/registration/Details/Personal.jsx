import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Input from "../../../components/custom/form/F_Input";
import F_DatePicker from "../../../components/custom/form/F_DatePicker";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import { useSelector } from "react-redux";
import {
  c_gender,
  c_idTypes,
  c_maritalStatus,
} from "../../../redux/slices/apiCacheSlice";
import { postData } from "../../../helpers/http";

const Personal = ({ control, errors, readOnly = false }) => {
  const cachedGender = useSelector(c_gender);
  const cachedMaritalStatus = useSelector(c_maritalStatus);
  const cachedIdTypes = useSelector(c_idTypes);
  const [dropdownData, setDropdownData] = useState({
    salutation: [],
    gender: cachedGender,
    bloodGroups: [],
    maritalStatus: cachedMaritalStatus,
    disabilityType: [],
    idTypes: cachedIdTypes,
  });

  useEffect(() => {
    loadMasterItems();
  }, []);

  const loadMasterItems = async () => {
    const [res1, res2, res3] = await Promise.all([
      postData("/masters/data", {
        type: "disabilityStatus",
        limit: "Infinity",
      }),
      postData("/masters/data", {
        type: "salutation",
        limit: "Infinity",
      }),
      postData("/masters/data", {
        type: "bloodGroup",
        limit: "Infinity",
      }),
    ]);
    setDropdownData((prev) => {
      return {
        ...prev,
        disabilityType: res1?.data ?? [],
        salutation: res2?.data ?? [],
        bloodGroups: res3?.data ?? [],
        gender: cachedGender,
        maritalStatus: cachedMaritalStatus,
      };
    });
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Personal"
          variant="rem095"
          sx={{ mt: "-10px" }}
        />

        <F_Autocomplete
          control={control}
          name={"salutation"}
          label={"Salutation"}
          list={dropdownData.salutation}
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

        <F_Autocomplete
          control={control}
          name={"gender"}
          label={"Gender"}
          list={dropdownData.gender}
          rules={{ required: "Gender is required" }}
          isRequired={true}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"bloodGroup"}
          label={"Blood Group"}
          list={dropdownData.bloodGroups}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"maritalStatus"}
          label={"Marital Status"}
          list={dropdownData.maritalStatus}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"disableType"}
          label={"Disablity Type"}
          list={dropdownData.disabilityType}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"idType"}
          label={"Identity Type"}
          list={dropdownData.idTypes}
          rules={{ required: "Identity Type is required" }}
          errors={errors}
          isRequired={true}
          readOnly={readOnly}
        />

        <F_Input
          name="idNo"
          control={control}
          errors={errors}
          rules={{ required: "ID Number is required" }}
          label="Identity Number"
          isRequired={true}
          readOnly={readOnly}
        />
      </GlassBG>
    </>
  );
};

export default Personal;
