const express = require("express");

const router = express.Router();


const {

    placeOrder,

    getMyOrders,

    getAllOrders,

    updateOrderStatus

} = require("../controllers/orderController");



const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");




// User: Place Order
router.post(
    "/",
    protect,
    placeOrder
);



// User: View Own Orders
router.get(
    "/myorders",
    protect,
    getMyOrders
);



// Admin: View All Orders
router.get(
    "/",
    protect,
    admin,
    getAllOrders
);



// Admin: Update Order Status
router.put(
    "/:id",
    protect,
    admin,
    updateOrderStatus
);



module.exports = router;