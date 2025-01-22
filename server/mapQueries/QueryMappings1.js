const SQL1 = {
  GET_USER_BY_USER_ID: `SELECT * FROM ORG_USR_DETAILS WHERE userId = ?;`,
  GET_USERS_LIST: `SELECT * FROM ORG_USR_DETAILS WHERE isActive = '1'`,
  GET_COUNTRY_DATA: `SELECT * FROM GBL_CTRY_DETAILS WHERE isActive = '1'`,
  GET_ALL_STATE_DATA: `SELECT * FROM GBL_STAT_DETAILS WHERE isActive = '1'`,
  GET_ROLE_DATA_BY_ROLE_ID: `SELECT * FROM GBL_USR_ROLES WHERE roleId = ?;`,
  GET_USER_BY_USER_PHONE: `SELECT * FROM ORG_USR_DETAILS WHERE userPhone = ?;`,
  UPDATE_INCORRECT_PWD_ATTEMPTS: `UPDATE ORG_USR_DETAILS SET incorrectPwdAttempts = incorrectPwdAttempts + 1 WHERE userId = ?;`,
  LOCK_USER: `UPDATE ORG_USR_DETAILS SET isLocked = 1 WHERE userId = ?;`,
  UNLOCK_USER: `UPDATE ORG_USR_DETAILS SET isLocked = 0, incorrectPwdAttempts = 0 WHERE userId = ?;`,
  CREATE_USER_PROC:
    "CALL CREATE_USER_PROC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
  GET_PARENT_SIDENAV_MENU: `SELECT * FROM ORG_SNV_PRT_ITEMS WHERE isActive = '1';`,
  GET_CHILD_SIDENAV_MENU: `SELECT * FROM ORG_SNV_CHL_ITEMS where parentId = ? AND isActive = '1';`,
  GET_ORG_DETAILS: `SELECT * FROM GBL_ORG_DETAILS`,
  GET_GENDER_DATA: `SELECT genderId as id, genderName as name FROM GBL_GND_DETAILS WHERE isActive = '1'`,
  GET_MARITAL_STATUS: `SELECT maritalId as id, maritalName as name FROM GBL_MRTL_STATUS WHERE isActive = '1'`,
  GET_SALUTATION_DATA: `SELECT salutationId as id, salutationName as name FROM GBL_SAL_DETAILS WHERE isActive = '1'`,
  GET_ROLES_DATA: `SELECT roleId as id, roleName as name, rolePrefix, colorTheme as color, iconName FROM GBL_USR_ROLES WHERE isActive = '1'`,
  GET_BLOOD_GRP_DATA: `SELECT bloodGroupId as id, bloodGroupName as name, shortName  FROM GBL_BLD_GROUPS WHERE isActive = '1'`,
  GET_DOC_DESIGNATION: `SELECT designationId as id, designationName as name FROM GBL_DOC_DESIGNATIONS WHERE isActive = '1'`,
  GET_APPT_STATUS_DATA: `SELECT apptStatusId,apptStatusName,color FROM GBL_APPT_STATUS WHERE isActive = '1'`,
};

module.exports = SQL1;
