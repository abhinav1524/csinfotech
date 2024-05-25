const mongoose = require("mongoose");
const orderHeaderSchema = mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now, // Use a function to get the current date/time
  },
  orderTotal: Number,
  orderStatus: String,
  paymentStatus: String,
  transcationId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
module.exports = mongoose.model("orderheader", orderHeaderSchema);
