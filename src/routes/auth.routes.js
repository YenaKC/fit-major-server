// Signup -> POST /auth/signup -> Express(Server) -> MongoDB
// Manage URL that is related with auth

const router = require("express").Router(); // Create Express for auth
const User = require("../models/User.model");
// bcrypt
const bcryptjs = require("bcryptjs");
const { json } = require("express");
// JWT
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");

// Create new user
router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Provide username, email and password."
            });
        }

        // Find same email/username's user
        const foundUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        // Before User.create(), if exists same user, no create user's information to avoid the duplication.
        if (foundUser) {
            return res.status(400).json({
                message: "Username or email already exists."
            });
        }

        // Hash
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        next(error);
    }
});


// Login
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Provide email and password.",
            });
        }

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const isPasswordCorrect = bcryptjs.compareSync(
            password,
            foundUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Changed Login response
        const payload = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
        };

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { expiresIn: "6h"}
        );

        res.status(200).json({
            authToken,
        });
    } catch (error) {
        next(error);
    }
});


// Verify
router.get("/verify", isAuthenticated, (req, res) => {
    res.status(200).json(req.payload);
})

module.exports = router;