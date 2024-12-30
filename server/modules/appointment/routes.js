const express = require("express");
const appointmentRoutes = express.Router();
const AppointmentController = require("./Controller");
const Doctor = require("../../models/Doctor");

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

module.exports = appointmentRoutes;
