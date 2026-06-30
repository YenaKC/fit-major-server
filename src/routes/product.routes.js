const router = require("express").Router();
const Product = require("../models/Product.model");

// Get all products
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// Create product
router.post("/", async (req, res, next) => {
    try {
        const  { name, description, category, price, stock, image, sizes } = req.body;

        if (!name || !description || !category || !price) {
            return res.status(400).json({
                message: "Provice name, description, category and price.",
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            category,
            price,
            stock,
            image,
            sizes,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

// Get One
router.get("/:productId", async(req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// Put
router.put("/:productId", async(req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );

         res.status(200).json(updatedProduct)
    } catch (error) {
        next(error);
    }
});

// Delete
router.delete("/:productId", async(req, res, next) => {
    try {
        await Product.findByIdAndDelete(
            req.params.productId
        );

        res.json({
            message:"Product deleted"
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;