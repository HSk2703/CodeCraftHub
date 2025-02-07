const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// ✅ Middleware for logging requests (useful for debugging)
router.use((req, res, next) => {
    console.log(`🔍 ${req.method} request to ${req.originalUrl}`);
    next();
});

// ✅ Register a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });

    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });

    } catch (error) {
        console.error("❌ Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Update User Profile by Email (No JWT Required)
router.put("/update", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: "Profile updated successfully", user });

    } catch (error) {
        console.error("❌ Error updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Update User Profile by Username (No JWT Required)
router.put("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername, email, password } = req.body;

        console.log(`🛠 PUT request received for username: ${username}`);
        console.log(`📩 Request Body:`, req.body);

        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (newUsername) user.name = newUsername;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
