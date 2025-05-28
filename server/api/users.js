import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const router = express.Router();
router.post("/", async (req, res) => {
  console.log("Request hit the route");
  try {
    const { username, password } = req.body;
    const prevUser = await User.findOne({ username });

    if (prevUser) {
      return res
        .status(400)
        .json({ message: "An account with that email already exists." });
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // const hashedUsername = await bcrypt.hash(username, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      message: "Sign-up Successful",
      user: { username },
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
    const { username, password } = req.body;
    const prevUser = await User.findOne({ username });
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch | !user) {
      return res
        .status(400)
        .json({ message: "\nInvalid username or password.\n" });
    }

    res.join({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
