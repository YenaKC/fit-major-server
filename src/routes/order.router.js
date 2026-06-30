const router = require("express").Router();

const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");

const isAuthenticated = require("../middleware/isAuthenticated");

// Create order from cart
router.post("/", isAuthenticated, async (req, res, next) => {
    try {

        // Find cart of the user loggined
        const cart = await Cart.findOne({ user: req.payload._id }).populate("items.product");

        // If the cart is empty, not permitted to make an order
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty.",
            });
        }

        // Calculate total price with the product's price multiplied the quantity.
        const totalPrice = cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);

        // Save the order
        const order = await Order.create({
            user: req.payload._id,
            items: cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice,
            status: "Pending",
        });

        // After the order, empry the cart.
        cart.items = [];
        await cart.save();

        res.status(201).json(order);

    } catch (error) {
        next(error);
    }
});

// Get all orders of logged-in user
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.payload._id
        }).populate("items.product");

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

// Get one order
router.get("/:orderId", isAuthenticated, async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId).populate("items.product");

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
});

// Update status after making an order
// Reception of PUT
router.put("/:orderId/status", isAuthenticated, async(req, res, next) => {
    // Finding the order in MongoDB
    const order = await Order.findById(req.params.orderId);

    // Finding the order 
    order.status = req.body.status;

    await order.save();

    res.json(order);
});

module.exports = router;