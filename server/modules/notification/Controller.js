const asyncHandler = require("../../middlewares/AsyncHandler");
const { allNtfs, createNewNotification } = require("./Service");

const allNotifications = asyncHandler(async (req, res) => {
  const { page, limit } = req.body;
  const loggedInUser = req.loggedInUser;
  const result = await allNtfs(loggedInUser?.userId, page, limit);
  res.status(200).json({
    message: `Notifications fetched successfully`,
    ...result,
  });
});

const createNotification = asyncHandler(async (req, res) => {
  const payload = req.body;
  const newNotification = await createNewNotification(payload);
  res.status(201).json({
    message: "Notification sent..!",
    data: null,
  });
});

module.exports = {
  allNotifications,
  createNotification,
};
