"use client";

import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

interface EditorProps {
  onChange: (
    value?: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>,
    state?: ContextStore
  ) => void;
  value: string;
}

const Editor = ({ onChange, value }: EditorProps) => {

  return (
    <div data-color-mode="light">
      <MDEditor
        className="min-h-[500px]"
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        preview="edit"
      />
    </div>
  );
};

export default Editor;
