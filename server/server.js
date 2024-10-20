const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth"); // Import auth routes
const ordersRoutes = require("./routes/orders"); // Import orders routes

const cors = require("cors");

// Enable CORS for all routes
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Connect to MongoDB

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

});
