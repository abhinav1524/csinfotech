const mongoose = require("mongoose");
const shopingCartSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("shopingcart", shopingCartSchema);
