// const express = require("express");
// const connectDB = require("./db");
// const cors = require("cors");
// const routes = require("./routes");
// const socketIo = require("socket.io");
// const bodyParser = require("body-parser");
// const isAuthenticated = require("./middlewares/Auth");
// const authRoutes = require("./modules/auth/routes");
// const masterRoutes = require("./modules/masters/routes");
// const doctorRoutes = require("./modules/doctor/routes");
// const registrationRoutes = require("./modules/registration/routes");
// const paymentLedgerRoutes = require("./modules/paymentledger/routes");
// const patientRoutes = require("./modules/patients/routes");
// const appointmentRoutes = require("./modules/appointment/routes");
// const paymentRoutes = require("./modules/payment/routes");
// const dummyRoutes = require("./modules/Dummy/routes");

// const app = express();
// const port = process.env.PORT || 3000;
// const io = socketIo(app);

// app.use(cors());
// app.use(bodyParser.json());
// // Use the routes
// app.use("/auth", authRoutes);
// app.use("/dummy", dummyRoutes);
// app.use("/masters", isAuthenticated, masterRoutes);
// app.use("/doctor", isAuthenticated, doctorRoutes);
// app.use("/appointment", isAuthenticated, appointmentRoutes);
// app.use("/registration", isAuthenticated, registrationRoutes);
// app.use("/paymentledger", isAuthenticated, paymentLedgerRoutes);
// app.use("/patients", isAuthenticated, patientRoutes);
// app.use("/payment", isAuthenticated, paymentRoutes);
// app.use("/api", isAuthenticated, routes);

// setInterval(() => {
//   notificationCount += Math.floor(Math.random() * 3); // Randomly increment the notification count
//   io.emit("notificationCount", notificationCount);
// }, 2000);

// // Start the server after MongoDB connection is established
// const startServer = async () => {
//   try {
//     await connectDB(); // Wait for DB connection
//     app.listen(port, () => {
//       console.log("Server running on port --> " + port);
//     });
//   } catch (err) {
//     console.error("Error starting the server:", err.message);
//   }
// };

// startServer();

const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const routes = require("./routes");
const socketIo = require("socket.io");
const http = require("http");
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
const notificationRoutes = require("./modules/Notification/routes");
const Notifications = require("./models/Notification");

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow connection from React app running on port 3000
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow credentials (cookies, sessions) if needed
  },
});

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
app.use("/notifications", isAuthenticated, notificationRoutes);
app.use("/api", isAuthenticated, routes);

// //Notification count logic (emits notification count every 10 seconds)
// setInterval(async () => {
//   const totalCount = (await Notifications.countDocuments()) ?? 0;
//   io.emit("notificationCount", totalCount);
// }, 10 * 1000);

// Start the server after MongoDB connection is established
const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log("Server running on port --> " + port);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

startServer();
