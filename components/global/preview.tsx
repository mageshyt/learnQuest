"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewPropsProps {
  value: string;
}

export const Preview = ({ value }: PreviewPropsProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return <ReactQuill value={value} theme="bubble" readOnly />;
};
