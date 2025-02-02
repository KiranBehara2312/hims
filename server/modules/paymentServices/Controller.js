const { NEVER_CHANGING_VALS } = require("../../constants");
const asyncHandler = require("../../middlewares/AsyncHandler");
const { getAllDoctorsFromDB } = require("../doctor/Service");
const {
  getUHIDFee,
  getDrConsultFee,
  getPaymentServiceByIdOrName,
  insertNewPaymentService,
  getAllServicesForRegn,
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
// /registrationServices.action?transactionType=0&sponsorCode=SPN0000213&doctorCode=DOC000115&doctor=Dr.%20ANKIT%20YADAV&paymentType=CASH&cardRenewal=true&doctorType=&registrationType=6&ladCode=LAD000003&ladName=IP&mlcService=true&patientCatName=GENERAL&refPatient=&refHosPatient=&excemptionReqNo=&ajaxURLCall=true&patientCode=&uhid=ADH00107802&crNo=ADH00107802&patTypeCode=PATTY001&welReg=0&selSearchIdType=1&addDialysisFlag=true&apptConfirm=false

const registrationServicesNew = asyncHandler(async (req, res) => {
  const {
    uhid,
    doctor,
    patientCategory,
    sponsorGroup,
    sponsor,
    patientType,
    serviceLocationId = "PSERL0001",
  } = req.body;
  let uhidCharges = null;
  let doctorConsultCharges = null;
  let allServicesForRegn = null;



  allServicesForRegn = await getAllServicesForRegn(
    serviceLocationId,
    patientType
  );

  if (!uhid) {
    uhidCharges = await getUHIDFee();
  }

  if (doctor) {
    const docResult = await getAllDoctorsFromDB(1, 10, { doctorId: doctor });
    const dbDoctor = docResult?.data?.[0] ?? null;
    if (dbDoctor === null) {
      return res.status(400).json({ message: "Doctor not found" });
    }
    doctorConsultCharges = await getDrConsultFee();
    doctorConsultCharges.serviceAmount = dbDoctor?.fee ?? 0;
  }
  res.status(200).json({
    message: `Payment services fetched successfully`,
    data: allServicesForRegn,
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

const addPaymentService = asyncHandler(async (req, res) => {
  const paymentServices = await insertNewPaymentService(req.body);
  res.status(200).json({
    message: `Payment service inserted successfully successfully`,
    paymentServices,
  });
});

module.exports = {
  registrationServices,
  searchPaymentService,
  addPaymentService,
  registrationServicesNew,
};
