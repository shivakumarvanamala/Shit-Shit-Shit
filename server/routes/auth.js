const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Import User model
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password, address, mobile } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the additional fields
    const user = new User({
      username,
      email,
      password: hashedPassword,
      address,
      mobile,
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully!", username: user.username });
  } catch (error) {
    console.error("Error in signup process:", error); // Log backend error
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Sign In route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // If valid, send response with user data
    res.status(200).json({ message: "Sign-in successful!", username: user.username });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Error signing in." });
  }
});

module.exports = router;
