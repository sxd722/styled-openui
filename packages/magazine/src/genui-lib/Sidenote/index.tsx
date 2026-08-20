"use client";

import { defineComponent } from "@openuidev/react-lang";
import { SidenoteSchema } from "./schema";

export { SidenoteSchema } from "./schema";

export type MagazineSidenoteProps = {
  text: string;
};

export function MagazineSidenoteView({ text }: MagazineSidenoteProps) {
  return <aside className="openui-mag-sidenote">{text}</aside>;
}

export const Sidenote = defineComponent({
  name: "Sidenote",
  props: SidenoteSchema,
  description:
    "Sidenote — a margin note set beside the body text (floats to the column edge with an accent bar). Use for asides and commentary, not citations.",
  component: ({ props }) => <MagazineSidenoteView text={props.text} />,
});
