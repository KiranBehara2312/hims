const SQL1 = {
  GET_USER_BY_USER_ID: `SELECT * FROM ORG_USR_DETAILS WHERE userId = ?;`,
  GET_ROLE_DATA_BY_ROLE_ID: `SELECT * FROM GBL_USR_ROLES WHERE roleId = ?;`,
  GET_USER_BY_USER_PHONE: `SELECT * FROM ORG_USR_DETAILS WHERE userPhone = ?;`,
  UPDATE_INCORRECT_PWD_ATTEMPTS: `UPDATE ORG_USR_DETAILS SET incorrectPwdAttempts = incorrectPwdAttempts + 1 WHERE userId = ?;`,
  LOCK_USER: `UPDATE ORG_USR_DETAILS SET isLocked = 1 WHERE userId = ?;`,
  UNLOCK_USER: `UPDATE ORG_USR_DETAILS SET isLocked = 0, incorrectPwdAttempts = 0 WHERE userId = ?;`,
  CREATE_USER_PROC:
    "CALL CREATE_USER_PROC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
  GET_PARENT_SIDENAV_MENU: `SELECT * FROM ORG_SNV_PRT_ITEMS;`,
  GET_CHILD_SIDENAV_MENU: `SELECT * FROM ORG_SNV_CHL_ITEMS where parentId = ?;`,
  GET_ORG_DETAILS: `select * from GBL_ORG_DETAILS;`,
};

module.exports = SQL1;
