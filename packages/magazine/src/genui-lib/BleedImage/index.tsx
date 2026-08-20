"use client";

import { defineComponent } from "@openuidev/react-lang";
import { BleedImageSchema } from "./schema";

export { BleedImageSchema } from "./schema";

export type MagazineBleedImageProps = {
  url: string;
  alt?: string;
  overlay?: string;
  height?: "short" | "medium" | "tall";
  tone?: "color" | "mono";
};

export function MagazineBleedImageView({
  url,
  alt,
  overlay,
  height = "medium",
  tone = "color",
}: MagazineBleedImageProps) {
  return (
    <figure
      className={`openui-mag-bleed-image openui-mag-bleed-image-${height} openui-mag-bleed-image-${tone}`}
    >
      <img src={url} alt={alt ?? ""} loading="lazy" decoding="async" />
      {overlay ? (
        <figcaption className="openui-mag-bleed-image__overlay">{overlay}</figcaption>
      ) : null}
    </figure>
  );
}

export const BleedImage = defineComponent({
  name: "BleedImage",
  props: BleedImageSchema,
  description:
    'Full-bleed image running to the page edges — the visual anchor of a page. Spans all columns. height: "short" | "medium" (default) | "tall". Optional overlay: text set over a gradient mask. tone: "color" | "mono". Use at most one per page.',
  component: ({ props }) => (
    <MagazineBleedImageView
      url={props.url}
      alt={props.alt}
      overlay={props.overlay}
      height={props.height}
      tone={props.tone}
    />
  ),
});
