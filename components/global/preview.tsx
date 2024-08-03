"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
import hljs from "highlight.js";
interface PreviewPropsProps {
  value: string;
}

export const Preview = ({ value }: PreviewPropsProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(
        () => {
          hljs.configure({
            languages: ["javascript", "CSS", "HTML", "python"],
            languageDetectRe:
              /<\?[\s\S]+?\?>|<%[\s\S]+?%>|<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>|<script[^>]+src=["'](?:(?!\/\/|\/\*).)*\.(js|ts)["'][^>]*>[\s\S]*?<\/script>|<[^>]+>/,
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
      readOnly
      className="bg-white dark:bg-neutral-900 p-4 rounded-xl "
    />
  );
};
