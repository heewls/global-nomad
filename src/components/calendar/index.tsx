import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({
  onSelect,
  height,
}: {
  onSelect: (date: string) => void;
  height: 'auto' | '100%' | string;
}) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dayHeaderFormat={{ weekday: 'narrow' }}
      select={(date) => onSelect(date.startStr)}
      headerToolbar={{ left: 'title', center: '', right: 'prev,next' }}
      selectAllow={(selectInfo) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectInfo.start >= today;
      }}
      height={height}
      editable={false}
      selectable={true}
      unselectAuto={false}
      dayMaxEvents={false}
      fixedWeekCount={false}
    />
  );
}
