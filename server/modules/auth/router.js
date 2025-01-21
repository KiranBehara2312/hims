const express = require('express');
const authController = require('./Controller');

const authRouter = express.Router();

// Login a user
authRouter.post('/login', authController.login);
authRouter.post('/createUser', authController.register);


module.exports = authRouter;