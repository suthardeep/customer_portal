import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShortsPlayerState {
  isMuted: boolean;
  setMuted: (muted: boolean) => void;
}

export const useShortsPlayerStore = create<ShortsPlayerState>()(
  persist(
    (set) => ({
      isMuted: false,
      setMuted: (muted) => set({ isMuted: muted }),
    }),
    { name: "shorts-player" },
  ),
);
