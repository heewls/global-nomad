import ReservationStatus from './_components/ReservationStatus';

export default function ReservationList() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-2.5 py-2.5 md:gap-1">
        <h2 className="text-18-b">예약 내역</h2>
        <h3 className="text-14-m text-gray500">
          예약 내역 변경 및 취소할 수 있습니다.
        </h3>
      </div>
      <ReservationStatus />
    </div>
  );
}
