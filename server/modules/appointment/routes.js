const express = require("express");
const appointmentRoutes = express.Router();
const AppointmentController = require("./Controller");
const Doctor = require("../../models/Doctor");
const AppointmentSlots = require("../../models/AppointmentSlot");

appointmentRoutes.post("/daySlotGeneration", async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      slotDuration,
      timeGap,
      doctor,
      date,
      doctorName,
      doctorDepartment,
      doctorDesignation,
    } = req.body;
    const slots = AppointmentController.generateTimeSlots(
      startDate,
      endDate,
      +slotDuration,
      +timeGap,
      doctor,
      date,
      doctorName,
      doctorDepartment,
      doctorDesignation
    );
    await AppointmentController.insertCalendarSlots(slots);
    res.status(200).json({
      message: "Doctor Slots generated successfully",
      data: slots,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error Generating slots",
      error: err.message || err,
    });
  }
});

appointmentRoutes.post("/doctorSlots", async (req, res) => {
  try {
    const { date, doctor } = req.body;
    const doctorSlots = await AppointmentSlots.find(
      { date, doctor },
      { _id: false, __v: false }
    );
    if (doctorSlots?.length === 0) {
      return res.status(200).json({
        message: "Slots not available for Doctor on " + date,
        isSlotsAvailable : false,
      });
    }
    res.json({
      data: doctorSlots,
      message : "Fetched slots against doctor",
      isSlotsAvailable : true
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching doctors slots",
      error: err.message || err,
    });
  }
});

module.exports = appointmentRoutes;
