const mongoose = require("mongoose");
const validator = require("validator");
const deliverySchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
  },
});
const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;
