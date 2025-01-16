const AppointmentSlots = require("../../models/AppointmentSlot");

const AppointmentController = {
  generateTimeSlots: (
    startDate,
    endDate,
    slotDuration,
    gapDuration,
    doctor,
    date,
    doctorName,
    doctorDepartment,
    doctorDesignation
  ) => {
    let slots = [];
    let currentTime = new Date(startDate);
    currentTime.setSeconds(0, 0); // Ensure seconds and milliseconds are zero for consistency

    const endTimeDate = new Date(endDate);
    endTimeDate.setSeconds(0, 0); // Ensure seconds and milliseconds are zero for consistency
    let slotCounter = 0;
    // Start generating slots while current time is before or equal to end time
    while (currentTime < endTimeDate) {
      // Calculate the end time for the current slot
      let slotEndTime = new Date(currentTime);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + slotDuration);
      // Ensure the slot end time does not exceed the endTimeDate
      if (slotEndTime > endTimeDate) {
        break;
      }
      // Format start and end times
      let formattedStartTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      let formattedEndTime = slotEndTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      slots.push({
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        slotNo: `S-${slotCounter}`,
        bookingStatus: "Free",
        color: "#078307",
        date,
        doctor,
        doctorName,
        doctorDepartment,
        doctorDesignation,
      });
      // Move currentTime forward by the slot duration + gap
      currentTime.setMinutes(
        currentTime.getMinutes() + slotDuration + gapDuration
      );
      slotCounter = slotCounter + 1;
    }

    return slots;
  },
  insertCalendarSlots: async (slots) => {
    try {
      const lastSlot = await AppointmentSlots.findOne().sort({ _id: -1 });

      let lastCalSlotCode = 1;
      if (lastSlot && lastSlot.calSlotCode) {
        lastCalSlotCode = +lastSlot.calSlotCode.split("LS")[1] + 1;
      }
      const appointSlotsDocs = await Promise.all(
        slots.map((x, index) => {
          const newCalSlotCode = `CALS${(lastCalSlotCode + index)
            .toString()
            .padStart(10, "0")}`;
          const newSlot = {
            ...x,
            calSlotCode: newCalSlotCode,
          };

          return newSlot;
        })
      );
      await AppointmentSlots.insertMany(appointSlotsDocs);
      console.log("All Appointment Slots inserted successfully!");
    } catch (error) {
      console.error("Error inserting Appointment Slots:", error);
    }
  },
};

module.exports = AppointmentController;
