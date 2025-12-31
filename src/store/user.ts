import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserState {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateNickname: (newNickname: string) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,

      setUser: (user) => set({ user, isLogin: true }),

      clearUser: () => set({ user: null, isLogin: false }),

      updateNickname: (newNickname) =>
        set((state) => ({
          user: state.user ? { ...state.user, nickname: newNickname } : null,
        })),
    }),
    {
      name: 'user',
    }
  )
);

export default useUserStore;
