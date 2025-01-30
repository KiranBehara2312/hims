import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Input from "../../../components/custom/form/F_Input";
import { Box } from "@mui/material";
import F_Checkbox from "../../../components/custom/form/F_Checkbox";
import IconWrapper from "../../../components/custom/IconWrapper";
import { FaCircleInfo } from "react-icons/fa6";
import MyTootlip from "../../../components/shared/MyTootlip";
import { postData } from "../../../helpers/http";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import { NEVER_CHANGING_VALS } from "../../../constants/localDB/neverChanging";
import { useSelector } from "react-redux";
import { c_knownUsBy, c_sponsorGroups } from "../../../redux/slices/apiCacheSlice";

const Primary = ({ control, errors, readOnly = "", formValues }) => {
  const cachedSponsorGroups = useSelector(c_sponsorGroups);
  const cachedKnownUsBy = useSelector(c_knownUsBy);
  const [dropdownData, setDropdownData] = useState({
    patientType: [],
    visitType: [],
    patientCategory: [],
    registrationType: [],
    sponsors: [],
  });
  useEffect(() => {
    loadInitData();
  }, []);

  const loadInitData = async () => {
    const [res1, res2, res3] = await Promise.all([
      postData("/masters/data", {
        type: "patientTypes",
        limit: "Infinity",
      }),
      postData("/masters/data", {
        type: "patientCategory",
        limit: "Infinity",
      }),
      postData("/masters/data", {
        type: "visitTypes",
        limit: "Infinity",
      }),
    ]);
    setDropdownData((prevv) => {
      return {
        ...prevv,
        patientType: res1?.data ?? [],
        patientCategory: res2?.data ?? [],
        visitType: res3?.data ?? [],
      };
    });
  };

  const sponsorGrpChangeHandler = async (selectedSponsorGrp) => {
    if (selectedSponsorGrp) {
      const res = await postData("/sponsor/sponsorBySponsorGroup", {
        sponsorGroupId: selectedSponsorGrp,
      });
      setDropdownData((prev) => {
        return {
          ...prev,
          sponsors: res?.data ?? [],
        };
      });
    }
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Primary"
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

        <F_Autocomplete
          control={control}
          name={"patientType"}
          label={"Patient Type"}
          list={dropdownData.patientType}
          rules={{ required: "Patient Type is required" }}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />

        <F_Autocomplete
          control={control}
          name={"patientCategory"}
          label={"Patient Category"}
          list={
            formValues?.patientType !== NEVER_CHANGING_VALS.PAT_TYPE_OP
              ? dropdownData.patientCategory
              : dropdownData.patientCategory.filter(
                  (item) => item.id !== NEVER_CHANGING_VALS.PAT_CAT_PAYER
                )
          }
          rules={{ required: "Patient Type is required" }}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />

        {/* only if IN Patient or emergency */}
        {(formValues.patientType === NEVER_CHANGING_VALS.PAT_TYPE_IP ||
          formValues.patientType === NEVER_CHANGING_VALS.PAT_TYPE_EMER) && (
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
        )}

        {formValues?.patientCategory === NEVER_CHANGING_VALS.PAT_CAT_PAYER && (
          <>
            <F_Autocomplete
              control={control}
              name={"sponsorGroup"}
              label={"Sponsor Group"}
              list={cachedSponsorGroups}
              rules={{ required: "Sponsor Group is required" }}
              isRequired={true}
              errors={errors}
              onSelect={sponsorGrpChangeHandler}
              isDisabled={readOnly === "VIEW"}
              readOnly={readOnly === "VIEW"}
            />
            <F_Autocomplete
              control={control}
              name={"sponsor"}
              label={"Sponsor"}
              list={dropdownData.sponsors}
              rules={{ required: "Sponsor is required" }}
              isRequired={true}
              errors={errors}
              isDisabled={readOnly === "VIEW"}
              readOnly={readOnly === "VIEW"}
            />
          </>
        )}

        <F_Autocomplete
          control={control}
          name={"visitType"}
          label={"Visit Type"}
          list={dropdownData.visitType}
          rules={{ required: "Visit Type is required" }}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />

        <F_Autocomplete
          control={control}
          name={"knownusBy"}
          label={"Known us by"}
          list={cachedKnownUsBy}
          rules={{ required: "KnownUs By is required" }}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "VIEW"}
          readOnly={readOnly === "VIEW"}
        />

        {/* <F_Input
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
        /> */}
      </GlassBG>
    </>
  );
};

export default Primary;
