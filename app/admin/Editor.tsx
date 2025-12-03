import React, { useEffect, useState } from "react";
import { SimpleEditor } from "../../components/tiptap-templates/simple/simple-editor";

type Props = {
  value: any;
  onChange: (json: any) => void;
  className?: string;
};

export default function Editor({ value, onChange, className }: Props) {
  const [editorContent, setEditorContent] = useState(value);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  return (
    <SimpleEditor
      value={editorContent}
      onChange={onChange}
      // className={className}
    />
  );
}
