"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: any) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
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
    <div className="bg-white dark:bg-[#121212]">
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
            ["code-block"],
            // add markdown support
          ],
          syntax: true,
        }}
      />
    </div>
  );
};
