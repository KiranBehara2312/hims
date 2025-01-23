const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function getUserByUserId(userId) {
  try {
    const QUERY = SQL1.GET_USER_BY_USER_ID;
    const result = await db.query(QUERY, [userId]);
    return result;
  } catch (error) {
    console.error("Error checking user availability:", error);
    throw error;
  }
}

async function getRoleDataById(roleId) {
  try {
    const QUERY = SQL1.GET_ROLE_DATA_BY_ROLE_ID;
    const result = await db.query(QUERY, [roleId]);
    return result;
  } catch (error) {
    console.error("Error checking role data:", error);
    throw error;
  }
}

async function incrementIncorrectPwd(userId) {
  try {
    const QUERY = SQL1.UPDATE_INCORRECT_PWD_ATTEMPTS;
    const result = await db.query(QUERY, [userId]);
    return result;
  } catch (error) {
    console.error(
      "Error While incrementing incorrect pwd attempt col :",
      error
    );
    throw error;
  }
}

async function lockUnlockUser(actionType, userId) {
  try {
    const QUERY = actionType === "LOCK" ? SQL1.LOCK_USER : SQL1.UNLOCK_USER;
    const result = await db.query(QUERY, [userId]);
    return result;
  } catch (error) {
    console.error("Error While locking/unlocking user:", error);
    throw error;
  }
}

async function getUserByUserPhone(userPhone) {
  try {
    const QUERY = SQL1.GET_USER_BY_USER_PHONE;
    const result = await db.query(QUERY, [userPhone]);
    return result;
  } catch (error) {
    console.error("Error checking user availability:", error);
    throw error;
  }
}

async function createNewUser(userData) {
  try {
    const QUERY = SQL1.CREATE_UPDATE_USER_PROC;
    const {
      orgId,
      firstName,
      middleName,
      lastName,
      fullName,
      userPhone,
      roleId,
      userAadhar,
      isActive,
      isBlocked,
      isLocked,
      userPassword,
      incorrectPwdAttempts,
      createdBy,
      updatedBy,
    } = userData;
    const result = await db.query(QUERY, [
      orgId,
      firstName,
      middleName,
      lastName,
      fullName,
      userPhone,
      roleId,
      userAadhar,
      isActive,
      isBlocked,
      isLocked,
      userPassword,
      incorrectPwdAttempts,
      createdBy,
      updatedBy,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByUserId,
  getUserByUserPhone,
  createNewUser,
  lockUnlockUser,
  incrementIncorrectPwd,
  getRoleDataById,
};
