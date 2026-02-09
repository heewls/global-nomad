'use client';

import './calendar.css';
import './reservationCalendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface ReservationCalendarProps {
  onSelect: (date: string) => void;
  availableDates: string[];
  selectedDate: string;
  height?: string;
}

export default function ReservationCalendar({
  onSelect,
  availableDates,
  selectedDate,
  height = '100%',
}: ReservationCalendarProps) {
  const today = new Date().toLocaleDateString('en-CA');

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dayHeaderFormat={{ weekday: 'narrow' }}
      headerToolbar={{ left: 'title', center: '', right: 'prev,next' }}
      dayCellClassNames={(d) => {
        const dateStr = d.date.toLocaleDateString('en-CA');
        const isAvailable = availableDates.includes(dateStr);
        const isSelected = selectedDate === dateStr;
        const isToday = dateStr === today;

        const classArr = [];

        if (isSelected) classArr.push('is-selected');

        if (isAvailable) {
          classArr.push('is-available');
        } else if (!isToday) {
          classArr.push('is-disabled');
        }

        return classArr;
      }}
      dateClick={(info) => {
        if (availableDates.includes(info.dateStr)) {
          onSelect(info.dateStr);
        }
      }}
      selectAllow={(selectInfo) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectInfo.start >= today;
      }}
      height={height}
      fixedWeekCount={false}
      editable={false}
      selectable={false}
    />
  );
}
