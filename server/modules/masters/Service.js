const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function getMasterData(SQL_MAPPING_NAME, page = 1, pageSize = 10) {
  try {
    const QUERY = SQL1[SQL_MAPPING_NAME];
    let totalPages = 0;
    let totalRecords = 0;
    let result = [];
    if (pageSize === "Infinity") {
      const paginatedQuery = `${QUERY}`;
      result = await db.query(paginatedQuery);
    } else {
      const offset = (page - 1) * pageSize;
      const paginatedQuery = `${QUERY} LIMIT ? OFFSET ?`;
      result = await db.query(paginatedQuery, [pageSize, offset]);
      const countQuery = `SELECT COUNT(*) FROM (${QUERY}) AS count;`;
      const countResult = await db.query(countQuery);
      totalRecords = Object.values(countResult[0])?.[0];
      totalPages = Math.ceil(totalRecords / pageSize);
    }
    const finalArr =
      result?.map((x) => {
        return {
          ...x,
          dropdownLabel: x.name,
          dropdownValue: x.id,
        };
      }) ?? [];
    return {
      data: finalArr,
      pagination:
        pageSize === "Infinity"
          ? null
          : {
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
