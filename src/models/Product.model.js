const { Schema, model } = require("mongoose");
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: [
                "Oversized T-Shirt",
                "Compression Shirt",
                "Shorts",
                "Leggings",
                "Sports Bra",
                "Hoodie",
                "Accessories",
            ],
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        stock: {
            type: Number,
            default: 0,
        },

        image: {
            type: String,
        },

        sizes: [
            {
                type: String,
                enum: ["XS", "S", "M", "L", "XL"],
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Product", productSchema)