const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
  },
  lastName: {
    type: String,
    min: 4,
    required: true,
  },
  streetAddress: {
    type: String,
    requird: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
