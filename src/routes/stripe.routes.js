const router = require("express").Router();
const Stripe = require("stripe");

const Cart = require("../models/Cart.model");
const isAuthenticated = require("../middleware/isAuthenticated");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", isAuthenticated, async (req, res, next) => {
    try {
        const cart = await Cart.findOne({
            user: req.payload._id,
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        const line_items = cart.items.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.product.name,
                    description: item.product.description,
                },
                unit_amount: Math.round(item.product.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.status(200).json({
            url: session.url,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;