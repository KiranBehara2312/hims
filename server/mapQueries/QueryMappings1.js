const SQL1 = {
  GET_USER_BY_USER_ID: `SELECT * FROM ORG_USR_DETAILS WHERE userId = ?;`,
  GET_USERS_LIST: `SELECT userId, orgId, firstName, middleName, lastName, fullName, userPhone, roleId, userAadhar, isActive, isBlocked, isLocked, incorrectPwdAttempts FROM ORG_USR_DETAILS WHERE isActive = '1'`,
  GET_COUNTRY_DATA: `SELECT *, countryId as dropdownValue, countryName as dropdownLabel FROM GBL_CTRY_DETAILS WHERE isActive = '1'`,
  GET_ALL_STATE_DATA: `SELECT *, stateId as dropdownValue, stateName as dropdownLabel FROM GBL_STAT_DETAILS WHERE isActive = '1'`,
  GET_ALL_REG_VISIT_TYPES: `SELECT *, visitTypeId as dropdownValue, visitTypeName as dropdownLabel FROM GBL_REG_VISITTYPE WHERE isActive = '1'`,
  GET_ROLE_DATA_BY_ROLE_ID: `SELECT * FROM GBL_USR_ROLES WHERE roleId = ?;`,
  GET_USER_BY_USER_PHONE: `SELECT * FROM ORG_USR_DETAILS WHERE userPhone = ?;`,
  UPDATE_INCORRECT_PWD_ATTEMPTS: `UPDATE ORG_USR_DETAILS SET incorrectPwdAttempts = incorrectPwdAttempts + 1 WHERE userId = ?;`,
  LOCK_USER: `UPDATE ORG_USR_DETAILS SET isLocked = 1 WHERE userId = ?;`,
  UNLOCK_USER: `UPDATE ORG_USR_DETAILS SET isLocked = 0, incorrectPwdAttempts = 0 WHERE userId = ?;`,
  CREATE_UPDATE_USER_PROC:
    "CALL CREATE_UPDATE_USER_PROC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?);",
  CREATE_UPDATE_DOC_PROC: `CALL UPSERT_DOC_PROC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  GET_ALL_ACTIVE_DOCTORS: `SELECT * FROM ORG_DOC_DETAILS  `,
  GET_PARENT_SIDENAV_MENU: `SELECT * FROM ORG_SNV_PRT_ITEMS WHERE isActive = '1';`,
  GET_CHILD_SIDENAV_MENU: `SELECT * FROM ORG_SNV_CHL_ITEMS where parentId = ? AND isActive = '1';`,
  GET_ORG_DETAILS: `SELECT * FROM GBL_ORG_DETAILS`,
  GET_GENDER_DATA: `SELECT *, genderId as dropdownValue, genderName as dropdownLabel FROM GBL_GND_DETAILS WHERE isActive = '1'`,
  GET_MARITAL_STATUS: `SELECT maritalId, maritalName, maritalId as dropdownValue, maritalName as dropdownLabel FROM GBL_MRTL_STATUS WHERE isActive = '1'`,
  GET_SALUTATION_DATA: `SELECT salutationId,salutationName, salutationId as dropdownValue, salutationName as dropdownLabel FROM GBL_SAL_DETAILS WHERE isActive = '1'`,
  GET_ROLES_DATA: `SELECT roleId, roleName, roleId as dropdownValue, roleName as dropdownLabel, rolePrefix, colorTheme as color, iconName FROM GBL_USR_ROLES WHERE isActive = '1'`,
  GET_BLOOD_GRP_DATA: `SELECT bloodGroupId, bloodGroupName, shortName, bloodGroupId as dropdownValue, bloodGroupName as dropdownLabel  FROM GBL_BLD_GROUPS WHERE isActive = '1'`,
  GET_DOC_DESIGNATION: `SELECT designationId, designationName, designationId as dropdownValue, designationName as dropdownLabel FROM GBL_DOC_DESIGNATIONS WHERE isActive = '1'`,
  GET_DOC_DEPTS: `SELECT departmentId,departmentName,departmentId as dropdownValue, departmentName as dropdownLabel FROM GBL_DOC_DEPTS WHERE isActive = '1'`,
  GET_APPT_STATUS_DATA: `SELECT apptStatusId,apptStatusName,color FROM GBL_APPT_STATUS WHERE isActive = '1'`,
  GET_DOCTOR_QUALIFICATION_DATA: `SELECT qualificationId, qualificationName,  shortName,qualificationId as dropdownValue,shortName as dropdownLabel, qualificationName as fullForm FROM GBL_DOCTOR_QLFCN WHERE isActive = '1'`,
  GET_ORG_SHIFTS: `SELECT shiftId, shiftName,shiftId as dropdownValue ,shiftName as dropdownLabel, shiftTimeStartAt, shiftTimeEndAt FROM GBL_ORG_SHIFTS WHERE isActive = '1'`,
  GET_PATIENT_TYPES: `SELECT patientTypeId, patientTypeName,patientTypeId as dropdownValue ,patientTypeName as dropdownLabel, shortName FROM GBL_ORG_PATTYPES WHERE isActive = '1'`,
  GET_PATIENT_CAT_LIST: `SELECT patientCategoryId,patientCategoryName,patientCategoryId as dropdownValue ,patientCategoryName as dropdownLabel, shortName FROM GBL_ORG_PAT_CAT WHERE isActive = '1'`,
  GET_PAYMENT_TYPE: `SELECT paymentTypeId,paymentTypeName, paymentTypeId as dropdownValue ,paymentTypeName as dropdownLabel, shortName FROM GBL_PAYMENT_TYPE WHERE isActive = '1'`,
  GET_DISABILITY_STATUS: `SELECT disabilityId,disabilityName, disabilityId as dropdownValue ,disabilityName as dropdownLabel, disabilityDescription FROM GBL_DIS_DETAILS WHERE isActive = '1'`,
  GBL_NOT_PRIORITY: `SELECT priorityId, priorityName,priorityId as dropdownValue, priorityName as dropdownLabel FROM GBL_NOT_PRIORITY WHERE isActive = '1'`,
  CREATE_UPDATE_NOTIFICATION_PROC: `CALL UPSERT_NTF_HISTORY_PROC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  GET_ALL_NOTIFICATIONS_BY_USER: `SELECT * FROM USR_NTF_HISTORY WHERE ntfTaggedUserId IS NULL OR ntfTaggedUserId = '' OR ntfTaggedUserId = ? `,
  GET_ALL_NOTIFICATIONS_BY_ADMIN: `SELECT * FROM USR_NTF_HISTORY `,
  GET_MASTERS_ALL_PAYMENT_SER_LOC: `SELECT * FROM ORG_PAY_SERVICE_LOCATIONS where isActive = 1 `,
  GET_MASTERS_ALL_PAYMENT_SER: `SELECT * FROM ORG_PAY_SERVICES where isActive = 1 `,
  GET_KNOWNUS_BY: `SELECT knownusId as dropdownValue, knownusId, knownusName as dropdownLabel, knownusName FROM GBL_KNOWNUS_BY where isActive = 1 `,
  GET_KIN_RELATION: `SELECT kinRelationId as dropdownValue, kinRelationId, kinRelationName as dropdownLabel, kinRelationName FROM GBL_KIN_REL where isActive = 1 `,
  GET_ID_TYPES: `SELECT idTypeId as dropdownValue, idTypeId, idTypeName as dropdownLabel, idTypeName FROM GBL_ID_TYPES where isActive = 1 `,
  GET_UHID_CHARGES_FEE: `SELECT * FROM ORG_PAY_SERVICES where serviceId = 'PSER00019';`,
  GET_DR_CONSULT_CHARGES_FEE: `SELECT * FROM ORG_PAY_SERVICES where serviceId = 'PSER00001';`,
  GET_PAYMENT_SERVICES_BY_ID_NAME: `SELECT * FROM ORG_PAY_SERVICES WHERE serviceId LIKE ? OR serviceName LIKE ? `,
  GET_SPONSOR_BY_ID: `SELECT s.sponsorId, s.sponsorName, s.canApplyDiscount, s.sponsorDescription AS sponsorDescription, s.isActive AS sponsorIsActive, g.sponsorGroupId, g.sponsorGroupName, g.sponsorGroupDescription AS sponsorGroupDescription, g.isActive AS groupIsActive FROM ORG_SPON_DETAILS s INNER JOIN ORG_SPON_GRP_DETAILS g ON s.sponsorGroupId = g.sponsorGroupId WHERE  s.isActive = 1 AND s.sponsorId = ?;`,
  GET_SPONSOR_BY_SPN_GRP_ID: `SELECT s.sponsorId, s.sponsorName, s.canApplyDiscount, s.sponsorDescription AS sponsorDescription, s.isActive AS sponsorIsActive, g.sponsorGroupId, g.sponsorGroupName, g.sponsorGroupDescription AS sponsorGroupDescription, g.isActive AS groupIsActive FROM ORG_SPON_DETAILS s INNER JOIN ORG_SPON_GRP_DETAILS g ON s.sponsorGroupId = g.sponsorGroupId WHERE  s.isActive = 1 AND s.sponsorGroupId = ?;`,
  GET_ALL_SPONSORS: `SELECT s.sponsorId, s.sponsorName, s.canApplyDiscount, s.sponsorDescription AS sponsorDescription, s.isActive AS sponsorIsActive, g.sponsorGroupId, g.sponsorGroupName, g.sponsorGroupDescription AS sponsorGroupDescription, g.isActive AS groupIsActive FROM ORG_SPON_DETAILS s INNER JOIN ORG_SPON_GRP_DETAILS g ON s.sponsorGroupId = g.sponsorGroupId WHERE s.isActive = 1 `,
  GET_ALL_SPONSOR_GROUPS: `SELECT sponsorGroupId, sponsorGroupId as dropdownValue,sponsorGroupName, sponsorGroupName as dropdownLabel,sponsorGroupDescription FROM ORG_SPON_GRP_DETAILS WHERE isActive = 1 `,
};

module.exports = SQL1;
