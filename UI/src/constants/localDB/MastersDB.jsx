const GENDER_LIST = [
  {
    label: "Male",
    shortName: "M",
    value: "Male",
  },
  {
    label: "Female",
    shortName: "F",
    value: "Female",
  },
  {
    label: "Others",
    shortName: "O",
    value: "Others",
  },
];
const MARITAL_STATUS = [
  {
    label: "Single",
    value: "Single",
  },
  {
    label: "Married",
    value: "Married",
  },
  {
    label: "Widowed",
    value: "Widowed",
  },
  {
    label: "Divorced",
    value: "Divorced",
  },
];
const BLOOD_GROUPS = [
  {
    shortName: "A+",
    label: "A Positive",
    value: "A Positive",
  },
  {
    shortName: "A-",
    label: "A Negative",
    value: "A Negative",
  },
  {
    shortName: "B+",
    label: "B Positive",
    value: "B Positive",
  },
  {
    shortName: "B-",
    label: "B Negative",
    value: "B Negative",
  },
  {
    shortName: "O+",
    label: "O Positive",
    value: "O Positive",
  },
  {
    shortName: "O-",
    label: "O Negative",
    value: "O Negative",
  },
  {
    shortName: "AB+",
    label: "AB Positive",
    value: "AB Positive",
  },
  {
    shortName: "AB-",
    label: "AB Negative",
    value: "AB Negative",
  },
];

const WEEK_DAYS_LIST = [
  {
    label: "Monday",
    value: "Monday",
    shortName: "Mon",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
    shortName: "Tue",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
    shortName: "Wed",
  },
  {
    label: "Thursday",
    value: "Thursday",
    shortName: "Thu",
  },
  {
    label: "Friday",
    value: "Friday",
    shortName: "Fri",
  },
  {
    label: "Saturday",
    value: "Saturday",
    shortName: "Sat",
  },
  {
    label: "Sunday",
    value: "Sunday",
    shortName: "Sun",
  },
];

const DOCTOR_DEPARTMENTS = [
  { label: "Anaesthesiology", value: "Anaesthesiology" },
  { label: "Cardiology", value: "Cardiology" },
  { label: "Cardiothoracic Surgery", value: "Cardiothoracic Surgery" },
  { label: "Deglutologist", value: "Deglutologist" },
  { label: "Dental", value: "Dental" },
  { label: "Dermatology", value: "Dermatology" },
  { label: "Dietician", value: "Dietician" },
  { label: "Endocrinology", value: "Endocrinology" },
  { label: "Ent", value: "Ent" },
  { label: "Gastro Enterology", value: "Gastro Enterology" },
  { label: "General Medicine", value: "General Medicine" },
  { label: "General Physician", value: "General Physician" },
  { label: "General Surgery", value: "General Surgery" },
  { label: "Gynaec Oncology", value: "Gynaec Oncology" },
  { label: "Gynaecology", value: "Gynaecology" },
  { label: "Head And Neck Oncology", value: "Head And Neck Oncology" },
  {
    label: "Hematology And Hemato-oncology",
    value: "Hematology And Hemato-oncology",
  },
  {
    label: "Interventional Gastroenterologist & Hepatologist",
    value: "Interventional Gastroenterologist & Hepatologist",
  },
  { label: "Medical Oncology", value: "Medical Oncology" },
  { label: "Medical Services", value: "Medical Services" },
  { label: "Micro Biology", value: "Micro Biology" },
  { label: "Neo Natology", value: "Neo Natology" },
  { label: "Nephrology", value: "Nephrology" },
  { label: "Neuro Psychiatrist", value: "Neuro Psychiatrist" },
  { label: "Neuro Surgery", value: "Neuro Surgery" },
  { label: "Neurology", value: "Neurology" },
  { label: "Nuclear Medicine", value: "Nuclear Medicine" },
  { label: "Nurophysician", value: "Nurophysician" },
  { label: "Oncology", value: "Oncology" },
  { label: "Ophthalmology", value: "Ophthalmology" },
  { label: "Ortho Oncology", value: "Ortho Oncology" },
  { label: "Orthopaedics", value: "Orthopaedics" },
  { label: "Paediatrics", value: "Paediatrics" },
  { label: "Pathology", value: "Pathology" },
  { label: "Pet Ct", value: "Pet Ct" },
  { label: "Physiotheraphy", value: "Physiotheraphy" },
  {
    label: "Plastic And Reconstructive Surgery",
    value: "Plastic And Reconstructive Surgery",
  },
  { label: "Plastic Surgery", value: "Plastic Surgery" },
  { label: "Psychiatry", value: "Psychiatry" },
  { label: "Pulmanology", value: "Pulmanology" },
  { label: "Radiation Oncology", value: "Radiation Oncology" },
  { label: "Radiologist", value: "Radiologist" },
  { label: "Radiology", value: "Radiology" },
  { label: "Surgical Gastro", value: "Surgical Gastro" },
  { label: "Surgical Oncology", value: "Surgical Oncology" },
  { label: "Uro Oncology", value: "Uro Oncology" },
  { label: "Urology", value: "Urology" },
  { label: "Vascular Surgery", value: "Vascular Surgery" },
];

const DOCTOR_DESIGNATIONS = [
  { label: "Cardiologist", value: "Cardiologist" },
  { label: "Neurologist", value: "Neurologist" },
  { label: "Dermatologist", value: "Dermatologist" },
  { label: "Endocrinologist", value: "Endocrinologist" },
  { label: "Obstetrician-gynecologist", value: "Obstetrician-gynecologist" },
  { label: "Oncologist", value: "Oncologist" },
  { label: "Pediatrician", value: "Pediatrician" },
  { label: "Allergist", value: "Allergist" },
  { label: "Psychiatrist", value: "Psychiatrist" },
  { label: "Family medicine", value: "Family medicine" },
  { label: "Gastroenterologist", value: "Gastroenterologist" },
  { label: "Internal medicine", value: "Internal medicine" },
  { label: "Ophthalmologist", value: "Ophthalmologist" },
  { label: "Radiologist", value: "Radiologist" },
  { label: "Anesthesiologist", value: "Anesthesiologist" },
  { label: "Otolaryngologist", value: "Otolaryngologist" },
  { label: "Cardiothoracic Surgeon", value: "Cardiothoracic Surgeon" },
  { label: "Hematologist", value: "Hematologist" },
  { label: "Nephrologist", value: "Nephrologist" },
  { label: "Pulmonologist", value: "Pulmonologist" },
  { label: "Geriatrics", value: "Geriatrics" },
  {
    label: "Infectious disease physician",
    value: "Infectious disease physician",
  },
  { label: "Medical genetics", value: "Medical genetics" },
  { label: "Orthopaedist", value: "Orthopaedist" },
];
const DAILY_SHIFT = [
  {
    label: "Shift A (6AM - 2PM)",
    value: "Shift A",
    shiftTimingsFrom: "06:00",
    shiftTimingsTo: "14:00",
  },
  {
    label: "Shift B (2PM - 10PM)",
    value: "Shift B",
    shiftTimingsFrom: "14:00",
    shiftTimingsTo: "22:00",
  },
  ,
  {
    label: "Shift C (10PM - 6AM)",
    value: "Shift C",
    shiftTimingsFrom: "22:00",
    shiftTimingsTo: "06:00",
  },
  ,
];

const PAYMENT_TYPES = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "UPI",
    value: "UPI",
  },
  // {
  //   label: "Coupon",
  //   value: "Coupon",
  // },
];

const SALUTATIONS = [
  {
    label: "Mr.",
    value: "Mr.",
  },
  {
    label: "Mrs.",
    value: "Mrs.",
  },
  {
    label: "Master.",
    value: "Master.",
  },
  {
    label: "Ms.",
    value: "Ms.",
  },
  {
    label: "Dr.",
    value: "Dr.",
  },
];

const PATIENT_TYPES = [
  {
    label: "Out patient",
    value: "Out Patient",
    shortName: "OPD",
  },
  {
    label: "In patient",
    value: "In Patient",
    shortName: "IP",
  },
  {
    label: "Emergency",
    value: "Emergency",
    shortName: "ER",
  },
];

const APPOINTMENT_BOOKING_STATUS = [
  {
    label: "Free",
    value: "Free",
    code: "ABS001",
    color: "#078307", // Bright Green
  },
  {
    label: "Hold",
    value: "Hold",
    code: "ABS003",
    color: "#bd702c", // Bright Yellow
  },
  {
    label: "Booked",
    value: "Booked",
    code: "ABS004",
    color: "#0e0e93", // Bright Blue
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    code: "ABS005",
    color: "#a71111", // Bright Red
  },
  {
    label: "Rescheduled",
    value: "Rescheduled",
    code: "ABS006",
    color: "#800080", // Bright Purple
  },
  {
    label: "Completed",
    value: "Completed",
    code: "ABS007",
    color: "#0997cf", // Bright Green
  },
  {
    label: "No Show",
    value: "No Show",
    code: "ABS008",
    color: "#55474a", // Bright Pink
  },
];

const APP_USER_TYPES = [
  {
    label: "ADMIN",
    value: "ADMIN",
    description: "",
  },
  {
    label: "DOCTOR",
    value: "DOCTOR",
    description: "",
  },
  {
    label: "NURSE",
    value: "NURSE",
    description: "",
  },
  {
    label: "STAFF",
    value: "STAFF",
    description: "",
  },
  {
    label: "PATIENT",
    value: "PATIENT",
    description: "",
  },
];

const REGISTRATION_TYPES = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "Renewal",
    value: "Renewal",
  },
];
const VISIT_TYPES = [
  {
    label: "New Case",
    value: "New Case",
  },
  {
    label: "General OP",
    value: "General OP",
  },
  {
    label: "Consultation",
    value: "Consultation",
  },
  {
    label: "Follow-up",
    value: "Follow-up",
  },
  {
    label: "Report Check",
    value: "Report Check",
  },
];

const PAYMENT_STATUSES = [
  {
    label: "Success",
    value: "Success",
  },
  {
    label: "Failure",
    value: "Failure",
  },
  {
    label: "Pending",
    value: "Pending",
  },
];

export {
  GENDER_LIST,
  BLOOD_GROUPS,
  MARITAL_STATUS,
  WEEK_DAYS_LIST,
  DOCTOR_DESIGNATIONS,
  DAILY_SHIFT,
  SALUTATIONS,
  PAYMENT_TYPES,
  PATIENT_TYPES,
  REGISTRATION_TYPES,
  VISIT_TYPES,
  PAYMENT_STATUSES,
  APP_USER_TYPES,
  DOCTOR_DEPARTMENTS,
  APPOINTMENT_BOOKING_STATUS,
};
