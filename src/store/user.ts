import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface UserState {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUserProfile: (
    profile: Partial<Pick<User, 'nickname' | 'profileImageUrl'>>
  ) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,

      setUser: (user) => set({ user, isLogin: true }),

      clearUser: () => set({ user: null, isLogin: false }),

      updateUserProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
    }),

    {
      name: 'user',
    }
  )
);

export default useUserStore;
