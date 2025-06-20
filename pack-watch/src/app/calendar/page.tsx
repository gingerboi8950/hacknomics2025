'use client';

import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventClickArg } from '@fullcalendar/core'

import data from '../dashboard/data.json'

type Expense = {
  id: number;
  expense: string;
  date: string;
  category: string;
  price: string;
};

export default function DateCalendarValue() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs('2025-06-01'));
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(null);

  // Format selected date to match the format in data.json
  const formattedDate = selectedDate?.format('YYYY-MM-DD');

  // Filter expenses by selected date
  const filteredExpenses = data.filter((item) => item.date === formattedDate);
  

  // Map data to calendar events
  const events = data.map((item) => ({
    id: item.id.toString(),
    title: item.expense,
    date: item.date,
  }));

  // Handle clicking on a calendar day
  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(dayjs(arg.dateStr));
    setSelectedExpense(null); // Clear selected expense if any
  };

  // Handle clicking on an event (expense)
  const handleEventClick = (arg: EventClickArg) => {
  const clickedId = arg.event.id;
  const foundExpense = data.find((item) => item.id.toString() === clickedId);
  if (foundExpense) {
    setSelectedExpense(foundExpense);
  }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Calendar</h1>

          <div className="w-full max-w-4xl">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="auto"
            />
          </div>
        </div>

        {selectedExpense && (
          <div className="mt-2 mb-4 w-full max-w-md mx-auto border p-4 rounded shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Selected Expense Details
            </h2>
            <p><strong>Expense:</strong> {selectedExpense.expense}</p>
            <p><strong>Category:</strong> {selectedExpense.category}</p>
            <p><strong>Date:</strong> {selectedExpense.date}</p>
            <p><strong>Price:</strong> ${selectedExpense.price}</p>
          </div>
        )}

        {!selectedExpense && (
          <div className="mt-2 mb-4 w-full max-w-md mx-auto">
            {data.filter((item) => item.date === formattedDate).length === 0 ? (
              <p className="text-muted text-center">No expenses for this date.</p>
            ) : (
              <ul className="flex flex-wrap justify-center gap-4">
                {data
                  .filter((item) => item.date === formattedDate)
                  .map((expense) => (
                    <li
                      key={expense.id}
                      className="border p-2 rounded shadow-sm bg-white w-[250px]"
                    >
                      <div><strong>Expense:</strong> {expense.expense}</div>
                      <div><strong>Category:</strong> {expense.category}</div>
                      <div><strong>Price:</strong> ${expense.price}</div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}