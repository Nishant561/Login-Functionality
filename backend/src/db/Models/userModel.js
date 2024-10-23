const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: [true, "Username should be unique."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: [true, "User with this email already exists."],
    },
    password: {
      type: String,
      required: [true, "Password field is required."],

      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
