"use client"

import { useEffect, useState } from "react"
import data from "../dashboard/data.json"
import { DataTable } from "@/components/data-table"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Columns } from "lucide-react"

export default function ExpensesPage() {
  const [timeRange, setTimeRange] = useState("90d")
  const [sortField, setSortField] = useState("date")
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    const referenceDate = new Date("2025-06-30") // Change to new Date() for real-time
    let daysToSubtract = 90

    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    const updated = data.filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate && itemDate <= referenceDate
    })

    setFilteredData(sortByField(updated, sortField))
  }, [timeRange, sortField])

  function sortByField(dataArray: any[], field: string) {
    return [...dataArray].sort((a, b) => {
      if (field === "price") return parseFloat(b.price) - parseFloat(a.price)
      if (field === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      return a[field].localeCompare(b[field])
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={(val) => val && setTimeRange(val)}
        >
          <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
          <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
          <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
        </ToggleGroup>

        <Select value={sortField} onValueChange={setSortField}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Sort by Expense</SelectItem>
            <SelectItem value="category">Sort by Category</SelectItem>
            <SelectItem value="price">Sort by Price</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable 
      data={filteredData} />
    </div>
  )
}
