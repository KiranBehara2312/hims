const express = require("express");
const PatRegnController = require("../registration/Controller");
const serviceBillingRoutes = express.Router();

serviceBillingRoutes.post("/new", async (req, res) => {
  try {
    const { UHID, payments } = req.body;
    await PatRegnController.insertPayments(payments, UHID);

    res.status(200).json({
      message: "Added services against patient",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while Added services against patient",
      error: err.message || err,
    });
  }
});

module.exports = serviceBillingRoutes;
