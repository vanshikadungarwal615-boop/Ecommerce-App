const Product = require("../models/Product");

// Add Product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        res.status(201).json({
            message: "Product Added Successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product Updated Successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};