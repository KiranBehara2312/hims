const mongoose = require("mongoose");

const paymentLedgerSchema = new mongoose.Schema(
  {
    billNo: {
      type: String,
      uppercase: true,
      unique: true,
      minlength: [12, "User name cannot be shorter than 12 characters"],
      maxlength: [12, "User name cannot be longer than 12 characters"],
    },
    UHID: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceAmount: {
      type: Number,
      required: true,
    },
    payeeName: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: String,
      required: true,
    },
    serviceLocation: {
      type: String,
      required: true,
    },
    serviceCode: {
      type: String,
      required: true,
    },
    billNoCounter: {
      type: Number,
      default: 1,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

paymentLedgerSchema.pre("save", async function (next) {
  const payment = this;

  // Only generate billNo if it's not already set (assuming it's a new document)
  if (!payment.billNo) {
    try {
      // Generate the new bill number in an atomic operation
      const result = await mongoose.model("PaymentLedger").findOneAndUpdate(
        {}, // Match any document (or use a more specific query if needed)
        { $inc: { billNoCounter: 1 } }, // Increment the billNoCounter field atomically
        {
          new: true, // Return the updated document
          upsert: true, // Create the document if it doesn't exist
        }
      );

      // Get the updated value of billNoCounter
      let lastBillNo = result ? result.billNoCounter : 1;

      // Format the new billNo with leading zeros
      payment.billNo = `BILL${lastBillNo.toString().padStart(8, "0")}`;

      // Continue saving the document
      next();
    } catch (err) {
      next(err); // If an error occurs, pass it to the next middleware
    }
  } else {
    next(); // If billNo is already set, continue with the save
  }
});
const PaymentLedger = mongoose.model("PaymentLedger", paymentLedgerSchema);

module.exports = PaymentLedger;
