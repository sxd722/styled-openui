"use client";

import { defineComponent } from "@openuidev/react-lang";
import { DividerSchema } from "./schema";

export { DividerSchema } from "./schema";

export type MagazineDividerProps = {
  style?: "hair" | "double" | "dotted" | "ornament" | "space";
  ornament?: string;
};

export function MagazineDividerView({ style = "hair", ornament }: MagazineDividerProps) {
  if (style === "ornament") {
    return (
      <div className="openui-mag-divider openui-mag-divider-ornament" role="separator">
        <span className="openui-mag-divider__line" aria-hidden />
        <span className="openui-mag-divider__glyph">{ornament ?? "❦"}</span>
        <span className="openui-mag-divider__line" aria-hidden />
      </div>
    );
  }
  return <hr className={`openui-mag-divider openui-mag-divider-${style}`} />;
}

export const Divider = defineComponent({
  name: "Divider",
  props: DividerSchema,
  description:
    'Horizontal rule. style: "hair" (default — 1px) | "double" | "dotted" | "ornament" (centered glyph between hairlines — default ❦, override with ornament) | "space" (whitespace only).',
  component: ({ props }) => <MagazineDividerView style={props.style} ornament={props.ornament} />,
});
