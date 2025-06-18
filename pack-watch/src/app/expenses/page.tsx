"use client"

import { useState } from "react"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", amount: 50 },
    { id: 2, name: "Electric Bill", amount: 120 },
    { id: 3, name: "Subscription", amount: 10 },
  ])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses Page</h1>

      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li key={expense.id} className="border p-4 rounded shadow">
            <div className="text-lg font-semibold">{expense.name}</div>
            <div className="text-sm text-gray-500">${expense.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
