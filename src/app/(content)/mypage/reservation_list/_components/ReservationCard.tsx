import Link from 'next/link';
import Image from 'next/image';
import { Reservation } from '@/types/reservation';
import StatusBadge from './StatusBadge';

export default function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}) {
  if (!reservation) return null;

  return (
    <Link
      href={`/activity/${reservation.activity.id}`}
      className="shadow-2 relative flex h-fit w-full rounded-3xl"
    >
      <div className="z-1 mr-24.5 flex h-34 w-full flex-col gap-2 rounded-3xl bg-white p-5 md:mr-29 lg:mr-39 lg:h-45">
        <div className="flex flex-col gap-2 lg:gap-3">
          <StatusBadge status={reservation.status} />
          <div className="flex flex-col gap-1">
            <span className="text-14-b lg:text-18-b">
              {reservation.activity.title}
            </span>
            <div className="text-gray500 text-13-m lg:text-16-m flex gap-2">
              <span>{reservation.date}</span>
              <span>∙</span>
              <span>
                {reservation.startTime} - {reservation.endTime}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-16-b">₩ {reservation.totalPrice}</span>
          <span className="text-14-m text-gray400">
            {reservation.headCount}명
          </span>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-fit w-fit">
        <div className="relative h-34 w-34 overflow-hidden rounded-tr-3xl rounded-br-3xl lg:h-45 lg:w-45">
          <Image
            fill
            src={reservation.activity.bannerImageUrl}
            alt="reservation image"
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
}
