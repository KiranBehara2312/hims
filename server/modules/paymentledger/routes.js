const express = require("express");
const PaymentLedger = require("../../models/PaymentLedger");
const paymentLedgerRoutes = express.Router();

paymentLedgerRoutes.post("/history", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const { serviceLocation, searchString } = req.body;
  const query =
    serviceLocation === "All"
      ? {} // If "All", return all documents
      : { serviceLocation: serviceLocation };

  const obj = {
    $and: [query],
  };
  if (searchString !== "" && serviceLocation !== "All") {
    obj["$and"].push({
      $or: [
        { UHID: searchString },
        { patientNo: searchString },
        { BillNo: searchString },
      ],
    });
  } else {
    if (searchString !== "") {
      obj["$or"] = [{ UHID: searchString }, { billNo: searchString }];
    }
  }
  const skip = (page - 1) * limit;
  try {
    let totalCount = await PaymentLedger.countDocuments();
    const totalLedgers = await PaymentLedger.find(obj, {
      _id: false,
      __v: false,
      billNoCounter: false,
    })
      .skip(skip)
      .limit(limit);

    // if (serviceLocation !== "All") {
    //   totalCount = totalLedgers?.length ?? 0;
    // }
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
