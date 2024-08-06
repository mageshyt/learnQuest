"use client";

import React from "react";

// import 'react-quill/dist/quill.bubble.css';
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";

interface PreviewProps {
  value: string;
}

const Preview = ({ value }: PreviewProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div>
      <MarkdownPreview
        source={value}
        wrapperElement={{
          "data-color-mode": isDark ? "dark" : "light",
        }}
        className="p-4  rounded-xl border mt-4"
      />
    </div>
  );
};

export default Preview;
