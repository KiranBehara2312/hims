const express = require("express");
const sponsorRouter = express.Router();
const sponsorController = require("./Controller");

sponsorRouter.post(
  "/sponsorBySponsorGroup",
  sponsorController.sponsorBySponsorGroupId
);

module.exports = sponsorRouter;
