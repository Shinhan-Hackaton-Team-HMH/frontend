import { create } from 'zustand';

interface VideoTemplateState {
  phrases: string[];
  setPhrases: (phrases: string[]) => void;
  upDatePhrase: (phrase: string, index: number) => void;
  resetPhrases: () => void;
}

export const useVideoTemplateStore = create<VideoTemplateState>((set) => ({
  phrases: [],
  setPhrases: (phrases: string[]) => set({ phrases }),
  upDatePhrase: () => {},
  resetPhrases: () => set({ phrases: [] }),
}));
