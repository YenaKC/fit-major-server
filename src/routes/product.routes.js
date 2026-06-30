const router = require("express").Router();
const Product = require("../models/Product.model");

// Test route
router.get("/", (req, res) => {
    res.json({ message: "Product route works!" });
});

module.exports = router;