import { create } from 'zustand';

interface ImageGalleryState {
  currentIndex: number;
  previousIndex: number | null;
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
  previousIndex: null,
  isZoomed: false,
  images: [],

  setCurrentIndex: (index) => set({ currentIndex: index }),

  setIsZoomed: (zoomed) => set({ isZoomed: zoomed }),

  setImages: (images) => set({ images, currentIndex: 0 }),

  next: () => {
    const { currentIndex, images } = get();
    if (currentIndex < images.length - 1) {
      get().goTo(currentIndex + 1);
    }
  },

  prev: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      get().goTo(currentIndex - 1);
    }
  },

  goTo: (index) => {
    const { currentIndex, images } = get();
    if (index === currentIndex || index < 0 || index >= images.length) return;

    // Trigger fade out
    set({ previousIndex: currentIndex });

    // Wait for fade out, then change image and fade in
    setTimeout(() => {
      set({ currentIndex: index });

      // Small delay then remove changing class to fade in
      setTimeout(() => {
        set({ previousIndex: null });
      }, 20);
    }, 200);
  },

  reset: () =>
    set({ currentIndex: 0, previousIndex: null, isZoomed: false, images: [] }),
}));
