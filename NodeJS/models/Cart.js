const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  products: [productSchema], // Array of products
  agency: {
    type:String
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { cartSchema, Cart };
