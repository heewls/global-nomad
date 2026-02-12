'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Button from '@/components/common/button';
import AlertModal from '@/components/modals/AlertModal';
import BouncingDots from '@/components/common/loading/BouncingDots';
import ReservationCalendar from '@/components/calendar/ReservationCalendar';
import { MobileParticipant, Participant } from './ReservationCompound';
import useModalStore from '@/store/modal';
import useReservation from '../hook/useReservation';
import { ActivityDetail } from '@/types/activities';
import Close from '@/assets/icons/x.svg';

export default function ReservationForm({
  detail,
  isOwner,
}: {
  detail: ActivityDetail;
  isOwner?: boolean;
}) {
  const router = useRouter();
  const { close } = useModalStore();

  const {
    isNext,
    isLoading,
    isValidTime,
    scheduleId,
    selectedDate,
    availableDates,
    filteredSchedules,
    setSelectedDate,
    handlePutInScheduleId,
    handleNextPage,
    handleReservationSubmit,
  } = useReservation(detail);

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
            <ReservationCalendar
              onSelect={setSelectedDate}
              availableDates={availableDates}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        <div className="md:shadow-card flex flex-1 md:flex-col md:gap-9 md:rounded-3xl md:px-6 md:py-7.5 lg:gap-6 lg:p-0 lg:shadow-none">
          <div className="flex w-full flex-col items-center gap-3.5 md:gap-5">
            <h3 className="text-16-b flex w-full items-start">
              예약 가능한 시간
            </h3>
            {filteredSchedules?.length === 0 ? (
              <span className="text-16-m text-gray700 flex">
                날짜를 선택해 주세요.
              </span>
            ) : (
              <div className="scrollbar-hidden flex max-h-61 w-full flex-col gap-3 overflow-scroll">
                {filteredSchedules?.map((schedule) => {
                  const isChecked = schedule.id === scheduleId;
                  const isPast = !isValidTime?.some(
                    (v) => v.id === schedule.id
                  );

                  return (
                    <button
                      key={schedule.id}
                      onClick={() => handlePutInScheduleId(schedule.id)}
                      className={clsx(
                        'text-14-m h-13 w-full shrink-0 rounded-xl border',
                        isPast
                          ? 'border-gray200 text-gray300 bg-gray100 pointer-events-none cursor-default'
                          : isChecked
                            ? 'border-primary500 bg-primary100 text-primary500 border-2'
                            : 'border-gray300 hover:border-primary500 cursor-pointer bg-white text-gray-800'
                      )}
                    >
                      {schedule.startTime}~{schedule.endTime}
                    </button>
                  );
                })}
              </div>
            )}
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
          disabled={!scheduleId}
          onClick={handleReservationSubmit}
        >
          {isLoading ? <BouncingDots /> : '예약하기'}
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
      <AlertModal
        modalId="success-reservation"
        headerText="에약이 완료되었습니다."
        confirmText="확인"
        confirmFunction={() => close('success-reservation')}
      />
      <AlertModal
        modalId="duplicate-reservation"
        headerText="이미 예약한 일정입니다."
        confirmText="확인"
        confirmFunction={() => close('duplicate-reservation')}
      />
    </div>
  );
}
