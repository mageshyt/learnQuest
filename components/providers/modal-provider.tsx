"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "../modals/confirm-modal";
import { ChapterAiHelperModal } from "../modals/chapter-ai-helper";

export const ModalProvider = () => {
  // Hydration Fix
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ConfirmModal />
      <ChapterAiHelperModal/>
    </>
  );
};
