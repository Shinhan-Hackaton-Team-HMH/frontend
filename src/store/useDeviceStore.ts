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
      deviceCount: '70',
      timeSlots: ['06:00-09:00', '12:00-15:00'],
      impressions: '50',
      budget: '595,000',
      reason:
        '한식 일반음식점 타겟에 맞춰 출근 시간대와 점심 시간대에 노출하여 직장인 및 거주민에게 효과적으로 도달합니다. 엘리베이터 TV는 아파트, 오피스 등에서 높은 시청률을 보이며, 비교적 저렴한 단가로 많은 노출을 확보할 수 있습니다.',
    },
    {
      ad_type: '버스정류장',
      device: '버스정류장',
      deviceCount: '40',
      timeSlots: ['12:00-15:00', '18:00-21:00'],
      impressions: '40',
      budget: '624,000',
      reason:
        '버스정류장은 유동 인구가 많은 지역에 노출되어 광범위한 고객에게 도달할 수 있습니다. 점심 및 퇴근 시간대에 광고를 집중하여 식당을 찾는 고객들에게 효과적으로 어필합니다. 엘리베이터 TV와 함께 다양한 접점에서 잠재 고객을 확보합니다.',
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
