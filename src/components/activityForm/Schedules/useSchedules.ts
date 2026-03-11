import { useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import useModalStore from '@/store/modal';
import { ActivityRequest } from '@/types/activities';

export interface ScheduleSlot {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface TimeErrorModal {
  modalId: string;
  modalMessage: string;
}

const initialSlot: ScheduleSlot = {
  id: Date.now(),
  date: '',
  startTime: '',
  endTime: '',
};

export default function useSchedules(form: UseFormReturn<ActivityRequest>) {
  const [addingSlot, setAddingSlot] = useState<ScheduleSlot>(initialSlot);
  const [timeErrorModal, setTimeErrorModal] = useState<TimeErrorModal>();

  const { open, close } = useModalStore();

  const TIME_SLOTS = Array.from({ length: 48 }, (_, idx) => {
    const hour = Math.floor(idx / 2);
    const minute = idx % 2 === 0 ? '00' : '30';
    const formattedHour = hour.toString().padStart(2, '0');

    return `${formattedHour}:${minute}`;
  });

  const savedSchedules: ScheduleSlot[] =
    useWatch({
      control: form.control,
      name: 'schedules',
    }) || [];

  const timeToNumber = (time: string) => Number(time.replace(':', ''));

  const timeValidation = (start: string, end: string) => {
    if (!start || !end) return true;

    const startTime = timeToNumber(start);
    const endTime = timeToNumber(end);

    if (startTime === endTime) {
      setTimeErrorModal({
        modalId: 'time-equal',
        modalMessage: '시작 시간과 종료 시간을 다르게 설정해 주세요.',
      });
      open('time-equal');
      return false;
    }

    if (startTime > endTime) {
      setTimeErrorModal({
        modalId: 'time-error',
        modalMessage: '종료 시간은 시작 시간보다 늦어야 합니다.',
      });
      open('time-error');
      return false;
    }

    return true;
  };

  const handleSavedScheduleChange = ({
    idx,
    field,
    value,
  }: {
    idx: number;
    field: 'date' | 'startTime' | 'endTime';
    value: string;
  }) => {
    if (field === 'startTime' || field === 'endTime') {
      const currentSlot = savedSchedules[idx];

      const startTime = field === 'startTime' ? value : currentSlot.startTime;
      const endTime = field === 'endTime' ? value : currentSlot.endTime;

      if (!timeValidation(startTime, endTime)) return;
    }

    form.setValue(`schedules.${idx}.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleAddingSlotChange = (
    field: 'date' | 'startTime' | 'endTime',
    value: string
  ) => {
    setAddingSlot((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSlotAdd = () => {
    if (!addingSlot.date || !addingSlot.startTime || !addingSlot.endTime) {
      open('schedule-fill');
      return;
    }

    if (!timeValidation(addingSlot.startTime, addingSlot.endTime)) return;

    form.setValue('schedules', [...savedSchedules, addingSlot], {
      shouldValidate: true,
    });

    setAddingSlot(initialSlot);
  };

  const handleSlotDelete = (idx: number) => {
    const updatedSchedules = savedSchedules.filter((_, i) => i !== idx);
    form.setValue('schedules', updatedSchedules, { shouldValidate: true });
  };

  return {
    TIME_SLOTS,
    addingSlot,
    timeErrorModal,
    savedSchedules,
    close,
    handleAddingSlotChange,
    handleSavedScheduleChange,
    handleSlotAdd,
    handleSlotDelete,
  };
}
