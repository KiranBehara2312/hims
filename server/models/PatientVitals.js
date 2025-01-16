const mongoose = require("mongoose");

const patientVitalsSchema = new mongoose.Schema(
  {
    UHID: {
      type: String,
      required: true,
    },
    patientNo: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    pulse: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
    },
    datedOn: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const PatientVitals = mongoose.model("PatientVitals", patientVitalsSchema);

module.exports = PatientVitals;
