const asyncHandler = require("../../middlewares/AsyncHandler");
const { getMasterData } = require("./Service");

const MASTER_MAPPER = {
  gender: "GET_GENDER_DATA",
  salutation: "GET_SALUTATION_DATA",
  maritalStatus: "GET_MARITAL_STATUS",
  roles: "GET_ROLES_DATA",
  bloodGroup: "GET_BLOOD_GRP_DATA",
  doctorDesignation: "GET_DOC_DESIGNATION",
  doctorDepartments: "GET_DOC_DEPTS",
  allUsers: "GET_USERS_LIST",
  countries: "GET_COUNTRY_DATA",
  apptStatus: "GET_APPT_STATUS_DATA",
  allStates: "GET_ALL_STATE_DATA",
  notificationPriority: "GBL_NOT_PRIORITY",
  doctorQualifications: "GET_DOCTOR_QUALIFICATION_DATA",
  orgShifts: "GET_ORG_SHIFTS",
  patientTypes: "GET_PATIENT_TYPES",
  patientCategory: "GET_PATIENT_CAT_LIST",
  paymentType: "GET_PAYMENT_TYPE",
  disabilityStatus: "GET_DISABILITY_STATUS",
  visitTypes: "GET_ALL_REG_VISIT_TYPES",
  paymentServiceLocations: "GET_MASTERS_ALL_PAYMENT_SER_LOC",
  paymentServices: "GET_MASTERS_ALL_PAYMENT_SER",
  sponsors: "GET_ALL_SPONSORS",
  sponsorGroups: "GET_ALL_SPONSOR_GROUPS",
  knownusBy: "GET_KNOWNUS_BY",
  kinRelation: "GET_KIN_RELATION",
  idTypes: "GET_ID_TYPES",
};

const master = asyncHandler(async (req, res) => {
  const { type, page, limit } = req.body;
  const queryFinder = MASTER_MAPPER[type];
  const result = await getMasterData(queryFinder, page, limit);
  res.status(200).json({
    message: `${req.body.type} fetched successfully`,
    ...result,
  });
});

module.exports = {
  master,
};
