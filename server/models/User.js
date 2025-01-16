const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create the user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      uppercase: true,
      unique: true,
      trim: true,
      minlength: [5, "User name cannot be shorter than 6 characters"],
      maxlength: [5, "User name cannot be longer than 6 characters"],
      match: [/^[A-Z0-9]+$/, "User name must be alphanumeric"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password cannot be shorter than 10 characters"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "STAFF",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^[7-9][0-9]{9}$/, "Please enter a valid Indian phone number"],
      unique: true,
    },
    colorTheme: {
      type: String,
      default: "#0d8672",
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  const COLOR_THEME_OBJ = {
    NURSE: "#86320d",
    DOCTOR: "#860d74",
    ADMIN: "#0d6986",
    STAFF: "#0d8672",
  };
  this.colorTheme = COLOR_THEME_OBJ[this.role];

  // Only hash the password if it is modified or new
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare hashed password with the entered password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model("Users", userSchema);

module.exports = User;
