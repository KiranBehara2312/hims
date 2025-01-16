const mongoose = require("mongoose");

const ApptVisitHistorySchema = new mongoose.Schema({
  apptCode: {
    type: String,
    required: true,
  },
  UHID: {
    type: String,
  },
  patientNo: {
    type: String,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  visitFor: {
    type: String,
    required: true,
  },
});
const ApptVisitHistory = mongoose.model(
  "ApptVisitHistory",
  ApptVisitHistorySchema
);

module.exports = ApptVisitHistory;
