const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function getUHIDFee() {
  try {
    let QUERY = SQL1.GET_UHID_CHARGES_FEE;
    const result = await db.query(QUERY);
    return {
      data: result,
    };
  } catch (e) {
    console.log(`Error fetching UHID Charges ->: `, e);
    throw e;
  }
}
async function getDrConsultFee() {
  try {
    let QUERY = SQL1.GET_DR_CONSULT_CHARGES_FEE;
    const result = await db.query(QUERY);
    return {
      data: result,
    };
  } catch (e) {
    console.log(`Error fetching Dr Consult Charges ->: `, e);
    throw e;
  }
}

async function getPaymentServiceByIdOrName(
  page = 1,
  pageSize = 10,
  searchString
) {
  try {
    let QUERY = SQL1.GET_PAYMENT_SERVICES_BY_ID_NAME;
    const offset = (page - 1) * pageSize;
    const paginatedQuery = `${QUERY}  LIMIT ? OFFSET ?`;
    const result = await db.query(paginatedQuery, [
      `${searchString}%`,
      `${searchString}%`,
      pageSize,
      offset,
    ]);
    const countQuery = `SELECT COUNT(*) FROM (${QUERY}) AS count;`;
    const countResult = await db.query(countQuery, [
      `${searchString}%`,
      `${searchString}%`,
    ]);
    totalRecords = Object.values(countResult[0])?.[0];
    totalPages = Math.ceil(totalRecords / pageSize);
    // const result = await db.query(QUERY);
    return {
      data: result,
      paginatedQuery,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  } catch (e) {
    console.log(`Error fetching Dr Consult Charges ->: `, e);
    throw e;
  }
}

module.exports = {
  getUHIDFee,
  getDrConsultFee,
  getPaymentServiceByIdOrName,
};
