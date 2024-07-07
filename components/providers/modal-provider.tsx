"use client";

import { useEffect, useState } from "react";
import ChapterDescriptionHelperModal from "../modals/chapter-description-helper-modal";

export const ModalProvider = () => {
  // Hydration Fix
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
    </>
  );
};
