const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "university",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("department", departmentSchema);
