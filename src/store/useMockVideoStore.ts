import { create } from 'zustand';

// Define a reusable type for statuses
type VideoStatus = 'Generating' | 'Reviewing' | 'Confirmed' | 'BroadCasting';

// State shape
interface VideoState {
  status: VideoStatus;
  backOffice: 'Review' | 'Confirm';
  updateBackOffice: (status: 'Review' | 'Confirm') => void;
  regenerateCount: number;
  useRegenerate: () => void;
  updateVideoStatus: (status: VideoStatus) => void;
}

const useCurrentAdStore = create<VideoState>()((set) => ({
  status: 'Generating',
  updateVideoStatus: (status: VideoStatus) => set({ status }),
  regenerateCount: 0,
  backOffice: 'Review',
  updateBackOffice: (status: 'Review' | 'Confirm') =>
    set({ backOffice: status }),
  useRegenerate: () => set({}),
}));

export default useCurrentAdStore;
