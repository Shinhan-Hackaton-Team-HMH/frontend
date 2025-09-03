import { create } from 'zustand';
import { BusinessInfo } from '@/types/business/type';

interface BusinessStoreState extends BusinessInfo {
  setBusinessInfo: (data: Partial<BusinessInfo>) => void;
  clearBusinessInfo: () => void;
}

// const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

export const useBusinessStore = create<BusinessStoreState>((set) => ({
  biz_id: 0,
  biz_number: '',
  biz_name: '',
  owner_name: '',
  address: '',
  biz_type: '',
  biz_subtype: '',
  setBusinessInfo: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
  clearBusinessInfo: () =>
    set({
      biz_id: 0,
      biz_number: '',
      biz_name: '',
      owner_name: '',
      address: '',
      biz_type: '',
      biz_subtype: '',
    }),
}));

interface AdDuration {
  startDate: Date | null;
  endDate: Date | null;
  days: number;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  setDays: (days: number) => void;
  clearDurationInfo: () => void;
}

export const useAdDurationStore = create<AdDuration>((set) => ({
  startDate: null,
  endDate: null,
  days: 0,
  setStartDate: (startDate: Date) => set({ startDate }),
  setEndDate: (endDate: Date) => set({ endDate }),
  setDays: (days: number) => set({ days }),
  clearDurationInfo: () =>
    set({
      startDate: null,
      endDate: null,
      days: 0,
    }),
}));
