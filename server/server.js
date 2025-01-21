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

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/init", isAuthenticated, initRouter)
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
