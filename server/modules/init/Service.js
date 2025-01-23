const db = require("../../db");
const SQL1 = require("../../mapQueries/QueryMappings1");

async function getOrgData() {
  try {
    const QUERY = SQL1.GET_ORG_DETAILS;
    const result = await db.query(QUERY);
    let finalRes = result?.map((x) => {
      return {
        ...x,
        dropdownLabel: x.orgName,
        dropdownValue: x.orgId,
      };
    });
    return finalRes;
  } catch (e) {
    console.log("Error fetching org data: ", e);
    throw e;
  }
}

async function getMenu(roleId) {
  try {
    const PARENT_QUERY = SQL1.GET_PARENT_SIDENAV_MENU;
    const CHILD_QUERY = SQL1.GET_CHILD_SIDENAV_MENU;
    const result = await db.query(PARENT_QUERY);
    const filteredResult = result
      ?.filter((x) => x.accessTo?.includes(roleId))
      ?.sort((a, b) => a.sortOrder - b.sortOrder);

    const finalArr = await Promise.all(
      filteredResult?.map(async (item) => {
        const childMenuResult = await db.query(CHILD_QUERY, [item.menuId]);
        return {
          ...item,
          children:
            childMenuResult?.sort((a, b) => a.sortOrder - b.sortOrder) ?? [],
        };
      }) || []
    );

    return finalArr;
  } catch (error) {
    console.error("Error getting menu:", error);
    throw error;
  }
}

module.exports = {
  getMenu,
  getOrgData,
};
