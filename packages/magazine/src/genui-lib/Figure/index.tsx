"use client";

import { defineComponent } from "@openuidev/react-lang";
import { FigureSchema } from "./schema";

export { FigureSchema } from "./schema";

export type MagazineFigureProps = {
  url: string;
  alt?: string;
  caption?: string;
  credit?: string;
  wrap?: "none" | "left" | "right";
  size?: "small" | "medium" | "large";
  tone?: "color" | "mono";
};

export function MagazineFigureView({
  url,
  alt,
  caption,
  credit,
  wrap = "none",
  size = "medium",
  tone = "color",
}: MagazineFigureProps) {
  return (
    <figure
      className={[
        "openui-mag-figure",
        `openui-mag-figure-wrap-${wrap}`,
        `openui-mag-figure-${size}`,
        `openui-mag-figure-${tone}`,
      ].join(" ")}
    >
      <img src={url} alt={alt ?? ""} loading="lazy" decoding="async" />
      {caption || credit ? (
        <figcaption className="openui-mag-figure__caption">
          {caption ? <span className="openui-mag-figure__caption-text">{caption}</span> : null}
          {credit ? <span className="openui-mag-figure__credit">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const Figure = defineComponent({
  name: "Figure",
  props: FigureSchema,
  description:
    'Image framed by whitespace with a small sans caption. wrap: "none" (default) | "left" | "right" — floats the image so body text runs around it (magazine text wrap). size: "small" (40% of column) | "medium" (55%, default) | "large" (fills the column). tone: "color" | "mono" (black & white treatment). Always provide caption; add credit (e.g. "Photograph: X Agency") when the source is known.',
  component: ({ props }) => (
    <MagazineFigureView
      url={props.url}
      alt={props.alt}
      caption={props.caption}
      credit={props.credit}
      wrap={props.wrap}
      size={props.size}
      tone={props.tone}
    />
  ),
});
