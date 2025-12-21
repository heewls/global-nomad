import { create } from 'zustand';

interface ModalState {
  modalId: string[];
  open: (id: string) => void;
  close: (id: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalId: [],

  open: (id) =>
    set((s) => (s.modalId.includes(id) ? s : { modalId: [...s.modalId, id] })),

  close: (id) =>
    set((s) => ({
      modalId: s.modalId.filter((x) => x !== id),
    })),
}));

export default useModalStore;
