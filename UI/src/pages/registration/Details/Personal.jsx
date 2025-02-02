import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Input from "../../../components/custom/form/F_Input";
import F_DatePicker from "../../../components/custom/form/F_DatePicker";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import { useSelector } from "react-redux";
import {
  c_bloodGroups,
  c_gender,
  c_idTypes,
  c_maritalStatus,
  c_salutation,
} from "../../../redux/slices/apiCacheSlice";
import { postData } from "../../../helpers/http";

const Personal = ({ control, errors, readOnly = false }) => {
  const cachedGender = useSelector(c_gender);
  const cachedMaritalStatus = useSelector(c_maritalStatus);
  const cachedIdTypes = useSelector(c_idTypes);
  const cachedBloodGroup = useSelector(c_bloodGroups);
  const cachedSalutation = useSelector(c_salutation);
  const [dropdownData, setDropdownData] = useState({
    disabilityType: [],
  });

  useEffect(() => {
    loadMasterItems();
  }, []);

  const loadMasterItems = async () => {
    const [res1] = await Promise.all([
      postData("/masters/data", {
        type: "disabilityStatus",
        limit: "Infinity",
      }),
    ]);
    setDropdownData((prev) => {
      return {
        ...prev,
        disabilityType: res1?.data ?? [],
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
          list={cachedSalutation}
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
          list={cachedGender}
          rules={{ required: "Gender is required" }}
          isRequired={true}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"bloodGroup"}
          label={"Blood Group"}
          list={cachedBloodGroup}
          rules={{}}
          errors={errors}
          readOnly={readOnly}
        />

        <F_Autocomplete
          control={control}
          name={"maritalStatus"}
          label={"Marital Status"}
          list={cachedMaritalStatus}
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
          list={cachedIdTypes}
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
