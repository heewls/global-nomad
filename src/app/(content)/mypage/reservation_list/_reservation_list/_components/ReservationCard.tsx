import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/button';
import StatusBadge from './StatusBadge';
import { Reservation, TReservationStatus } from '@/types/reservation';

export default function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}) {
  if (!reservation) return null;

  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/activity/${reservation.activity.id}`}
        className="shadow-2 relative flex h-fit w-full rounded-3xl"
      >
        <div className="z-1 mr-24.5 flex h-34 w-full flex-col gap-2 rounded-3xl bg-white p-5 md:mr-29 lg:mr-39 lg:h-45 lg:rounded-4xl lg:px-10 lg:py-7.5">
          <div className="flex flex-col gap-2 lg:gap-3">
            <StatusBadge status={reservation.status} />
            <div className="flex flex-col gap-1 lg:gap-2.5">
              <span className="text-14-b lg:text-18-b leading-4 lg:leading-5">
                {reservation.activity.title}
              </span>
              <div className="text-gray500 text-13-m lg:text-16-m flex h-fit gap-2 leading-4 lg:leading-5">
                <span>{reservation.date}</span>
                <span>∙</span>
                <span>
                  {reservation.startTime} - {reservation.endTime}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex h-5 items-center gap-1">
              <span className="text-16-b leading-5">
                ₩ {reservation.totalPrice}
              </span>
              <span className="text-14-m text-gray400">
                {reservation.headCount}명
              </span>
            </div>
            <div className="hidden lg:block">
              <StatusButton status={reservation.status} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-fit w-fit">
          <div className="relative h-34 w-34 overflow-hidden rounded-tr-3xl rounded-br-3xl lg:h-45 lg:w-45 lg:rounded-tr-4xl">
            <Image
              fill
              src={reservation.activity.bannerImageUrl}
              alt="reservation image"
              className="object-cover"
            />
          </div>
        </div>
      </Link>
      <div className="lg:hidden">
        <StatusButton status={reservation.status} />
      </div>
    </div>
  );
}

function StatusButton({ status }: { status: TReservationStatus }) {
  if (status === 'pending')
    return (
      <div className="flex w-full gap-3 lg:w-fit">
        <Button
          variant="outline"
          height="40"
          rounded="8"
          fontSize="14-m"
          className="flex-1 lg:h-[29px]! lg:w-17.5 lg:flex-none"
        >
          예약 변경
        </Button>
        <Button
          variant="outline"
          height="40"
          rounded="8"
          fontSize="14-m"
          className="bg-gray50! flex-1 border-none lg:h-[29px]! lg:w-17.5 lg:flex-none"
        >
          예약 취소
        </Button>
      </div>
    );

  if (status === 'completed')
    return (
      <Button
        variant="primary"
        height="40"
        rounded="8"
        fontSize="14-m"
        className="w-full lg:h-[29px]! lg:w-17.5"
      >
        후기 작성
      </Button>
    );
}
