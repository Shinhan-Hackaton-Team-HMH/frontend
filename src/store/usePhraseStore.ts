import { create } from 'zustand';

interface VideoTemplateState {
  phrases: string[];
  setPhrases: (phrases: string[]) => void;
  upDatePhrase: (phrase: string, index: number) => void;
  resetPhrases: () => void;
}

export const useVideoTemplateStore = create<VideoTemplateState>((set) => ({
  phrases: [
    '꽃사계',
    '서촌 감성 플라워샵',

    '특별한 날',
    '특별한 사람에게',

    '맞춤제작 꽃다발',

    '마음을 전하는',
    '가장 아름다운 방법',

    '꽃사계',
    '당일 예약·배달 가능',
    '간편하게 원하는 시간에 배송',
  ],
  setPhrases: (phrases: string[]) => set({ phrases }),
  upDatePhrase: () => {},
  resetPhrases: () => set({ phrases: [] }),
}));
