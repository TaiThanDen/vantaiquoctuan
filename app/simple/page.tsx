"use client";
import { useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function Page() {
  const [content, setContent] = useState("");

  return <SimpleEditor value={content} onChange={setContent} />;
}
