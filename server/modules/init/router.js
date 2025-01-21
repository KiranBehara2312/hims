const express = require('express');
const initController = require("./Controller")
const initRouter = express.Router();

initRouter.post('/menu', initController.menu);
initRouter.post('/orgData', initController.orgData);


module.exports = initRouter;