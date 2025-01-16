import React from "react";
import Appointment from ".";
import { ApptContextProvider } from "./ApptContext";

const ApptMainScreen = () => {
  return (
    <ApptContextProvider>
      <Appointment />
    </ApptContextProvider>
  );
};

export default ApptMainScreen;
