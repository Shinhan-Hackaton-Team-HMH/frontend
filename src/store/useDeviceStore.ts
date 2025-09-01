import { create } from 'zustand';
import { AdPlan, AdResponse } from '@/types/gpt/phrase'; // 타입 따로 분리했다 가정

interface DeviceStoreState {
  deviceState: AdPlan[];
  setDeviceState: (data: AdPlan[]) => void;
  clearDeviceState: () => void;
  updateStore: (device: AdPlan['device'], updates: Partial<AdPlan>) => void;
}

export const useDeviceStore = create<DeviceStoreState>((set) => ({
  deviceState: [],
  setDeviceState: (data) => set({ deviceState: data }),
  clearDeviceState: () => set({ deviceState: [] }),
  // updateStore 구현
  updateStore: (device, updates) =>
    set((state) => ({
      deviceState: state.deviceState.map((plan) =>
        plan.device === device ? { ...plan, ...updates } : plan,
      ),
    })),
}));
