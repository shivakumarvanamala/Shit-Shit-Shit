const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // Import the Order model

// POST route to create a new order
router.post("/", async (req, res) => {
  try {
    const { vehicleModel, mobile, pickupAddress, pickupDate, returnDate } =
      req.body;

    // Validation - Ensure all fields are provided
    if (!pickupAddress || !pickupDate || !returnDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new order
    const newOrder = new Order({
      vehicleModel,
      mobile,
      pickupAddress,
      pickupDate,
      returnDate,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with success message and saved order data
    res.status(201).json({
      message: "Order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Server error, could not save the order." });
  }
});

module.exports = router;
