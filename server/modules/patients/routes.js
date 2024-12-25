const express = require("express");
const PatientRegn = require("../../models/PatientRegn");
const PatientVitals = require("../../models/PatientVitals");
const pdfkit = require("pdfkit");
const patientRoutes = express.Router();

patientRoutes.post("/all", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await PatientRegn.countDocuments();
    const patients = await PatientRegn.find(
      { isActive: true },
      { _id: false, __v: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: patients,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Patients",
      error: err.message || err,
    });
  }
});

patientRoutes.post("/addVitals", async (req, res) => {
  try {
    const newVital = new PatientVitals(req.body);
    await newVital.save();
    res.status(201).json({
      message: "Vitals added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while saving Patient Vitals",
      error: err.message || err,
    });
  }
});

patientRoutes.post("/vitalHistory", async (req, res) => {
  const UHID = req.body.UHID;
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await PatientVitals.countDocuments();
    const totalVitals = await PatientVitals.find(
      { isActive: true, UHID: UHID },
      {
        _id: false,
        __v: false,
        isActive: false,
        createdAt: false,
        updatedAt: false,
        UHID: false,
        patientNo: false,
      }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: totalVitals,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Vital History",
      error: err.message || err,
    });
  }
});

patientRoutes.get("/pdf", (req, res) => {
  const doc = new pdfkit();

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=generated-document.pdf"
  );

  // Pipe the PDF to the response object
  doc.pipe(res);

  // Add content to the PDF (you can modify as per your needs)
  doc.fontSize(12).text("This is a dynamically generated PDF.", 100, 100);

  // Finalize the PDF and end the response
  doc.end();
});

module.exports = patientRoutes;
