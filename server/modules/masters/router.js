const express = require('express');
const masterRouter = express.Router();
const masterController = require('./Controller')

masterRouter.post("/data", masterController.master);

module.exports = masterRouter;