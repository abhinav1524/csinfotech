const mongoose = require("mongoose");
const orderDetails = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  ],
  count: Number,
  totalAmount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("order", orderDetails);
