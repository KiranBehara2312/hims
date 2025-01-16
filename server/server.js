const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const isAuthenticated = require("./middlewares/Auth");
const authRoutes = require("./modules/auth/routes");
const masterRoutes = require("./modules/masters/routes");
const doctorRoutes = require("./modules/doctor/routes");
const registrationRoutes = require("./modules/registration/routes");
const paymentLedgerRoutes = require("./modules/paymentledger/routes");
const patientRoutes = require("./modules/patients/routes");
const appointmentRoutes = require("./modules/appointment/routes");
const paymentRoutes = require("./modules/payment/routes");
const dummyRoutes = require("./modules/Dummy/routes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
// Use the routes
app.use("/auth", authRoutes);
app.use("/dummy", dummyRoutes);
app.use("/masters", isAuthenticated, masterRoutes);
app.use("/doctor", isAuthenticated, doctorRoutes);
app.use("/appointment", isAuthenticated, appointmentRoutes);
app.use("/registration", isAuthenticated, registrationRoutes);
app.use("/paymentledger", isAuthenticated, paymentLedgerRoutes);
app.use("/patients", isAuthenticated, patientRoutes);
app.use("/payment", isAuthenticated, paymentRoutes);
app.use("/api", isAuthenticated, routes);

// Start the server after MongoDB connection is established
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(port, () => {
      console.log("Server running on port --> " + port);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

startServer();
