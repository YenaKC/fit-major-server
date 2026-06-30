// After the payment in Stripe, order will be realised.
const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                },

                quantity: Number,
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Paid", "Cancelled"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Order", orderSchema);