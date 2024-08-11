const mongoose = require("mongoose");
const validator = require("validator");
//const { UUID } = Realm.BSON;
const productSchema = new mongoose.Schema({
  // id: new UUID(),
  //_id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    //required: true,
  },
  size: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
  },
  left: {
    type: Number,
    //required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  // pictures: [],
  image: {
    type: String, // Store the image path
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Product = new mongoose.model("Products", productSchema);
module.exports = Product;

//presave hook
//onUpdate hook
