import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { YoutubeNodeView } from "./youtube-node-view";

export interface YoutubeOptions {
  allowFullscreen: boolean;
  autoplay: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls: boolean;
  disableKBcontrols: boolean;
  enableIFrameApi: boolean;
  endTime: number;
  height: number;
  interfaceLanguage?: string;
  ivLoadPolicy: number;
  loop: boolean;
  modestBranding: boolean;
  HTMLAttributes: Record<string, any>;
  inline: boolean;
  nocookie: boolean;
  origin?: string;
  playlist?: string;
  progressBarColor?: string;
  width: number;
}

export const Youtube = Node.create<YoutubeOptions>({
  name: "youtube",

  addOptions() {
    return {
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: 480,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      HTMLAttributes: {},
      inline: false,
      nocookie: false,
      origin: undefined,
      playlist: undefined,
      progressBarColor: undefined,
      width: 640,
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-youtube-video] iframe",
      },
    ];
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options: { src: string }) =>
        ({ commands }) => {
          if (!isValidYoutubeUrl(options.src)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
    });

    HTMLAttributes.src = embedUrl;

    return [
      "div",
      { "data-youtube-video": "" },
      [
        "iframe",
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            width: this.options.width,
            height: this.options.height,
            allowfullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor,
          },
          HTMLAttributes
        ),
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeNodeView);
  },
});

export const YOUTUBE_REGEX_GLOBAL =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/g;

export const isValidYoutubeUrl = (url: string) => {
  return url.match(YOUTUBE_REGEX_GLOBAL);
};

interface GetEmbedUrlOptions {
  url: string;
  allowFullscreen?: boolean;
  autoplay?: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls?: boolean;
  disableKBcontrols?: boolean;
  enableIFrameApi?: boolean;
  endTime?: number;
  interfaceLanguage?: string;
  ivLoadPolicy?: number;
  loop?: boolean;
  modestBranding?: boolean;
  nocookie?: boolean;
  origin?: string;
  playlist?: string;
  progressBarColor?: string;
  startAt?: number;
}

export const getEmbedUrlFromYoutubeUrl = (
  options: GetEmbedUrlOptions
): string | null => {
  const {
    url,
    allowFullscreen,
    autoplay,
    ccLanguage,
    ccLoadPolicy,
    controls,
    disableKBcontrols,
    enableIFrameApi,
    endTime,
    interfaceLanguage,
    ivLoadPolicy,
    loop,
    modestBranding,
    nocookie,
    origin,
    playlist,
    progressBarColor,
    startAt,
  } = options;

  // if is already an embed url, return it
  if (url.includes("/embed/")) {
    return url;
  }

  // if is a youtu.be url, get the id after the /
  if (url.includes("youtu.be")) {
    const id = url.split("/").pop();
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  }

  // if is a youtube.com/watch?v= url, get the id
  const videoIdRegex = /v=([-\w]+)/gm;
  const matches = videoIdRegex.exec(url);
  if (!matches || !matches[1]) return null;

  let outputUrl = `https://www.youtube.com/embed/${matches[1]}`;

  const params: string[] = [];

  if (allowFullscreen === false) {
    params.push("fs=0");
  }

  if (autoplay) {
    params.push("autoplay=1");
  }

  if (ccLanguage) {
    params.push(`cc_lang_pref=${ccLanguage}`);
  }

  if (ccLoadPolicy) {
    params.push("cc_load_policy=1");
  }

  if (!controls) {
    params.push("controls=0");
  }

  if (disableKBcontrols) {
    params.push("disablekb=1");
  }

  if (enableIFrameApi) {
    params.push("enablejsapi=1");
  }

  if (endTime) {
    params.push(`end=${endTime}`);
  }

  if (interfaceLanguage) {
    params.push(`hl=${interfaceLanguage}`);
  }

  if (ivLoadPolicy) {
    params.push(`iv_load_policy=${ivLoadPolicy}`);
  }

  if (loop) {
    params.push("loop=1");
  }

  if (modestBranding) {
    params.push("modestbranding=1");
  }

  if (origin) {
    params.push(`origin=${origin}`);
  }

  if (playlist) {
    params.push(`playlist=${playlist}`);
  }

  if (startAt) {
    params.push(`start=${startAt}`);
  }

  if (progressBarColor) {
    params.push(`color=${progressBarColor}`);
  }

  if (params.length) {
    outputUrl += `?${params.join("&")}`;
  }

  return outputUrl;
};
