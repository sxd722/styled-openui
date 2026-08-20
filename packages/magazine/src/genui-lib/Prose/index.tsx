"use client";

import { defineComponent } from "@openuidev/react-lang";
import { ProseSchema } from "./schema";
import { renderParagraphs } from "@openui-style/core";

export { ProseSchema } from "./schema";

export type MagazineProseProps = {
  text: string;
  indent?: boolean;
  hyphenate?: boolean;
};

export function MagazineProseView({ text, indent = false, hyphenate = false }: MagazineProseProps) {
  const classes = ["openui-mag-prose"];
  if (indent) classes.push("openui-mag-prose-indent");
  if (hyphenate) classes.push("openui-mag-prose-hyphenate");
  return <div className={classes.join(" ")}>{renderParagraphs(String(text ?? ""))}</div>;
}

export const Prose = defineComponent({
  name: "Prose",
  props: ProseSchema,
  description:
    'Body copy block. Paragraphs split on blank lines; supports *italic*, **bold**, [link](url). indent: first-line indents instead of paragraph gaps (book-like). hyphenate: justified text with automatic hyphenation for long English words — keep false (default) for CJK. Column width (measure 45–75 chars) is controlled by the Spread column count.',
  component: ({ props }) => (
    <MagazineProseView text={props.text} indent={props.indent} hyphenate={props.hyphenate} />
  ),
});
