import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import { postData } from "../../../helpers/http";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import DoctorInformationCard from "../../../components/shared/DoctorInformationCard";
import { useSelector } from "react-redux";
import { c_doctorDepartments } from "../../../redux/slices/apiCacheSlice";

const Doctor = ({
  control,
  errors,
  formValues,
  setValue,
  getValues,
  readOnly = false,
}) => {
  const [doctors, setDoctors] = useState([]);
  const cachedDoctorDepartments = useSelector(c_doctorDepartments);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    if (!formValues.doctorDepartment) {
      setDoctors(() => []);
      setSelectedDoc(() => null);
    }
  }, [formValues.doctorDepartment]);

  const fetchDoctors = async (filters) => {
    const response = await postData("/doctor/all", {
      filters: filters ?? null,
      page: 1,
      limit: 200,
    });
    setDoctors(
      response?.data?.map((x) => {
        return {
          ...x,
          dropdownValue: x.userId,
          dropdownLabel: x.fullName,
        };
      }) ?? []
    );
  };
  const docSelectionHandler = (doc) => {
    const selDoc = doctors.find((x) => x.userId === doc) ?? null;
    setSelectedDoc(selDoc);
    setValue("doctorConsultationFee", selDoc?.fee ?? 0);
  };

  const docDeptChangeHandler = (dept) => {
    fetchDoctors({ department: dept });
    setDoctors(() => []);
    setValue("doctorConsultationFee", 0);
    setSelectedDoc(() => null);
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "230px", height: "auto" }}>
        <MyHeading
          alignCenter
          text="Doctor"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Autocomplete
          control={control}
          name={"doctorDepartment"}
          label={"Department"}
          list={cachedDoctorDepartments}
          rules={{}}
          errors={errors}
          onSelect={docDeptChangeHandler}
          readOnly={readOnly}
        />
        <F_Autocomplete
          control={control}
          name={"doctor"}
          label={"Doctor"}
          list={doctors}
          rules={{}}
          errors={errors}
          onSelect={docSelectionHandler}
          readOnly={readOnly}
        />

        {selectedDoc !== null && (
          <DoctorInformationCard selectedDoctor={selectedDoc} />
        )}
      </GlassBG>
    </>
  );
};

export default Doctor;
