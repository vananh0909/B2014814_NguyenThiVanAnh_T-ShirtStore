const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  status: {
    type: Boolean,
    default: false
  }
});
const Cart = mongoose.model("Cart", CartItemSchema);

module.exports = Cart;
