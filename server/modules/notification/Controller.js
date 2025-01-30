const asyncHandler = require("../../middlewares/AsyncHandler");
const { allNtfs, createNewNotification } = require("./Service");
const jwt = require("jsonwebtoken");

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

const getEvents = asyncHandler(async (req, res) => {
  const token = req.query.token ?? null;
  let userObj = null;
  if (token === null) {
    return res.status(403).json({
      message: "No Token Provided",
      tokenExpired: err.name === "TokenExpiredError",
      err: "ADNTP",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
        tokenExpired: err.name === "TokenExpiredError",
        err: "ITP",
      });
    }
    userObj = user;
  });
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Keep the connection open
  res.flushHeaders();

  const sendEvent = async () => {
    const result = await allNtfs(userObj?.userId, 1, 99);
    const eventData = {
      notiCount: result?.data?.length,
    };
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  };
  const intervalId = setInterval(sendEvent, 10 * 1000); // 10 seconds
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

module.exports = {
  allNotifications,
  createNotification,
  getEvents,
};
