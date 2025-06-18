import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config(); // make sure you have this

const router = express.Router();

// Sign-up route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const prevUser = await User.findOne({ email });

    if (prevUser) {
      return res
        .status(400)
        .json({ message: "An account with that email already exists." });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { //JWT Token 
      expiresIn: "1h",
    });

    res.json({
      message: "Sign-up Successful",
      user: { email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to sign up",
      error: error.message,
    });
    console.log(error);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { // JWT Token
      expiresIn: "1h",
    });

    res.json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
