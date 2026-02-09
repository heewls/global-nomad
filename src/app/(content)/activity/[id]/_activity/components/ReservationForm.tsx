'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/button';
import Calendar from '@/components/calendar';
import { MobileParticipant, Participant } from './compound/ReservationCompound';
import { ActivityDetail } from '@/types/activities';
import Close from '@/assets/icons/x.svg';

export function ReservationForm({
  detail,
  isOwner,
}: {
  detail: ActivityDetail;
  isOwner?: boolean;
}) {
  const router = useRouter();

  if (isOwner) return null;

  return (
    <div className="lg:border-gray100 flex w-full flex-col gap-7.5 bg-white lg:rounded-3xl lg:border lg:p-7.5">
      <div className="hidden items-center justify-between md:flex lg:hidden">
        <h3 className="text-20-b">날짜</h3>
        <button onClick={() => router.back()}>
          <Close className="h-6 w-6 shrink-0" />
        </button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row lg:flex-col">
        <span className="text-24-b hidden items-center gap-1.5 lg:flex">
          ₩ {detail.price.toLocaleString()}
          <span className="text-gray400 text-20-m">/인</span>
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between md:hidden lg:flex">
            <h3 className="text-18-b md:text-20-b lg:text-16-b flex w-full items-start">
              날짜
            </h3>
            <button className="block lg:hidden" onClick={() => router.back()}>
              <Close className="h-6 w-6 shrink-0" />
            </button>
          </div>
          <div className="h-92 w-full md:h-123 md:w-90 lg:h-92 lg:w-87.5">
            <Calendar onSelect={() => {}} height="100%" />
          </div>
        </div>

        <div className="md:shadow-card flex flex-1 md:flex-col md:gap-9 md:rounded-3xl md:px-6 md:py-7.5 lg:gap-6 lg:p-0 lg:shadow-none">
          <div className="flex w-full flex-col gap-3.5 md:gap-5">
            <h3 className="text-16-b">예약 가능한 시간</h3>
            <div className="scrollbar-hidden flex max-h-61 flex-col gap-3 overflow-scroll">
              {detail.schedules.map((schedule) => (
                <button
                  key={schedule.id}
                  className="border-gray300 text-14-m h-13 w-full shrink-0 cursor-pointer rounded-xl border bg-white"
                >
                  {schedule.startTime}~{schedule.endTime}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Participant />
          </div>
        </div>
      </div>
      <div className="flex md:hidden">
        <MobileParticipant />
      </div>
      <div className="border-t-gray100 hidden items-center justify-between border-t pt-5 pb-2.5 lg:flex">
        <span className="flex gap-1.5">
          총 합계 <span>₩ {detail.price.toLocaleString()}</span>
        </span>
        <Button
          variant="primary"
          height="50"
          rounded="14"
          fontSize="16-b"
          className="w-34"
        >
          예약하기
        </Button>
      </div>
      <Button
        variant="primary"
        height="50"
        rounded="14"
        fontSize="16-b"
        className="w-full lg:hidden"
      >
        확인
      </Button>
    </div>
  );
}
