const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    toLowerCase: true,
  },
  role: {
    type: String,
    default: "User",
    enum: {
      values: ["User", "Admin"],
      message: "Only User or Admin are approved roles",
    },
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
