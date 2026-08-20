"use client";

import { defineComponent } from "@openuidev/react-lang";
import { StandfirstSchema } from "./schema";
import { renderInlineMarkup } from "@openui-style/core";

export { StandfirstSchema } from "./schema";

export type MagazineStandfirstProps = {
  text: string;
  align?: "left" | "center" | "right";
};

export function MagazineStandfirstView({ text, align = "left" }: MagazineStandfirstProps) {
  return (
    <p className={`openui-mag-standfirst openui-mag-standfirst-${align}`}>
      {renderInlineMarkup(String(text ?? ""))}
    </p>
  );
}

export const Standfirst = defineComponent({
  name: "Standfirst",
  props: StandfirstSchema,
  description:
    'Standfirst (deck) — the intro sentence under a headline that sells the story. Serif, secondary color. align: "left" | "center" | "right" (default "left"). Match the headline align.',
  component: ({ props }) => <MagazineStandfirstView text={props.text} align={props.align} />,
});
