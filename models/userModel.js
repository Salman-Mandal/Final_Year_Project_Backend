const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    unique: true,
    required: true,
  },
  fullname: {
    type: String,
    required: [true, "Please enter your full name"],
    maxLength: [30, "Full name cannot exceed 30 characters"],
    minLength: [4, "Full name should have at least 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  mobileno: {
    type: Number,
    // Add any specific validation rules for mobile number if needed
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be at least 4 characters long"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hash Password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Jwt token
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Password checking
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
