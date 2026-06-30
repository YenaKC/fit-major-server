const router = require("express").Router();
const Cart = require("../models/Cart.model");
const isAuthenticated = require("../middleware/isAuthenticated");

// Get user's cart
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        // Find the cart of the user who is loggedIn in JWT
        const cart = await Cart.findOne({ user: req.payload._id }).populate("items.product");

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

// Add the product to the cart
router.post("/add", isAuthenticated, async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({
            user: req.payload._id
        });

        // If the cart doesn't exist, create a new cart
        if (!cart) {

            cart = await Cart.create({
                user: req.payload._id,
                items: []
            });

        }

        // Check the product that already is in the cart. If it is, add more quantity, if not, push the new item.
        const itemIndex = cart.items.findIndex(
            item =>
                item.product.toString() === productId
        );

        if (itemIndex > -1) {

            cart.items[itemIndex].quantity += quantity;
        } else {

            cart.items.push({
                product: productId,
                quantity
            });
        }

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        next(error);
    }
});

// Change the quantity of the correspondient item
router.put("/item/:productId",
    isAuthenticated,
    async (req, res, next) => {
        try {

            const cart = await Cart.findOne({
                user: req.payload._id
            });

            const item = cart.items.find(
                i => i.product.toString() === req.params.productId
            );

            if (item) {
                item.quantity = req.body.quantity;
            }

            await cart.save();
            res.json(cart);

        } catch (error) {
            next(error);
        }
    });

// Eliminate the correspondient item in the cart
router.delete(
    "/item/:productId",
    isAuthenticated,
    async (req, res, next) => {
        try {
            const cart = await Cart.findOne({
                user: req.payload._id
            });

            cart.items = cart.items.filter(
                item =>
                    item.product.toString() !== req.params.productId
            );

            await cart.save();

            res.json(cart);

        } catch (error) {
            next(error);
        }
    }

)


module.exports = router;