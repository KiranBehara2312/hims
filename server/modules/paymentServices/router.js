const express = require("express");
const paymentServicesRouter = express.Router();
const paymenServiceController = require("./Controller");

paymentServicesRouter.post(
  "/registrationServices",
  paymenServiceController.registrationServicesNew
);
paymentServicesRouter.post(
  "/search",
  paymenServiceController.searchPaymentService
);
paymentServicesRouter.post("/add", paymenServiceController.addPaymentService);

module.exports = paymentServicesRouter;
