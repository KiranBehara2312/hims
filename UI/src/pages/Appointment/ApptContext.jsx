import { createContext, useEffect, useState } from "react";
import { postData } from "../../helpers/http";
import { infoAlert, successAlert, warnAlert } from "../../helpers";

const ApptContext = createContext();

const ApptContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const resetEverything = () => {
    setSelectedDate("");
    setDoctorSlots([]);
    setSelectedDoctor(null);
    setSelectedPatient(null);
  };

  const fetchDoctors = async () => {
    const response = await postData("/doctor/doctors", {
      page: 1,
      limit: 100,
    });
    let docs =
      response?.data?.map((x) => {
        return {
          ...x,
          value: x.userName,
          label: `Dr. ${x.firstName} ${x.lastName}`,
        };
      }) ?? [];
    setDoctors(docs ?? []);
  };

  const loadSlotsHandler = async (date = "") => {
    if (selectedDate === "" || selectedDoctor == null) {
      return warnAlert("Date and Doctor are required to fetch slots", {
        autoClose: 1500,
      });
    }
    const payload = {
      date: selectedDate,
      doctor: selectedDoctor?.userName,
    };
    const response = await postData("/appointment/doctorSlots", payload);
    if (response?.data?.length > 0) {
      let slots = response?.data?.map((x) => {
        return {
          ...x,
          slotOrder: x.slotNo?.split("-")[1],
        };
      });
      setDoctorSlots(slots.sort((a, b) => a.slotOrder - b.slotOrder) ?? []);
    }
    if (!response.isSlotsAvailable) {
      setDoctorSlots([]);
      infoAlert(response.message, { autoClose: 1500 });
    } else {
      successAlert(response.message, { autoClose: 1500 });
    }
  };

  return (
    <ApptContext.Provider
      value={{
        doctors,
        doctorSlots,
        setDoctorSlots,
        fetchDoctors,
        loadSlotsHandler,
        selectedDoctor,
        setSelectedDoctor,
        selectedPatient,
        setSelectedPatient,
        selectedDate,
        setSelectedDate,
        resetEverything,
      }}
    >
      {children}
    </ApptContext.Provider>
  );
};

export { ApptContextProvider, ApptContext };
