const mongoose = require("mongoose");
const validator = require("validator");
const orderSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  productId: {
    type: "String",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    //required: true,
  },
  shippingAddress: {
    type: String,
    //required: true,
  },
  customerName: {
    type: String,
  },
  customerContactNo: {
    type: String,
  },
  customerWalletAddress: {
    type: String,
  },
  size: {
    type: String,
    //required: true,
  },
  quantity: {
    type: Number,
    //required: true,
  },
  unitSalePrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalBill: {
    type: Number,
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
  },
  completed: {
    type: Boolean,
  },
});
const Order = new mongoose.model("Orders", orderSchema);
module.exports = Order;
