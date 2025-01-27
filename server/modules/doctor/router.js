const express = require('express');
const doctorController = require("./Controller")
const doctorRouter = express.Router();

doctorRouter.post("/upsert", doctorController.upsertDoc);
doctorRouter.post("/all", doctorController.getAllDocs);


module.exports = doctorRouter;