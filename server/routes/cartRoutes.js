const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected Routes
router.post("/", protect, addProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;