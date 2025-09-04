import { Progress } from '@/types/user/type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  userId: string;
  biz_id: string | null;
  status: Progress;
  campaignId: number;
  updateStatus: (status: Progress) => void;
  setCampaignId: (id: number) => void;
  setBizId: (biz_id: string) => void;
  setUserId: (id: string) => void;
  removeUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: '',
      biz_id: null,
      status: 'NOT_STARTED',
      campaignId: 0,
      setCampaignId: (id: number) => set({ campaignId: id }),
      updateStatus: (status: Progress) => set({ status }),
      setUserId: (id: string) => set({ userId: id }),
      setBizId: (biz_id: string) => set({ biz_id: biz_id }),
      removeUser: () => set({ userId: '', biz_id: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage), //defaut = localstorage
    },
  ),
);

export default useUserStore;
