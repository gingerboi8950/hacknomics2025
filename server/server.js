import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
const app = express();

async function ConnectToDB() {
  try {
    console.log("\nConnecting to MongoDB...\n");
    await mongoose.connect(DB_URI, { dbName: "ExpenseTrackerDB" });
    console.log("\nConnected to MongoDB sucessfully.\n");
  } catch (error) {
    console.error("\nConnection to MongoDB failed!\n", error);
    process.exit();
  }
}

ConnectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
