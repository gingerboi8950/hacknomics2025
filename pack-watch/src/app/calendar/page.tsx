'use client';

import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

import data from '../dashboard/data.json';

export default function DateCalendarValue() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs('2025-06-01'));

  // Format selected date to match the format in data.json
  const formattedDate = selectedDate?.format('YYYY-MM-DD');

  // Filter expenses by selected date
  const filteredExpenses = data.filter((item) => item.date === formattedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-4 flex flex-col items-center">
        <DemoItem label="Pick a date">
          <div className="flex justify-center">
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{
                width: 400, // widen the whole calendar container
                '& .MuiPickersDay-root': {
                  fontSize: '1.25rem', // make day numbers larger
                  width: 48,
                  height: 48,
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  width: 48,
                  fontSize: '1rem',
                },
                '& .MuiTypography-root': {
                  fontSize: '1.2rem', // month/year font size
                },
                '& .MuiPickersCalendarHeader-label': {
                  fontSize: '1.5rem', // larger month label
                },
                '& .MuiPickersArrowSwitcher-root button': {
                  fontSize: '1.5rem', // larger nav arrows
                },
                '& .MuiPickersSlideTransition-root': {
                  minHeight: '320px', // optional: make sure there's enough height
                },
              }}
            />
          </div>
        </DemoItem>

        <div className="mt-4 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Expenses for {formattedDate}:
          </h2>
          {filteredExpenses.length === 0 ? (
            <p className="text-muted">No expenses for this date.</p>
          ) : (
            <ul className="space-y-2">
              {filteredExpenses.map((expense) => (
                <li key={expense.id} className="border p-2 rounded shadow-sm">
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
  );
}
