const asyncHandler = require("../../middlewares/AsyncHandler");
const { getAllDoctorsFromDB } = require("../doctor/Service");
const {
  getUHIDFee,
  getDrConsultFee,
  getPaymentServiceByIdOrName,
} = require("./Service");

const registrationServices = asyncHandler(async (req, res) => {
  const { doctorId, isFreeFollowUp } = req.body;
  const docResult = await getAllDoctorsFromDB(1, 10, { doctorId });
  const dbDoctor = docResult?.data?.[0] ?? null;
  if (dbDoctor === null) {
    return res.status(400).json({ message: "Doctor not found" });
  }
  const uhidCharges = await getUHIDFee();
  const drConsultCharges = await getDrConsultFee();
  drConsultCharges.data[0].serviceAmount = dbDoctor?.fee ?? 0;
  const finalRegnServices = [...uhidCharges?.data, ...drConsultCharges?.data];
  res.status(200).json({
    message: `Registration services fetched successfully`,
    data: finalRegnServices,
  });
});

const searchPaymentService = asyncHandler(async (req, res) => {
  const { searchString, page, limit } = req.body;
  const paymentServices = await getPaymentServiceByIdOrName(
    page,
    limit,
    searchString
  );
  res.status(200).json({
    message: `Payment services fetched successfully`,
    ...paymentServices,
  });
});

module.exports = {
  registrationServices,
  searchPaymentService,
};
