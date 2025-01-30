require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const isAuthenticated = require("./middlewares/Auth");
const db = require("./db");
const authRouter = require("./modules/auth/router");
const errorHandler = require("./middlewares/ErrorHandler");
const initRouter = require("./modules/init/router");
const masterRouter = require("./modules/masters/router");
const notificationRouter = require("./modules/notification/router");
const doctorRouter = require("./modules/doctor/router");
const paymentServicesRouter = require("./modules/paymentServices/router");
const commonRouter = require("./modules/common/router");
const sponsorRouter = require("./modules/sponsor/router");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/common", commonRouter);
app.use("/init", isAuthenticated, initRouter)
app.use("/notification", isAuthenticated, notificationRouter)
app.use("/masters", isAuthenticated, masterRouter)
app.use("/doctor", isAuthenticated, doctorRouter);
app.use("/paymentServices", isAuthenticated, paymentServicesRouter);
app.use("/sponsor", isAuthenticated, sponsorRouter);
app.use(errorHandler);

const startServer = async () => {
  try {
    await db.query("SELECT 1"); // A simple query to test if DB is connected
    console.log("MYSQL Database connected successfully.");
    server.listen(port, () => {
      console.log("Server running on port --> " + port);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

startServer();
