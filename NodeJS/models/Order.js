const mongoose = require("mongoose");
const { cartSchema } = require("./Cart");

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

  const orderSchema = new mongoose.Schema({
    products: cartSchema, // Array of products
    totalProducts: {
      type: Number,
      default: function () {
        // Calculate the total products when a new order is created
        return this.products.reduce((total, product) => total + product.quantity, 0);
      },
    },
    totalPrice: {
      type: Number,
      default: function () {
        // Calculate the total price when a new order is created
        return this.products.reduce((total, product) => total + product.quantity * product.price, 0);
      },
    },
  });
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;