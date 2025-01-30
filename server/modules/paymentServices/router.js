const express = require("express");
const paymentServicesRouter = express.Router();
const paymenServiceController = require("./Controller");

paymentServicesRouter.post(
  "/registrationServices",
  paymenServiceController.registrationServices
);
paymentServicesRouter.post(
  "/search",
  paymenServiceController.searchPaymentService
);
// paymentServicesRouter.post("/create", registrationController.createNotification);

module.exports = paymentServicesRouter;
