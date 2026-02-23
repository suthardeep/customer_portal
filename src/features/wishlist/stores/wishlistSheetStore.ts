import { create } from "zustand";

interface WishlistSheetPayload {
  productId: string;
  variantId: string;
  productName: string;
}

interface WishlistSheetState {
  isOpen: boolean;
  payload: WishlistSheetPayload | null;
  open: (payload: WishlistSheetPayload) => void;
  close: () => void;
}

export const useWishlistSheetStore = create<WishlistSheetState>((set) => ({
  isOpen: false,
  payload: null,
  open: (payload) => set({ isOpen: true, payload }),
  close: () => set({ isOpen: false, payload: null }),
}));
