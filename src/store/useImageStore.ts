import { create } from 'zustand';

interface ImageStoreState {
  images: string[];
  setImages: (imagesList: string[]) => void;
  resetImage: () => void;
}

const useImageStore = create<ImageStoreState>()((set) => ({
  // images: new Array(5).fill(''),
  images: [],
  setImages: (images: string[]) => set({ images }),
  resetImage: () => set({ images: [] }),
}));

export default useImageStore;
