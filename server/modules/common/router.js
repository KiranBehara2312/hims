const express = require("express");
const notificationController = require("../notification/Controller");
const commonRouter = express.Router();

commonRouter.get("/events", notificationController.getEvents);

module.exports = commonRouter;
