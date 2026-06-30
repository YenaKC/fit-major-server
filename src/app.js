// Bring library
const express = require("express");
const cors = require("cors");

// Bring files
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

// Create Express App
const app = express();

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173"],
    })
);

app.use(express.json());

// Route
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Fit Major API is running" });
});


// Export
module.exports = app;