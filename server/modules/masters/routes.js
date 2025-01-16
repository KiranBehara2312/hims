const express = require("express");
const States = require("../../models/States");
const Countries = require("../../models/Countries");
const User = require("../../models/User");
const PaymentService = require("../../models/services/PaymentService");
const masterRoutes = express.Router();

masterRoutes.post("/states", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await States.countDocuments();
    const states = await States.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: states,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching states",
      error: err.message || err,
    });
  }
});

masterRoutes.post("/users", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await User.countDocuments();
    const users = await User.find(
      { isActive: true },
      { _id: false, isActive: false, password: false, __v: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Users",
      error: err.message || err,
    });
  }
});

masterRoutes.post("/paymentServices", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await PaymentService.countDocuments();
    const paymentServicesList = await PaymentService.find(
      { isActive: true },
      { _id: false, isActive: false, __v: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
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

masterRoutes.post("/countries", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Countries.countDocuments();
    const countries = await Countries.find(
      { isActive: true },
      { _id: false, isActive: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: countries,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching Countries",
      error: err.message || err,
    });
  }
});

module.exports = masterRoutes;
