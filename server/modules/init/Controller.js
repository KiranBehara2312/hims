const asyncHandler = require("../../middlewares/AsyncHandler");
const { getMenu, getOrgData } = require("./Service");

const menu = asyncHandler(async (req, res) => {
  const loggedInUser = req.loggedInUser;  
  const result = await getMenu(loggedInUser?.roleId);
  res.status(200).json({
    message: "Menu's fetched successfully",
    data: result,
  });
});

const orgData = asyncHandler(async (req, res) => {
  const result = await getOrgData();
  res.status(200).json({
    message: "Menu's fetched successfully",
    data: result,
  });
})

module.exports = {
  menu,
  orgData,
};
