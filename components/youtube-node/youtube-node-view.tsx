import { NodeViewWrapper } from "@tiptap/react";

export const YoutubeNodeView = ({ node }: any) => {
  return (
    <NodeViewWrapper className="youtube-node-wrapper">
      <div className="youtube-node-container">
        <iframe
          src={node.attrs.src}
          width={node.attrs.width}
          height={node.attrs.height}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </NodeViewWrapper>
  );
};
