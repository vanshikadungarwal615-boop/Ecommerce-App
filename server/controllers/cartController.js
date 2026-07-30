const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product To Cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const userId = req.user.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        let cartItem = await Cart.findOne({
            user: userId,
            product: productId
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                user: userId,
                product: productId,
                quantity
            });
        }

        res.status(201).json({
            message: "Product Added To Cart",
            cartItem
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// View Cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.find({
            user: userId
        }).populate("product");

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            user: req.user.id,
            product: req.params.productId
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart Item Not Found"
            });
        }

        cartItem.quantity = req.body.quantity;

        await cartItem.save();

        res.status(200).json({
            message: "Cart Updated Successfully",
            cartItem
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart Item Not Found"
            });
        }

        await cartItem.deleteOne();

        res.status(200).json({
            message: "Product Removed From Cart"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};// Remove Product From Cart


   

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
};