"use client";

import { defineComponent } from "@openuidev/react-lang";
import { PullQuoteSchema } from "./schema";

export { PullQuoteSchema } from "./schema";

export type MagazinePullQuoteProps = {
  text: string;
  attribution?: string;
  variant?: "center" | "edge" | "marker";
};

export function MagazinePullQuoteView({
  text,
  attribution,
  variant = "center",
}: MagazinePullQuoteProps) {
  return (
    <blockquote className={`openui-mag-pullquote openui-mag-pullquote-${variant}`}>
      {variant === "marker" ? (
        <span className="openui-mag-pullquote__mark" aria-hidden>
          “
        </span>
      ) : null}
      <p className="openui-mag-pullquote__text">{text}</p>
      {attribution ? (
        <footer className="openui-mag-pullquote__attribution">{attribution}</footer>
      ) : null}
    </blockquote>
  );
}

export const PullQuote = defineComponent({
  name: "PullQuote",
  props: PullQuoteSchema,
  description:
    'Pull quote — repeats ONE key sentence from the article for emphasis; never introduces new information. Max one per screen. variant: "center" (default — rules above/below, spans all columns) | "edge" (accent bar, stays in the column flow) | "marker" (giant quote glyph, spans all columns). Optional attribution.',
  component: ({ props }) => (
    <MagazinePullQuoteView
      text={props.text}
      attribution={props.attribution}
      variant={props.variant}
    />
  ),
});
