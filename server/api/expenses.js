import express from "express";
import Expense from "../models/expenseModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { tag, name, cost, date } = req.body;
    const userId = req.user.id;
    const newExpense = await Expense.create({ userId, tag, name, cost, date });

    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
