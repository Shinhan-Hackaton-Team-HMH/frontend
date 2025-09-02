import { create } from 'zustand';

interface CommercialState {
  phrases: string[];
  setPhrases: (phrases: string[]) => void;
  resetPhrases: () => void;
}

const useCrawledDataStore = create<CommercialState>()((set) => ({
  phrases: [],
  setPhrases: (phrases: string[]) => set({ phrases }),
  resetPhrases: () => set({ phrases: [] }),
}));

export default useCrawledDataStore;
