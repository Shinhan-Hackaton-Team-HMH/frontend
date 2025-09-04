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
      deviceCount: '91',
      timeSlots: ['18:00-21:00'],
      impressions: '60',
      budget: '819,000',
      reason:
        '엘리베이터 중심으로 반복 노출하여 광고 인지도와 노출 효과 극대화.',
    },
    {
      ad_type: '버스정류장',
      device: '버스정류장',
      deviceCount: '10',
      timeSlots: ['18:00-21:00'],
      impressions: '60',
      budget: '180,000',
      reason:
        '유동 인구가 많은 지역에서 출퇴근 시간대에 맞춰 효율적인 노출이 가능합니다.',
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
