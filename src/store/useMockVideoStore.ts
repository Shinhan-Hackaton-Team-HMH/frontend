import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define a reusable type for statuses
export type VideoStatus =
  | 'Generating'
  | 'Reviewing'
  | 'Confirmed'
  | 'BroadCasting';

// State shape
interface VideoState {
  status: VideoStatus;
  backOffice: 'Review' | 'Confirm';
  updateBackOffice: (status: 'Review' | 'Confirm') => void;
  regenerateCount: number;
  useRegenerate: () => void;
  updateVideoStatus: (status: VideoStatus) => void;
  reset: () => void;
}

const useCurrentAdStore = create<VideoState>()(
  persist(
    (set) => ({
      status: 'Generating',
      backOffice: 'Review',
      regenerateCount: 0,
      updateVideoStatus: (status: VideoStatus) => set({ status }),
      updateBackOffice: (status: 'Review' | 'Confirm') =>
        set({ backOffice: status }),
      useRegenerate: () =>
        set((state) => ({ regenerateCount: state.regenerateCount + 1 })),
      reset: () =>
        set({
          status: 'Generating',
          backOffice: 'Review',
          regenerateCount: 0,
        }),
    }),
    {
      name: 'current-ad-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCurrentAdStore;
