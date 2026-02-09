import { create } from 'zustand';

interface ImageGalleryState {
  currentIndex: number;
  isZoomed: boolean;
  images: string[];
  setCurrentIndex: (index: number) => void;
  setIsZoomed: (zoomed: boolean) => void;
  setImages: (images: string[]) => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
}

export const useImageGalleryStore = create<ImageGalleryState>((set, get) => ({
  currentIndex: 0,
  isZoomed: false,
  images: [],

  setCurrentIndex: (index) => set({ currentIndex: index }),

  setIsZoomed: (zoomed) => set({ isZoomed: zoomed }),

  setImages: (images) => set({ images, currentIndex: 0 }),

  next: () => {
    const { currentIndex, images } = get();
    if (currentIndex < images.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prev: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  goTo: (index) => {
    const { images } = get();
    if (index >= 0 && index < images.length) {
      set({ currentIndex: index });
    }
  },

  reset: () => set({ currentIndex: 0, isZoomed: false, images: [] }),
}));
