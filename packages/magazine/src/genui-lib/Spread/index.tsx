"use client";

import React from "react";
import { defineComponent } from "@openuidev/react-lang";
import { SpreadSchema } from "./schema";

export { SpreadSchema } from "./schema";

export type MagazineSpreadProps = {
  children?: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "normal" | "wide";
  bleed?: boolean;
  tone?: "paper" | "white";
};

export function MagazineSpreadView({
  children,
  columns = 2,
  gap = "normal",
  bleed = false,
  tone = "paper",
}: MagazineSpreadProps) {
  const classes = [
    "openui-mag-spread",
    `openui-mag-spread-${columns}col`,
    `openui-mag-tone-${tone}`,
  ];
  if (gap === "wide") classes.push("openui-mag-spread-widegap");
  if (bleed) classes.push("openui-mag-spread-bleed");
  return <section className={classes.join(" ")}>{children}</section>;
}

export const Spread = defineComponent({
  name: "Spread",
  props: SpreadSchema,
  description:
    'Magazine page — the root container. Content flows through print-style columns like a real page. columns: 1 | 2 (default — essays) | 3 (feature pages) | 4 (dense news grids); responsive (4→2→1). gap: "normal" | "wide". bleed: images run to the page edge. tone: "paper" (warm off-white, default) | "white".',
  component: ({ props, renderNode }) => (
    <MagazineSpreadView
      columns={props.columns}
      gap={props.gap}
      bleed={props.bleed}
      tone={props.tone}
    >
      {renderNode(props.children)}
    </MagazineSpreadView>
  ),
});
