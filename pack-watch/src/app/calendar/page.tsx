'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import data from '../dashboard/data.json';

export default function DateCalendarValue() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs('2025-06-01'));

  // Format selected date to match the format in data.json
  const formattedDate = selectedDate?.format('YYYY-MM-DD');

  // Filter expenses by selected date
  const filteredExpenses = data.filter((item) => item.date === formattedDate);

  // Map data to calendar events
  const events = data.map((item) => ({
    title: item.expense,
    date: item.date,
  }));

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
              dateClick={(info) => {
                setSelectedDate(dayjs(info.dateStr));
              }}
              height="auto"
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}