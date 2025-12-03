"use client";

import { forwardRef, useCallback, useState } from "react";
import type { Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import { YoutubeIcon } from "@/components/tiptap-icons/youtube-icon";
import { CornerDownLeftIcon } from "@/components/tiptap-icons/corner-down-left-icon";

// --- UI Primitives ---
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/tiptap-ui-primitive/popover";
import { Input, InputGroup } from "@/components/tiptap-ui-primitive/input";

export interface YoutubePopoverProps {
  editor?: Editor | null;
}

export const YoutubePopover: React.FC<YoutubePopoverProps> = ({ editor }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleAddYoutube = () => {
    if (youtubeUrl && editor) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl });
      setYoutubeUrl("");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Add YouTube video"
          tooltip="YouTube Video"
        >
          <YoutubeIcon className="tiptap-button-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-2">
          <Input
            type="url"
            placeholder="Paste YouTube link..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddYoutube();
              }
            }}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddYoutube}
            title="Insert video"
            disabled={!youtubeUrl}
            data-style="ghost"
            className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            <CornerDownLeftIcon className="tiptap-button-icon" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
