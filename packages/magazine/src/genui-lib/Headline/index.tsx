"use client";

import { defineComponent } from "@openuidev/react-lang";
import { HeadlineSchema } from "./schema";

export { HeadlineSchema } from "./schema";

export type MagazineHeadlineProps = {
  text: string;
  level?: "display" | "title" | "subtitle";
  kicker?: string;
  align?: "left" | "center" | "right";
};

export function MagazineHeadlineView({ text, level = "title", kicker, align = "left" }: MagazineHeadlineProps) {
  const Tag = level === "display" ? "h1" : level === "title" ? "h2" : "h3";
  return (
    <header className={`openui-mag-headline openui-mag-headline-${level} openui-mag-headline-${align}`}>
      {kicker ? <p className="openui-mag-headline__kicker">{kicker}</p> : null}
      <Tag className="openui-mag-headline__text">{text}</Tag>
    </header>
  );
}

export const Headline = defineComponent({
  name: "Headline",
  props: HeadlineSchema,
  description:
    'Serif display headline. level: "display" (56px — one per page, for the lead story) | "title" (32px, default — section leads) | "subtitle" (24px — inside articles). Optional kicker: small-caps eyebrow label above (e.g. section or theme). align: "left" | "center" | "right" (default "left").',
  component: ({ props }) => (
    <MagazineHeadlineView
      text={props.text}
      level={props.level}
      kicker={props.kicker}
      align={props.align}
    />
  ),
});
