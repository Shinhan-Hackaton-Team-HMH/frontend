import { create } from 'zustand';

interface ImageStoreState {
  images: (File | string)[];
  setImages: (imagesList: (File | string)[]) => void;
  resetImage: () => void;
}

const useImageStore = create<ImageStoreState>()((set) => ({
  // images: new Array(5).fill(''),
  images: [],
  setImages: (images: (File | string)[]) => set({ images }),
  resetImage: () => set({ images: [] }),
}));

export default useImageStore;
