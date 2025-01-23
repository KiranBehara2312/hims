const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function allNtfs(loggedInUserId, page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;
    const requestedByAdmin = loggedInUserId?.charAt(0) === "A";
    let queryValues = [loggedInUserId, pageSize, offset];
    let QUERY = SQL1.GET_ALL_NOTIFICATIONS_BY_USER;
    if (requestedByAdmin) {
      QUERY = SQL1.GET_ALL_NOTIFICATIONS_BY_ADMIN;
      queryValues = [pageSize, offset];
    }
    const paginatedQuery = `${QUERY} LIMIT ? OFFSET ?`;
    const result = await db.query(paginatedQuery, queryValues);
    const countQuery = `SELECT COUNT(*) AS total FROM (${QUERY}) AS countQuery`;
    const countResult = await db.query(
      countQuery,
      requestedByAdmin ? [] : [loggedInUserId]
    );
    const totalRecords = Object.values(countResult[0])?.[0];
    const totalPages = Math.ceil(totalRecords / pageSize);
    return {
      data: result,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  } catch (e) {
    console.log(`Error fetching Notifications ->: `, e);
    throw e;
  }
}

async function createNewNotification(payload) {
  try {
    const QUERY = SQL1.CREATE_UPDATE_NOTIFICATION_PROC;
    const result = await db.query(QUERY, Object.values(payload));
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  allNtfs,
  createNewNotification,
};
