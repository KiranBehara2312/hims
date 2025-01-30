const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function sponsorBySpnGrp(sponsorGroupId) {
  try {
    let QUERY = SQL1.GET_SPONSOR_BY_SPN_GRP_ID;
    const result = await db.query(QUERY, [sponsorGroupId]);
    return {
      data: result?.map((x) => {
        return {
          ...x,
          dropdownLabel: x.sponsorName,
          dropdownValue: x.sponsorId,
        };
      }),
    };
  } catch (e) {
    console.log(`Error fetching Notifications ->: `, e);
    throw e;
  }
}

module.exports = {
  sponsorBySpnGrp,
};
