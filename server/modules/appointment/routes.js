const express = require("express");
const appointmentRoutes = express.Router();
const AppointmentController = require("./Controller");
const Doctor = require("../../models/Doctor");
const AppointmentSlots = require("../../models/AppointmentSlot");
const Appointments = require("../../models/Appointment");
const ApptVisitHistory = require("../../models/ApptVisitHisory");

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

appointmentRoutes.post("/allAppointments", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Appointments.countDocuments();
    const allAppointments = await Appointments.find(
      {},
      { _id: false, __v: false, apptCounter: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: allAppointments,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching all appointments",
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

appointmentRoutes.post("/book", async (req, res) => {
  try {
    const {
      calSlotCode,
      slotNextStatus,
      slotNextStatusColor,
      UHID,
      patientNo,
      appointmentDate,
      doctorName,
      visitFor,
    } = req.body;

    const loggedInuser = req.loggedInuser;
    const appointment = new Appointments({
      ...req.body,
      createdBy: loggedInuser?.userName,
    });
    //saving appointment
    const { apptCode } = await appointment.save();

    // updating the slot status
    const result = await AppointmentSlots.updateOne(
      { calSlotCode: calSlotCode },
      {
        $set: {
          bookingStatus: slotNextStatus,
          color: slotNextStatusColor,
          apptCode,
        },
      },
      { runValidators: true }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: `Slot(${calSlotCode}) not found or no changes made`,
      });
    }

    if (UHID !== null && UHID !== "" && UHID !== undefined) {
      const newVisitHistoryEntry = new ApptVisitHistory({
        apptCode: apptCode,
        appointmentDate: appointmentDate,
        doctorName: doctorName,
        visitFor: visitFor,
        UHID: UHID,
        patientNo: patientNo,
      });
      await newVisitHistoryEntry.save();
    }

    res.status(201).json({
      message: "Appointment saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while saving Appointment",
      error: err.message || err,
    });
  }
});

appointmentRoutes.post("/patientVisitHistory", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const { UHID } = req.body;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await ApptVisitHistory.countDocuments();
    const visitHistories = await ApptVisitHistory.find(
      {
        UHID: UHID,
      },
      { _id: false, __v: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: visitHistories,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching visit history against patient",
      error: err.message || err,
    });
  }
});

module.exports = appointmentRoutes;
