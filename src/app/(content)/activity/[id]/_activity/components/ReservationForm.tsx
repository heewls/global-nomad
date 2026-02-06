'use client';

import { useRouter } from 'next/navigation';
import Calendar from '@/components/calendar';
import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { ActivityDetail } from '@/types/activities';
import Close from '@/assets/icons/x.svg';

export default function ReservationForm({
  detail,
}: {
  detail: ActivityDetail;
}) {
  const router = useRouter();

  return (
    <Modal.Container
      containerClassName="h-fit w-full p-6 pb-4.5 md:px-7.5 md:pt-6 md:pb-4.5"
      placement="items-end"
    >
      <div className="flex w-full flex-col gap-7.5">
        <div className="flex items-center justify-between">
          <h3 className="flex w-full items-start">날짜</h3>
          <button onClick={() => router.back()}>
            <Close className="h-6 w-6 shrink-0" />
          </button>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-81 md:h-123 md:w-90">
            <Calendar onSelect={() => {}} height="100%" />
          </div>
          <div className="md:shadow-card flex flex-1 flex-col gap-3.5 md:rounded-3xl md:px-6 md:py-7.5">
            <h3 className="text-16-b">예약 가능한 시간</h3>
            <div className="flex flex-col gap-3">
              {detail.schedules.map((schedule) => (
                <button
                  key={schedule.id}
                  className="border-gray300 text-14-m h-13 w-full cursor-pointer rounded-xl border bg-white"
                >
                  {schedule.startTime}~{schedule.endTime}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          height="50"
          rounded="14"
          fontSize="16-b"
          className="w-full"
        >
          확인
        </Button>
      </div>
    </Modal.Container>
  );
}
