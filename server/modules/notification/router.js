const express = require('express');
const notificationRouter = express.Router();
const notificationController = require('./Controller')

notificationRouter.post("/all", notificationController.allNotifications);
notificationRouter.post("/create", notificationController.createNotification);

module.exports = notificationRouter;