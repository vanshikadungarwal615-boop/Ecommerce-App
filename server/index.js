const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


// Load environment variables
dotenv.config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


// Import Authentication Middleware
const protect = require("./middleware/authMiddleware");


// API Routes

// Authentication
app.use("/api/auth", authRoutes);


// Product Management
app.use("/api/products", productRoutes);


// Cart Management
app.use("/api/cart", cartRoutes);


// Order Management
app.use("/api/orders", orderRoutes);



// Home Route
app.get("/", (req, res) => {

    res.send("E-Commerce API Running Successfully");

});



// Protected Profile Route
app.get("/api/profile", protect, (req, res) => {

    res.status(200).json({

        message: "Welcome to your profile",

        user: req.user

    });

});



// MongoDB Connection

mongoose
.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected Successfully");


    const PORT = process.env.PORT || 5000;


    app.listen(PORT, () => {

        console.log(`Server Running on Port ${PORT}`);

    });


})
.catch((error) => {

    console.log("MongoDB Connection Error:", error);

});