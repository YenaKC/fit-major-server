const router = require("express").Router();
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const isAuthenticated = require("../middleware/isAuthenticated");

// Get user's cart
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.payload._id}).populate("items.product");
        
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

module.exports = router;