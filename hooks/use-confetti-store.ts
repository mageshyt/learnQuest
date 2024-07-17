import { create } from "zustand";

type ConfettiStore = {
  confetti: boolean;
  toggleConfetti: () => void;
  showConfetti: () => void;
};

export const useConfettiStore = create<ConfettiStore>((set) => ({
  confetti: false,
  toggleConfetti: () => set((state) => ({ confetti: !state.confetti })),
  showConfetti: () => set({ confetti: true }),
}));
