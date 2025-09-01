import { CrawlResponseTypes } from '@/app/api/naver/crawl/route';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CrawledState {
  naverUrl: string;
  setNaverUrl: (url: string) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  crawledData: CrawlResponseTypes | null;
  setCrawledData: (data: CrawlResponseTypes) => void;
  adImages: string[];
  setAdImages: (images: string[]) => void;
  resetCrawlData: () => void;
}

const useCrawledDataStore = create<CrawledState>()(
  persist(
    (set) => ({
      naverUrl: '',
      setNaverUrl: (url: string) => set({ naverUrl: url }),
      searchKeyword: '',
      setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
      crawledData: null,
      setCrawledData: (data: CrawlResponseTypes) => set({ crawledData: data }),
      adImages: [],
      setAdImages: (images: string[]) => set({ adImages: images }),
      resetCrawlData: () =>
        set({ naverUrl: '', searchKeyword: '', crawledData: null }),
    }),
    {
      name: 'crawled-storage',
      storage: createJSONStorage(() => sessionStorage), //defaut = localstorage
    },
  ),
);

export default useCrawledDataStore;
