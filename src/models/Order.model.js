// After the payment in Stripe, order will be realised.
const { Schema, model } = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");

const orderSchema = new Schema(
    {
        // who ordered
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // which product/how many product did the user purchase
        items: [{

            product:
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required:true
            },

        }],

        // Total Price that the user purchased
        totalPrice: {
            type: Number,
            required: true
        },

        // Order state
        status: {
            type: String,
            enum: ["Pending", "Paid", "Processing", "Shipped", "Cancelled"],
            default: "Pending",
        }
    },
    {
        // Create/modificated time
        timestamps: true,
    });

module.exports = model("Order", orderSchema);