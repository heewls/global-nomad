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

const initialSlot: ScheduleSlot = {
  id: Date.now(),
  date: '',
  startTime: '',
  endTime: '',
};

export default function useSchedules(form: UseFormReturn<ActivityRequest>) {
  const [addingSlot, setAddingSlot] = useState<ScheduleSlot>(initialSlot);

  const { open, close } = useModalStore();

  const savedSchedules: ScheduleSlot[] =
    useWatch({
      control: form.control,
      name: 'schedules',
    }) || [];

  const handleSavedTimeSelect = ({
    idx,
    time,
    option,
  }: {
    idx: number;
    time: 'startTime' | 'endTime';
    option: string;
  }) => {
    form.setValue(`schedules.${idx}.${time}`, option);
  };

  const handleAddingSlotChange = (
    field: 'date' | 'startTime' | 'endTime',
    time: string
  ) => {
    setAddingSlot((prev) => ({
      ...prev,
      [field]: time,
    }));
  };

  const handleSlotAdd = () => {
    if (!addingSlot.date || !addingSlot.startTime || !addingSlot.endTime) {
      open('schedule-fill');
      return;
    }

    form.setValue('schedules', [...savedSchedules, addingSlot]);
    setAddingSlot(initialSlot);
  };

  const handleSlotDelete = (idx: number) => {
    const updatedSchedules = savedSchedules.filter((_, i) => i !== idx);
    form.setValue('schedules', updatedSchedules);
  };

  return {
    addingSlot,
    savedSchedules,
    close,
    handleAddingSlotChange,
    handleSavedTimeSelect,
    handleSlotAdd,
    handleSlotDelete,
  };
}
