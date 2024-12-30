const mongoose = require("mongoose");

const appointmentSlotSchema = new mongoose.Schema(
  {
    calSlotCode: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      trim: true,
    },
    slotNo: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorDesignation: {
      type: String,
      required: true,
    },
    doctorDepartment: {
      type: String,
      required: true,
    },
    doctorDepartment: {
      type: String,
      required: true,
    },
    calSlotCodeCounter: {
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

appointmentSlotSchema.pre("save", async function (next) {
  const slot = this;

  if (!slot.calSlotCode) {
    try {
      const result = await mongoose.model("AppointmentSlots").findOneAndUpdate(
        {},
        { $inc: { calSlotCodeCounter: 1 } },
        {
          new: true,
          upsert: true,
        }
      );
      let latestCalSlotNumber = result ? result.calSlotCodeCounter : 1;
      slot.calSlotCode = `CALS${latestCalSlotNumber
        .toString()
        .padStart(10, "0")}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});
const AppointmentSlots = mongoose.model(
  "AppointmentSlots",
  appointmentSlotSchema
);

module.exports = AppointmentSlots;
