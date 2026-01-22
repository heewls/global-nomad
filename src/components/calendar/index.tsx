import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({
  onSelect,
}: {
  onSelect: (date: string) => void;
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
      height="auto"
      editable={false}
      selectable={true}
      unselectAuto={false}
      dayMaxEvents={false}
      fixedWeekCount={false}
    />
  );
}
