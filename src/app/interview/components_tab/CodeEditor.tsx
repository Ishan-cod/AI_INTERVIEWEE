import { Editor } from "@monaco-editor/react";

import React from "react";

interface editor_interface {
  language: string;
  default_code: string;
}

export default function CodeEditor(editor_lang: editor_interface) {
  return (
    <Editor
      defaultLanguage={editor_lang.language}
      defaultValue={editor_lang.default_code}
      theme="vs-dark"
      options={{
        fontSize: 18,
        lineHeight: 24,
        wordWrap: "on",
        mouseWheelZoom: true,
        minimap: { enabled: false },
        automaticLayout: true, // 🔄 Optional: adjusts to container resize
      }}
      className="absolute inset-0"
    />
  );
}
