import { create } from 'zustand';

interface ImageStoreState {
  images: (File | string)[];
  setImages: (imagesList: (File | string)[]) => void;
  resetImage: () => void;
}

const useImageStore = create<ImageStoreState>()((set) => ({
  // images: new Array(5).fill(''),
  images: [
    '/baseImage/example/image1.png',
    '/baseImage/example/image2.png',
    '/baseImage/example/image3.png',
    '/baseImage/example/image4.png',
    '/baseImage/example/image5.png',
  ],

  setImages: (images: (File | string)[]) => set({ images }),
  resetImage: () => set({ images: [] }),
}));

export default useImageStore;
