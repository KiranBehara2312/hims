const mongoose = require("mongoose");

const paymentServiceSchema = new mongoose.Schema(
  {
    serviceCode: {
      type: String,
      uppercase: true,
      unique: true,
      trim: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceAmount: {
      type: Number,
      required: true,
    },
    isDiscountApplicable: {
      type: Boolean,
      required: true,
      default: false,
    },
    maximumDiscountInPercent: {
      type: Number,
      default: 0,
    },
    serviceLocation: {
      type: String,
      required: true,
    },
    paymentServiceCounter: {
      type: Number,
      default: 1,
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
  { timestamps: true, autoCreate: false, autoIndex: false }
);
const PaymentServices = mongoose.model("PaymentServices", paymentServiceSchema);

module.exports = PaymentServices;
