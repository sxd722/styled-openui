"use client";

import { defineComponent } from "@openuidev/react-lang";
import { DropCapSchema } from "./schema";
import { renderInlineMarkup } from "@openui-style/core";

export { DropCapSchema } from "./schema";

export type MagazineDropCapProps = {
  text: string;
  lines?: 2 | 3;
  variant?: "ink" | "accent";
};

export function MagazineDropCapView({ text, lines = 2, variant = "ink" }: MagazineDropCapProps) {
  return (
    <p
      className={`openui-mag-dropcap openui-mag-dropcap-${lines}lines openui-mag-dropcap-${variant}`}
    >
      {renderInlineMarkup(String(text ?? ""))}
    </p>
  );
}

export const DropCap = defineComponent({
  name: "DropCap",
  props: DropCapSchema,
  description:
    'Opening paragraph with a drop cap. lines: 2 (default) | 3 — how many text lines the cap occupies. variant: "ink" (default) | "accent" — cap color. Use exactly once per article, on the first paragraph.',
  component: ({ props }) => (
    <MagazineDropCapView text={props.text} lines={props.lines} variant={props.variant} />
  ),
});
