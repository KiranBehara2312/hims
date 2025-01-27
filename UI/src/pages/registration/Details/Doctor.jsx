import React, { useEffect, useState } from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import { postData } from "../../../helpers/http";
import F_Autocomplete from "../../../components/custom/form/F_AutoComplete";
import DoctorInformationCard from "../../../components/shared/DoctorInformationCard";

const Doctor = ({
  control,
  errors,
  formValues,
  setValue,
  readOnly = false,
}) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (formValues.doctor !== "") {
      docSelectionHandler(formValues.doctor);
    }
  }, [formValues]);

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
    setSelectedDoc(selDoc);
    setValue("doctorConsultationFee", selDoc?.fee ?? 0);
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
          name={"doctor"}
          label={"Doctor"}
          list={doctors}
          rules={{}}
          errors={errors}
          onSelect={docSelectionHandler}
          readOnly={readOnly}
        />

        {formValues?.doctor !== null && formValues?.doctor !== "" && (
          <DoctorInformationCard selectedDoctor={selectedDoc} />
        )}
      </GlassBG>
    </>
  );
};

export default Doctor;
