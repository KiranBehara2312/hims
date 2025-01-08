const express = require("express");
const User = require("../../models/User");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");



authRoutes.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Bad Request, missing information" });
    }
    const user = await User.findOne({ userName: userName.toUpperCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found...!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        colorTheme: user.colorTheme,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRoutes.post("/register", async (req, res) => {
  const { password, firstName, lastName, contactNumber } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ contactNumber }],
    });
    let totalDocuments = (await User.countDocuments()) ?? 0;
    if (totalDocuments === 0) {
      totalDocuments = totalDocuments + 1;
    }
    const userName = `S${totalDocuments.toString().padStart(4, "0")}`;
    if (existingUser) {
      return res.status(400).json({
        message: "Already registered, please login to proceed.",
      });
    }

    // Create a new user instance
    const newUser = new User({
      password,
      firstName,
      lastName,
      userName,
      contactNumber,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userName,
      firstName,
      lastName,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

module.exports = authRoutes;
