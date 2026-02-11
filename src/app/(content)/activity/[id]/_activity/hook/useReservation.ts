import { useState } from 'react';
import { ActivityDetail } from '@/types/activities';
import axiosClient from '@/lib/api/axiosClient';
import axios from 'axios';
import useModalStore from '@/store/modal';

interface ReservationResponse {
  scheduleId: number;
  headCount: number;
}

export default function useReservation(detail?: ActivityDetail) {
  const [isNext, setIsNext] = useState(false);
  const [scheduleId, setScheduleId] = useState(0);
  const [headCount, setHeadCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { open } = useModalStore();

  const handlePutInScheduleId = (id: number) => {
    setScheduleId(id);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);

    setHeadCount(Math.max(1, count));
  };

  const handleCount = (type: 'minus' | 'plus') => {
    if (type === 'minus' && headCount === 1) return;

    if (type === 'minus') setHeadCount((prev) => prev - 1);
    if (type === 'plus') setHeadCount((prev) => prev + 1);
  };

  const handleNextPage = () => {
    setIsNext((prev) => !prev);
  };

  const handleReservationSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await axiosClient
      .post<ReservationResponse>(`/activities/${detail?.id}/reservations`, {
        scheduleId,
        headCount,
      })
      .then(() => {
        setIsLoading(false);
        open('success-reservation');
        setScheduleId(0);
        setHeadCount(1);
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const todayStr = new Date().toLocaleDateString('en-CA');

  const availableDates = Array.from(
    new Set(
      detail?.schedules.map((s) => s.date).filter((date) => date >= todayStr)
    )
  );

  const filteredSchedules = detail?.schedules.filter(
    (schedule) => schedule.date === selectedDate
  );

  const isValidTime = detail?.schedules.filter((s) => {
    return new Date(`${s.date}T${s.startTime}`) > new Date();
  });

  return {
    isNext,
    isLoading,
    isValidTime,
    scheduleId,
    headCount,
    selectedDate,
    availableDates,
    filteredSchedules,
    setSelectedDate,
    handlePutInScheduleId,
    handleCountChange,
    handleCount,
    handleNextPage,
    handleReservationSubmit,
  };
}
