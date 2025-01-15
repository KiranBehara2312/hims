const express = require("express");
const PaymentLedger = require("../../models/PaymentLedger");
const paymentLedgerRoutes = express.Router();

paymentLedgerRoutes.post("/history", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  let filter = {};
  if (req?.body?.serviceLocation !== "All") {
    filter["serviceLocation"] = req.body.serviceLocation;
  }
  const skip = (page - 1) * limit;
  try {
    let totalCount = await PaymentLedger.countDocuments();
    const totalLedgers = await PaymentLedger.find(filter, {
      _id: false,
      __v: false,
      billNoCounter: false,
    })
      .skip(skip)
      .limit(limit);
    if (req.body.serviceLocation !== "All") {
      totalCount = totalLedgers?.length ?? 0;
    }
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: totalLedgers,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Payment Ledgers",
      error: err.message || err,
    });
  }
});

module.exports = paymentLedgerRoutes;
