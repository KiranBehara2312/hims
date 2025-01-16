const REGEX_PATTERNS = {
  mobileNumber: /^(?:\+91|91)?[789]\d{9}$/,
  aadhaarNumber: /^\d{12}$/,
  panNumber: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  postalCode: /^\d{6}$/,
  ifscCode: /^[A-Za-z]{4}[0-9]{7}$/,
  vehicleRegistrationNumber: /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/,
  gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
  voterId: /^[A-Z]{3}[0-9]{7}$/,
  dateOfBirth: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
  timeFormat: /^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
  landlineNumber: /^(?:\+91|91|0)?[2-9]\d{1,4}\d{6}$/,
  rtgsNeftTransactionNumber: /^[A-Z]{4}[0-9]{7}$/,
  itrFormNumber: /^[A-Z]{4}[0-9]{6}[A-Z]$/,
  electionIdNumber: /^[A-Z]{1}[0-9]{7}$/,
  MEDICAL_LICENSE_NUMBER: /^[A-Za-z]{2}[-/]?\d{5}[-/]\d{4}$/,
  POSITIVE_NUMBER_ONLY: /^\d+(\.\d+)?$/,
  BLOOD_PRESSURE: /^([0-9]{1,3})\/([0-9]{1,3})$/,
  BODY_TEMPERATURE:
    /^(9[5-9]\.\d{1,2}|[1][0-9]{2}\.\d{1,2}|[9][5-9]{1}\d{0,1})$/,
  HH_MM: /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
};

export { REGEX_PATTERNS };
