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

appointmentRoutes.post("/deleteElapsedSlots", async (req, res) => {
  try {
    const { doctor } = req.body;
    const currentDateTime = new Date();
    const doctorSlots = await AppointmentSlots.find({ doctor });
    if (doctorSlots?.length === 0) {
      return res.status(200).json({
        message: "No slots available for the doctor",
        isSlotsAvailable: false,
      });
    }
    const expiredSlots = doctorSlots.filter((slot) => {
      const slotDate = new Date(slot.date);
      const endTimeArr = slot.endTime.split(" ");
      let hours;
      let min = +endTimeArr[0].split(":")[1];
      if (endTimeArr[1] === "pm") {
        hours = 12 + +endTimeArr[0].split(":")[0];
      } else {
        hours = +endTimeArr[0].split(":")[0];
      }
      slotDate.setHours(hours ?? 0, min ?? 0, 0, 0);
      return slotDate < currentDateTime;
    });
    if (expiredSlots.length > 0) {
      await AppointmentSlots.deleteMany({
        _id: { $in: expiredSlots.map((slot) => slot._id) },
      });

      return res.json({
        message: `${expiredSlots.length} expired slot(s) deleted successfully`,
        deletedSlots: expiredSlots.length,
      });
    } else {
      return res.json({
        message: "No expired slots to delete",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error deleting expired slots",
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
        isSlotsAvailable: false,
      });
    }
    res.json({
      data: doctorSlots,
      message: "Fetched slots against doctor",
      isSlotsAvailable: true,
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
