const NEVER_CHANGING_VALS = require("../../constants");
const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function getUHIDFee() {
  try {
    let QUERY = SQL1.GET_UHID_CHARGES_FEE;
    const result = await db.query(QUERY);
    return result?.[0];
  } catch (e) {
    console.log(`Error fetching UHID Charges ->: `, e);
    throw e;
  }
}
async function getAllServicesForRegn(serviceLocationId, patientType) {
  try {
    let whereClause = ` `;
    if (patientType) {
      if (patientType === NEVER_CHANGING_VALS.PAT_TYPE_OP) {
        whereClause += `  AND isOpService = 1 `;
      }
      if (patientType === NEVER_CHANGING_VALS.PAT_TYPE_IP) {
        whereClause += ` AND isIpService = 1 `;
      }
    }
    let QUERY = `${SQL1.GET_PAYMENT_SERVICES_BY_SER_LOC_ID} ${whereClause}`;
    const result = await db.query(QUERY, [serviceLocationId]);
    return result;
  } catch (e) {
    console.log(`Error fetching all registration Charges ->: `, e);
    throw e;
  }
}
async function getDrConsultFee() {
  try {
    let QUERY = SQL1.GET_DR_CONSULT_CHARGES_FEE;
    const result = await db.query(QUERY);
    return result?.[0];
  } catch (e) {
    console.log(`Error fetching Dr Consult Charges ->: `, e);
    throw e;
  }
}

async function insertNewPaymentService(payload) {
  try {
    const {
      id = null,
      serviceName,
      serviceAmount,
      serviceDescription,
      isDiscountApplicable,
      maxDiscountInPercent,
      serviceLocationId,
      isSponsorPayService,
      isOpService,
      isIpService,
      isHospitalService,
      isExternalService,
      isPackage,
      isActive,
    } = payload;
    let QUERY = SQL1.UPSERT_PAYMENT_SERVICE_PROC;
    const result = await db.query(QUERY, [
      id,
      serviceName,
      serviceDescription,
      serviceAmount,
      isDiscountApplicable,
      serviceLocationId,
      maxDiscountInPercent,
      isSponsorPayService,
      isOpService,
      isIpService,
      isHospitalService,
      isExternalService,
      isPackage,
      isActive,
    ]);
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
    let newSearchVal = searchString === "all" ? "" : searchString;
    let QUERY = SQL1.GET_PAYMENT_SERVICES_BY_ID_NAME;
    const offset = (page - 1) * pageSize;
    const paginatedQuery = `${QUERY}  LIMIT ? OFFSET ?`;
    const result = await db.query(paginatedQuery, [
      newSearchVal,
      `${newSearchVal}%`,
      pageSize,
      offset,
    ]);
    const countQuery = `SELECT COUNT(*) FROM (${QUERY}) AS count;`;
    const countResult = await db.query(countQuery, [
      newSearchVal,
      `${newSearchVal}%`,
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
    console.log(`Error fetching getPaymentServiceByIdOrName ->: `, e);
    throw e;
  }
}

module.exports = {
  getUHIDFee,
  getDrConsultFee,
  getPaymentServiceByIdOrName,
  insertNewPaymentService,
  getAllServicesForRegn,
};
