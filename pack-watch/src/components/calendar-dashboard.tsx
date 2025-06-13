"use client"

import * as React from "react"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

import data from '../app/dashboard/data.json';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CalendarDashboard() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs('2025-06-01'));
  
  // Format selected date to match the format in data.json
  const formattedDate = selectedDate?.format('YYYY-MM-DD');

  // Filter expenses by selected date
  const filteredExpenses = data.filter((item) => item.date === formattedDate);

  return (
    <Card className="@container/card">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl mb-0 leading-tight">Calendar</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-1 sm:px-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="p-0 flex flex-row gap-8 items-start">
            <DemoItem>
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                sx={{
                width: 400, // widen the whole calendar container
                '& .MuiPickersDay-root': {
                  fontSize: '1.15rem', // make day numbers larger
                  width: 48,
                  height: 48,
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  width: 48,
                  fontSize: '1rem',
                },
                '& .MuiTypography-root': {
                  fontSize: '1.1rem', // month/year font size
                },
                '& .MuiPickersCalendarHeader-label': {
                  fontSize: '1.3rem', // larger month label
                },
                '& .MuiPickersArrowSwitcher-root button': {
                  fontSize: '1.3rem', // larger nav arrows
                },
                '& .MuiPickersSlideTransition-root': {
                  minHeight: '320px',
                },
              }}
              />
            </DemoItem>

            <div className="pt-0 w-full max-w-[1300px] mx-auto">
              {filteredExpenses.length === 0 ? (
                <p className="text-muted">No expenses for this date.</p>
              ) : (
                <ul className="pt-0 grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {filteredExpenses.map((expense) => (
                    <li
                      key={expense.id}
                      className="border p-2 rounded shadow-sm w-[250px]"
                    >
                      <div><strong>Expense:</strong> {expense.expense}</div>
                      <div><strong>Category:</strong> {expense.category}</div>
                      <div><strong>Price:</strong> ${expense.price}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </LocalizationProvider>

      </CardContent>
    </Card>
  )
}