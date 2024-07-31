import { create } from "zustand";

export type ModalType = "chapter-ai-helper" | "confirmation-model" | "exit-model";

interface ModalData {
  handleConfirm?: () => void;
  confirmText?: string;
  chapterId?: string;
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  openModal: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  openModal: (type: ModalType, data = {}) => {
    set({ type, isOpen: true, data });
  },
  onClose: () => {
    set({ type: null, isOpen: false });
  },
}));
