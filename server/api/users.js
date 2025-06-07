import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const router = express.Router();
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
    // const hashedUsername = await bcrypt.hash(username, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      message: "Sign-up Successful",
      user: { email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({
      message: "\nFailed to sign up, Error: ",
      error: error.message + "\n",
    });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Compare password with hashed password
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "\nInvalid password.\n" });
    }

    res.json({ message: "Login Successful" });
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
