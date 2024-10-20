const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  vehicleModel: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
    trim: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
