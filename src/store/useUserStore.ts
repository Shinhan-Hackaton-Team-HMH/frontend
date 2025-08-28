import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  userId: string;
  setUserId: (id: string) => void;
  removeUserId: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: '',
      setUserId: (id: string) => set({ userId: id }),
      removeUserId: () => set({ userId: '' }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage), //defaut = localstorage
    },
  ),
);

export default useUserStore;

//
