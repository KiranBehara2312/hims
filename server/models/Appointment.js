const mongoose = require("mongoose");



const appointmentsSchema = new mongoose.Schema(
  {
    apptCode: {
      type: String,
      uppercase: true,
      unique: true,
      trim: true,
    },
    UHID: {
      type: String,
    },
    patientNo: {
      type: String,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    slotNo: {
      type: String,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    salutation: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    visitFor: {
      type: String,
      required: true,
    },
    additionalNotes: {
      type: String,
    },
    doctorDesignation: {
      type: String,
      required: true,
    },
    doctorDepartment: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    calSlotCode: {
      type: String,
      required: true,
    },
    apptCounter: {
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

appointmentsSchema.pre("save", async function (next) {
  const slot = this;

  if (!slot.apptCode) {
    try {
      const result = await mongoose.model("Appointments").findOneAndUpdate(
        {},
        { $inc: { apptCounter: 1 } },
        {
          new: true,
          upsert: true,
        }
      );
      let latestApptCode = result ? result.apptCounter : 1;
      slot.apptCode = `APPT${latestApptCode.toString().padStart(10, "0")}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});
const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = Appointments;
