import { TReservationStatus } from "@/types/reservation";

const STATUS_LIST = [
  { label: '예약 신청', value: 'pending', bg: '#E9FBE4', font: '#2BA90D' },
  { label: '예약 취소', value: 'canceled', bg: '#E0E0E5', font: '#707177' },
  { label: '예약 승인', value: 'confirmed', bg: '#DDF9F9', font: '#1790A0' },
  { label: '예약 거절', value: 'declined', bg: '#FCECEA', font: '#F96767' },
  { label: '체험 완료', value: 'completed', bg: '#DAF0FF', font: '#0D6CD1' },
];

export default function StatusBadge({ status }: { status: TReservationStatus }) {
  const currentStatus = STATUS_LIST.find((item) => item.value === status);

  if (!currentStatus) return null;

  return (
    <div
      className="w-fit rounded-full px-2 py-1 text-13-b"
      style={{ backgroundColor: currentStatus.bg }}
    >
      <span style={{ color: currentStatus.font }}>{currentStatus.label}</span>
    </div>
  );
}
