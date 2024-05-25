const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  images: {
    type: [String],
    required: true,
  },
});
module.exports = mongoose.model("product", productSchema);
