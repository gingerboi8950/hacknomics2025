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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId });

    const formattedExpenses = expenses.map((expenses) => ({
      ...expenses.toObject(),
      date: new Date(expenses.date).toLocaleDateString("en-US"),
    }));

    res.json(formattedExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
