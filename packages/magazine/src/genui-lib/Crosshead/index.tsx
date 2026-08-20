"use client";

import { defineComponent } from "@openuidev/react-lang";
import { CrossheadSchema } from "./schema";

export { CrossheadSchema } from "./schema";

export type MagazineCrossheadProps = {
  text: string;
  style?: "centered" | "rule" | "numbered";
  number?: string;
};

export function MagazineCrossheadView({
  text,
  style = "rule",
  number,
}: MagazineCrossheadProps) {
  return (
    <div className={`openui-mag-crosshead openui-mag-crosshead-${style}`}>
      {style === "numbered" && number ? (
        <span className="openui-mag-crosshead__number">{number}</span>
      ) : null}
      <span className="openui-mag-crosshead__text">{text}</span>
    </div>
  );
}

export const Crosshead = defineComponent({
  name: "Crosshead",
  props: CrossheadSchema,
  description:
    'Crosshead — small section break inside long prose (every 300–500 words). style: "rule" (default — small caps between hairlines) | "centered" | "numbered" (needs number, e.g. "II").',
  component: ({ props }) => (
    <MagazineCrossheadView text={props.text} style={props.style} number={props.number} />
  ),
});
