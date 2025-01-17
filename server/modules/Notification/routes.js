const express = require("express");
const Notifications = require("../../models/Notification");
const notificationRoutes = express.Router();

notificationRoutes.post("/all", async (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const totalCount = await Notifications.countDocuments();
    const notifications = await Notifications.find(
      {},
      { _id: false, __v: false }
    )
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      page,
      totalPages,
      totalCount,
      data: notifications,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error fetching notifications",
      error: err.message || err,
    });
  }
});

notificationRoutes.post("/add", async (req, res) => {
  try {
    const lastNotification = await Notifications.findOne().sort({ _id: -1 });

    let lastNotCode = 1;
    if (lastNotification && lastNotification.notificationCode) {
      const lastCodeNum = parseInt(
        lastNotification.notificationCode.replace("NOTI", ""),
        10
      );
      lastNotCode = lastCodeNum + 1;
    }
    const newNotCode = `NOTI${String(lastNotCode).padStart(4, "0")}`;
    const newNotification = new Notifications({
      notificationCode: newNotCode,
      ...req.body,
    });

    await newNotification.save();

    res.status(201).json({
      message: "New Notification send successfully",
      serviceCode: newNotCode,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error while sending Notification",
      error: err.message || err,
    });
  }
});

module.exports = notificationRoutes;
