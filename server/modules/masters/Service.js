const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function getMasterData(SQL_MAPPING_NAME, page = 1, pageSize = 10) {
  try {
    const QUERY = SQL1[SQL_MAPPING_NAME];
    const offset = (page - 1) * pageSize;
    const paginatedQuery = `${QUERY} LIMIT ? OFFSET ?`;
    const result = await db.query(paginatedQuery, [pageSize, offset]);
    const countQuery = `SELECT COUNT(*) FROM (${QUERY}) AS count;`;
    const countResult = await db.query(countQuery);
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
    console.log(`Error fetching masters -> ${SQL_MAPPING_NAME}: `, e);
    throw e;
  }
}

module.exports = {
  getMasterData,
};
