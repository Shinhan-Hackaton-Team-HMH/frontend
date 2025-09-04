import { create } from 'zustand';
import { AdPlan } from '@/types/gpt/phrase'; // 타입 따로 분리했다 가정

interface DeviceStoreState {
  deviceState: AdPlan[];
  setDeviceState: (data: AdPlan[]) => void;
  clearDeviceState: () => void;
  updateStore: (device: AdPlan['device'], updates: Partial<AdPlan>) => void;
}

export const useDeviceStore = create<DeviceStoreState>((set) => ({
  deviceState: [
    {
      ad_type: '엘리베이터 TV',
      device: '엘리베이터 TV',
      deviceCount: '30',
      timeSlots: ['18:00-21:00'],
      impressions: '60',
      budget: '810,000',
      reason: '엘리베이터 중심 반복 노출로 장기간 안정적인 인지도를 확보합니다',
    },
    {
      ad_type: '버스정류장',
      device: '버스정류장',
      deviceCount: '3',
      timeSlots: ['18:00-21:00'],
      impressions: '60',
      budget: '160,000',
      reason:
        '퇴근 시간대 버스 정류장에서의 집중 노출로 도달 범위를 확대합니다.',
    },
  ],
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
