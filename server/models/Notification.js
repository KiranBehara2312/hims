const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notificationCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    header: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      default: "Normal",
    },
    sentOn: {
      type: String,
      required: true,
    },
    sentBy: {
      type: String,
      required: true,
    },
    sentByName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notifications = mongoose.model("Notifications", notificationSchema);

module.exports = Notifications;
