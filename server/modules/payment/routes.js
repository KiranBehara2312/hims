const express = require("express");
const PaymentServices = require("../../models/services/PaymentService");
const DoctorController = require("./Controller");
const Doctor = require("../../models/Doctor");
const paymentRoutes = express.Router();

paymentRoutes.post("/paymentServices", async (req, res) => {
  const searchString = req.body.searchString ?? "";
  try {
    let filterObj = { isActive: true };
    if (searchString && searchString !== "") {
      filterObj["$or"] = [
        { serviceCode: { $regex: `^${searchString}`, $options: "i" } },
        { serviceName: { $regex: `^${searchString}`, $options: "i" } },
      ];
    }
    const paymentServicesList = await PaymentServices.find(filterObj, {
      _id: false,
      isActive: false,
      __v: false,
    });
    res.json({
      data: paymentServicesList,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Payment Services",
      error: err.message || err,
    });
  }
});

// the below function is used to get the charges for the service opted based on various parameters
paymentRoutes.post("/registrationCharges", async (req, res) => {
  const { serviceLocation, doctor, isFreeFollowup } = req.body;
  try {
    const doctorInfo = await Doctor.find({
      isActive: true,
      userName: doctor,
    });
    let allCharges = await PaymentServices.find(
      { isActive: true, serviceLocation: serviceLocation },
      {
        _id: false,
        __v: false,
        isActive: false,
        createdAt: false,
        updatedAt: false,
        paymentServiceCounter: false,
      }
    );
    if (doctorInfo && doctorInfo?.[0]?.fee) {
      allCharges = allCharges?.map(({ _doc }) => {
        return {
          ..._doc,
          serviceAmount:
            _doc.serviceCode === "PSER0003"
              ? +doctorInfo?.[0]?.fee
              : _doc.serviceAmount,
        };
      });
    }
    res.json({
      totalServices: allCharges?.length ?? 0,
      data: allCharges ?? [],
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Payment services",
      error: err.message || err,
    });
  }
});

paymentRoutes.post("/addPaymentService", async (req, res) => {
  try {
    const lastService = await PaymentServices.findOne().sort({ _id: -1 });

    let lastServiceCode = 1;
    if (lastService && lastService.serviceCode) {
      const lastCodeNum = parseInt(
        lastService.serviceCode.replace("PSER", ""),
        10
      );
      lastServiceCode = lastCodeNum + 1;
    }
    const newServiceCode = `PSER${String(lastServiceCode).padStart(4, "0")}`;
    const newPaymentService = new PaymentServices({
      serviceCode: newServiceCode,
      ...req.body,
    });

    await newPaymentService.save();

    res.status(201).json({
      message: "New Payment Service added successfully",
      serviceCode: newServiceCode,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while saving Payment Service",
      error: err.message || err,
    });
  }
});

module.exports = paymentRoutes;
