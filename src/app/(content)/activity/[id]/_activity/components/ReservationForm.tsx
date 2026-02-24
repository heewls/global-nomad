'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Button from '@/components/common/button';
import AlertModal from '@/components/modals/AlertModal';
import BouncingDots from '@/components/common/loading/BouncingDots';
import ReservationCalendar from '@/components/calendar/ReservationCalendar';
import { Participant } from './ReservationCompound';
import useModalStore from '@/store/modal';
import useReservation from '../hook/useReservation';
import { ActivityDetail } from '@/types/activities';
import Close from '@/assets/icons/x.svg';
import PrevPage from '@/../public/icons/prevArrow.svg';

export function TimeScheduleList({
  scheduleId,
  validTime,
  filteredSchedules,
  onScheduleClick,
}: {
  scheduleId: number;
  validTime: ActivityDetail['schedules'];
  filteredSchedules: ActivityDetail['schedules'];
  onScheduleClick: (id: number) => void;
}) {
  return (
    <div className="flex h-fit w-full flex-col items-center gap-3.5 md:gap-5">
      <h3 className="text-16-b flex w-full items-start">예약 가능한 시간</h3>
      {!filteredSchedules || filteredSchedules.length === 0 ? (
        <span className="text-16-m text-gray700">날짜를 선택해 주세요.</span>
      ) : (
        <div className="scrollbar-hidden flex max-h-61 w-full flex-col gap-3 overflow-y-auto">
          {filteredSchedules.map((schedule) => {
            const isChecked = schedule.id === scheduleId;
            const isPast = !validTime?.some((v) => v.id === schedule.id);

            return (
              <button
                type="button"
                key={schedule.id}
                onClick={() => onScheduleClick(schedule.id)}
                className={clsx(
                  'text-14-m h-13 w-full shrink-0 rounded-xl border',
                  isPast
                    ? 'border-gray200 bg-gray100 text-gray300 pointer-events-none cursor-default'
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
  );
}

export default function ReservationForm({
  detail,
  isOwner,
}: {
  detail: ActivityDetail;
  isOwner?: boolean;
}) {
  const { close } = useModalStore();

  if (isOwner) return null;

  return (
    <>
      <ReservationMobile detail={detail} />
      <ReservationTablet detail={detail} />
      <ReservationDesktop detail={detail} />

      <AlertModal
        modalId="success-reservation"
        headerText="예약이 완료되었습니다."
        confirmText="확인"
        confirmFunction={() => close('success-reservation')}
      />
      <AlertModal
        modalId="duplicate-reservation"
        headerText="이미 예약한 일정입니다."
        confirmText="확인"
        confirmFunction={() => close('duplicate-reservation')}
      />
    </>
  );
}

export function ReservationMobile({ detail }: { detail: ActivityDetail }) {
  const router = useRouter();
  const {
    isNext,
    scheduleId,
    headCount,
    selectedDate,
    availableDates,
    filteredSchedules,
    validTime,
    setSelectedDate,
    handlePutInScheduleId,
    handleCountChange,
    handleCount,
    handleNextPage,
    handlePrevPage,
  } = useReservation(detail);

  return (
    <div className="flex w-full flex-col gap-6 md:hidden">
      {!isNext ? (
        <div className="bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-18-b">날짜</h3>
            <button onClick={() => router.back()}>
              <Close className="h-6 w-6" />
            </button>
          </div>
          <div className="mb-6 h-92 w-full">
            <ReservationCalendar
              onSelect={setSelectedDate}
              availableDates={availableDates}
              selectedDate={selectedDate}
            />
          </div>
          <TimeScheduleList
            scheduleId={scheduleId}
            validTime={validTime}
            filteredSchedules={filteredSchedules}
            onScheduleClick={handlePutInScheduleId}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={handlePrevPage}
                className="cursor-pointer"
              >
                <PrevPage />
              </button>
              <span className="text-18-b">인원</span>
            </div>
            <span>예약할 인원을 선택해 주세요.</span>
          </div>
          <Participant
            headCount={headCount}
            handleCountChange={handleCountChange}
            handleCount={handleCount}
          />
        </div>
      )}
      <div className="px-4 pb-4">
        <Button
          variant="primary"
          className="w-full"
          onClick={isNext ? () => router.back() : handleNextPage}
          disabled={scheduleId === 0}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export function ReservationTablet({ detail }: { detail: ActivityDetail }) {
  const router = useRouter();
  const {
    validTime,
    isSubmittable,
    scheduleId,
    headCount,
    selectedDate,
    availableDates,
    filteredSchedules,
    setSelectedDate,
    handlePutInScheduleId,
    handleCountChange,
    handleCount,
  } = useReservation(detail);

  return (
    <div className="hidden w-full flex-col gap-10 bg-white md:flex lg:hidden">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-20-b">날짜</h3>
          <button onClick={() => router.back()}>
            <Close className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-row gap-6">
          <div className="h-123 w-90 flex-1 shrink-0">
            <ReservationCalendar
              onSelect={setSelectedDate}
              availableDates={availableDates}
              selectedDate={selectedDate}
            />
          </div>
          <div className="shadow1 flex flex-1 flex-col gap-9 rounded-3xl border border-gray-100 px-6 py-7.5">
            <TimeScheduleList
              scheduleId={scheduleId}
              validTime={validTime}
              filteredSchedules={filteredSchedules}
              onScheduleClick={handlePutInScheduleId}
            />
            {scheduleId !== 0 && (
              <Participant
                headCount={headCount}
                handleCountChange={handleCountChange}
                handleCount={handleCount}
              />
            )}
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        className="w-full"
        onClick={() => router.back()}
        disabled={!isSubmittable}
      >
        확인
      </Button>
    </div>
  );
}

export function ReservationDesktop({ detail }: { detail: ActivityDetail }) {
  const {
    isLoading,
    validTime,
    isSubmittable,
    scheduleId,
    headCount,
    selectedDate,
    availableDates,
    filteredSchedules,
    setSelectedDate,
    handlePutInScheduleId,
    handleCountChange,
    handleCount,
    handleReservationSubmit,
  } = useReservation(detail);

  return (
    <div className="border-gray100 sticky top-20 hidden w-full flex-col gap-7.5 rounded-3xl border bg-white p-7.5 lg:flex">
      <span className="text-24-b flex items-center gap-1.5">
        ₩ {detail.price.toLocaleString()}
        <span className="text-gray400 text-20-m">/인</span>
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-16-b">날짜</h3>
        <div className="h-92 w-87.5">
          <ReservationCalendar
            onSelect={setSelectedDate}
            availableDates={availableDates}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      <TimeScheduleList
        scheduleId={scheduleId}
        validTime={validTime}
        filteredSchedules={filteredSchedules}
        onScheduleClick={handlePutInScheduleId}
      />
      <Participant
        headCount={headCount}
        handleCountChange={handleCountChange}
        handleCount={handleCount}
      />
      <div className="border-t-gray100 flex items-center justify-between border-t pt-5">
        <span className="flex gap-1.5 font-bold">
          총 합계 <span>₩ {detail.price.toLocaleString()}</span>
        </span>
        <Button
          variant="primary"
          className="w-34"
          onClick={handleReservationSubmit}
          disabled={!isSubmittable}
        >
          {isLoading ? <BouncingDots /> : '예약하기'}
        </Button>
      </div>
    </div>
  );
}
