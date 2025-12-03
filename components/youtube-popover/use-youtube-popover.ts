"use client";

import { useCallback, useState } from "react";
import type { Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { getEmbedUrlFromYoutubeUrl } from "@/components/youtube-node/youtube-node-extension";

export interface UseYoutubePopoverConfig {
  editor?: Editor | null;
}

export function useYoutubePopover({ editor }: UseYoutubePopoverConfig = {}) {
  const { editor: contextEditor } = useTiptapEditor(editor);
  const activeEditor = editor || contextEditor;

  const [url, setUrl] = useState<string>("");

  const setYoutubeVideo = useCallback(() => {
    if (!activeEditor || !url) return;

    const embedUrl = getEmbedUrlFromYoutubeUrl({ url });
    if (!embedUrl) return;

    activeEditor
      .chain()
      .focus()
      .setYoutubeVideo({ src: embedUrl })
      .run();

    setUrl("");
  }, [activeEditor, url]);

  const isVisible = Boolean(activeEditor);
  const canInsert = Boolean(activeEditor && url);

  return {
    url,
    setUrl,
    setYoutubeVideo,
    isVisible,
    canInsert,
  };
}
