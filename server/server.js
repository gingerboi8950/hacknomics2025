import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./api/expenses.js";
import userRoutes from "./api/users.js";
import auth0 from "./api/auth0/[auth0].js";

dotenv.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/auth0", auth0);


ConnectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
