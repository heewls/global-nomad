import ReservationStatus from './_reservation_list/_components/ReservationStatus';
import ReservationCard from './_reservation_list/_components/ReservationCard';
import NoneItem from '@/components/NoneItem';
import { getReservationList } from './_reservation_list/api';
import { ReservationListParams, TReservationStatus } from '@/types/reservation';

export default async function ReservationList({
  searchParams,
}: {
  searchParams: Promise<ReservationListParams>;
}) {
  const params = await searchParams;
  const currentStatus = params.status;

  const reservationResponse = await getReservationList({
    size: 10,
    status: (currentStatus as TReservationStatus) || undefined,
  });

  const { reservations, totalCount } = reservationResponse;

  const isReallyNoneReservations = !currentStatus && totalCount === 0;

  const isInitialEmpty = !currentStatus && reservations.length === 0;

  if (isInitialEmpty) {
    return (
      <div className="flex flex-col gap-3.5">
        <Header />
        <NoneItem page="reservation-list" lookAround />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5">
      <Header />
      {!isReallyNoneReservations && <ReservationStatus />}

      {reservations.length === 0 ? (
        <NoneItem page="reservation-list" />
      ) : (
        reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))
      )}
    </div>
  );
}
 
function Header() {
  return (
    <div className="flex flex-col gap-2.5 py-2.5 md:gap-1">
      <h2 className="text-18-b">예약 내역</h2>
      <h3 className="text-14-m text-gray500">
        예약 내역 변경 및 취소할 수 있습니다.
      </h3>
    </div>
  );
}
