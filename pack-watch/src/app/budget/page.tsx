"use client"

import { useState } from "react"

export default function BudgetPage() {
  const [budget, setBudget] = useState(1000)
  const [spent, setSpent] = useState(350)

  const remaining = budget - spent

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Budget Overview</h1>

      <div className="border rounded p-4 shadow mb-4">
        <p className="text-lg">
          <strong>Total Budget:</strong> ${budget}
        </p>
        <p className="text-lg text-red-500">
          <strong>Spent:</strong> ${spent}
        </p>
        <p className="text-lg text-green-600">
          <strong>Remaining:</strong> ${remaining}
        </p>
      </div>
    </div>
  )
}
