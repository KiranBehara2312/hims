const express = require("express");
const PatRegnController = require("./Controller");
const PatientRegn = require("../../models/PatientRegn");
const PaymentLedger = require("../../models/PaymentLedger");
const registrationRoutes = express.Router();

registrationRoutes.post("/create", async (req, res) => {
  try {
    const newUHID = await PatRegnController.generateUHID();
    const newPatinetNo = await PatRegnController.generatePatientNo();
    if (!newUHID || !newPatinetNo) {
      res.status(400).json({
        message: "Error while saving Patient",
        error: "Error while generating New UHID or New Patient No",
      });
    }
    const newPatient = new PatientRegn({
      ...req.body,
      UHID: newUHID,
      patientNo: newPatinetNo,
    });
    await newPatient.save();
    const { payments } = req.body;
    await PatRegnController.insertPayments(payments, newUHID);
    res.status(201).json({
      message: "Patient registered successfully",
      UHID: newUHID,
      patientNo: newPatinetNo,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while saving Patient",
      error: err.message || err,
    });
  }
});

registrationRoutes.post("/update/:uhid", async (req, res) => {
  try {
    const { uhid } = req.params;
    const result = await PatientRegn.updateOne(
      { UHID: uhid },
      { $set: { ...req.body } },
      { runValidators: true }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "Patient not found or no changes made",
      });
    }

    res.status(200).json({
      message: "Patient updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while updating Patient",
      error: err.message || err,
    });
  }
});

module.exports = registrationRoutes;
