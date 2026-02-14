'use client';

import axios from 'axios';
import { useState } from 'react';
import axiosClient from '@/lib/api/axiosClient';
import useModalStore from '@/store/modal';
import { ActivityDetail } from '@/types/activities';
import useReservationStore from './useReservationStore';

interface ReservationResponse {
  scheduleId: number;
  headCount: number;
}

export default function useReservation(detail: ActivityDetail) {
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { open } = useModalStore();
  const {
    selectedDate,
    scheduleId,
    headCount,
    setSelectedDate,
    setScheduleId,
    setHeadCount,
  } = useReservationStore();

  const handlePutInScheduleId = (id: number) => {
    setScheduleId(id);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);

    setHeadCount(Math.max(1, count));
  };

  const handleCount = (type: 'minus' | 'plus') => {
    if (type === 'minus' && headCount === 1) return;

    if (type === 'minus') setHeadCount(headCount - 1);
    if (type === 'plus') setHeadCount(headCount + 1);
  };

  const handleNextPage = () => {
    setIsNext(true);
  };

  const handlePrevPage = () => {
    setIsNext(false);
  };

  const handleReservationSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await axiosClient
      .post<ReservationResponse>(`/activities/${detail.id}/reservations`, {
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

        if (error.status === 409) {
          open('duplicate-reservation');
          setScheduleId(0);
          setHeadCount(1);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const todayStr = new Date().toLocaleDateString('en-CA');

  const availableDates = Array.from(
    new Set(
      detail.schedules.map((s) => s.date).filter((date) => date >= todayStr)
    )
  );

  const filteredSchedules = detail.schedules.filter(
    (schedule) => schedule.date === selectedDate
  );

  const validTime = detail.schedules.filter((s) => {
    return new Date(`${s.date}T${s.startTime}`) > new Date();
  });

  const checkedSchedule = filteredSchedules.find(
    (schedule) => schedule.id === scheduleId
  );
  
  const isSubmittable = scheduleId !== 0 || isLoading;

  return {
    isNext,
    isLoading,
    isSubmittable,
    scheduleId,
    headCount,
    selectedDate,
    availableDates,
    filteredSchedules,
    validTime,
    checkedSchedule,
    setSelectedDate,
    handlePutInScheduleId,
    handleCountChange,
    handleCount,
    handleNextPage,
    handlePrevPage,
    handleReservationSubmit,
  };
}
