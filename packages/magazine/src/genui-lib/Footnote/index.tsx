"use client";

import { defineComponent } from "@openuidev/react-lang";
import { FootnoteSchema } from "./schema";

export { FootnoteSchema } from "./schema";

export type MagazineFootnoteProps = {
  text: string;
  marker?: string;
};

export function MagazineFootnoteView({ text, marker }: MagazineFootnoteProps) {
  return (
    <aside className="openui-mag-footnote">
      {marker ? <sup className="openui-mag-footnote__marker">{marker}</sup> : null}
      <span className="openui-mag-footnote__text">{text}</span>
    </aside>
  );
}

export const Footnote = defineComponent({
  name: "Footnote",
  props: FootnoteSchema,
  description:
    "Footnote — small-print note at the end of a passage. Optional marker (superscript number, e.g. \"1\" or \"*\").",
  component: ({ props }) => <MagazineFootnoteView text={props.text} marker={props.marker} />,
});
