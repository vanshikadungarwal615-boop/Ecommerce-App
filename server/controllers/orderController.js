const Order = require("../models/Order");
const Cart = require("../models/Cart");


// Place Order (User)
const placeOrder = async (req, res) => {

    try {

        const userId = req.user.id;


        // Get cart items
        const cartItems = await Cart.find({
            user: userId
        }).populate("product");


        // Check cart empty
        if (cartItems.length === 0) {

            return res.status(400).json({
                message: "Cart is Empty"
            });

        }


        // Calculate total price
        let totalPrice = 0;


        cartItems.forEach(item => {

            totalPrice += item.product.price * item.quantity;

        });



        // Prepare order items
        const orderItems = cartItems.map(item => ({

            product: item.product._id,

            quantity: item.quantity

        }));



        // Create order
        const order = await Order.create({

            user: userId,

            items: orderItems,

            totalPrice

        });



        // Clear cart after order
        await Cart.deleteMany({

            user: userId

        });



        res.status(201).json({

            message: "Order Placed Successfully",

            order

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// View My Orders (User)
const getMyOrders = async (req, res) => {

    try {


        const userId = req.user.id;



        const orders = await Order.find({

            user: userId

        })
        .populate("items.product");



        res.status(200).json({

            count: orders.length,

            orders

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};




// View All Orders (Admin)
const getAllOrders = async (req, res) => {

    try {


        const orders = await Order.find()

        .populate("user")

        .populate("items.product");



        res.status(200).json({

            count: orders.length,

            orders

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};




// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {

    try {


        const order = await Order.findById(req.params.id);



        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }



        order.status = req.body.status;



        await order.save();



        res.status(200).json({

            message: "Order Status Updated",

            order

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};





module.exports = {

    placeOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus

};