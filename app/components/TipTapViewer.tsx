"use client";

import { useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

// --- Extensions (match với SimpleEditor của bạn) ---
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import Youtube from "@tiptap/extension-youtube";

// --- Custom Node (y hệt editor) ---
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

// --- Styles (y hệt editor) ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

type Props = { content: any; className?: string };

export default function TipTapViewer({ content, className }: Props) {
  const normalized = useMemo(() => {
    if (!content) return null;

    // content có thể là object JSON hoặc JSON string hoặc HTML string
    if (typeof content === "string") {
      const t = content.trim();

      // thử parse JSON (tiptap JSON)
      if (t.startsWith("{") || t.startsWith("[")) {
        try {
          return JSON.parse(t);
        } catch {
          return content; // fallback: html/text
        }
      }

      return content; // html/tex   t
    }

    return content; // JSON object
  }, [content]);

  // Nếu backend trả HTML string
  if (typeof normalized === "string") {
    return (
      <div
        className={className ?? "simple-editor-content"}
        dangerouslySetInnerHTML={{ __html: normalized }}
      />
    );
  }

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        class: className ?? "simple-editor-content",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false, // bạn dùng HorizontalRule custom
        heading: { levels: [1, 2, 3, 4] },
      }),

      // ✅ underline
      Underline,

      // ✅ link (viewer phải openOnClick: true)
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
          class: "tiptap-link", // nếu bạn có style riêng
        },
      }),

      // ✅ các kiểu khác đúng toolbar
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 360,
      }),
    ],
    content: normalized ?? { type: "doc", content: [] },
  });

  if (!normalized) return null;
  return <EditorContent editor={editor} />;
}
