"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
interface PreviewPropsProps {
  value: string;
}

export const Preview = ({ value }: PreviewPropsProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(
        () => {
          hljs.configure({
            // optionally configure hljs
            languages: ["javascript", "php", "go"],
          });
          // @ts-ignore
          window.hljs = hljs;
          return import("react-quill");
        },
        { ssr: false }
      ),
    []
  );

  return (
    <ReactQuill
      value={value}
      theme="bubble"
      modules={{
        syntax: true,
      }}
      readOnly
    />
  );
};
