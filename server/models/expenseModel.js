import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    userId: String, // foreign key that links to users
    // expenseId: String, // primary key   (I think MongoDB will create this for us.)
    tag: String,
    name: String,
    cost: Number,
    date: Date,
  },
  { collection: "expenses" }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
