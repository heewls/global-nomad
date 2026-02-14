import { create } from 'zustand';

interface ReservationState {
  selectedDate: string;
  scheduleId: number;
  headCount: number;
  setSelectedDate: (date: string) => void;
  setScheduleId: (id: number) => void;
  setHeadCount: (count: number) => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  selectedDate: '',
  scheduleId: 0,
  headCount: 1,
  setSelectedDate: (date) => set({ selectedDate: date }),
  setScheduleId: (id) => set({ scheduleId: id }),
  setHeadCount: (count) => set({ headCount: count }),
}));

export default useReservationStore;
