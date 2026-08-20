"use client";

import { defineComponent } from "@openuidev/react-lang";
import { MastheadSchema } from "./schema";

export { MastheadSchema } from "./schema";

export type MagazineMastheadProps = {
  title: string;
  tagline?: string;
  issue?: string;
  date?: string;
};

export function MagazineMastheadView({ title, tagline, issue, date }: MagazineMastheadProps) {
  return (
    <header className="openui-mag-masthead">
      <div className="openui-mag-masthead__meta">
        <span>{issue ?? ""}</span>
        {issue && date ? <span aria-hidden>·</span> : null}
        <span>{date ?? ""}</span>
      </div>
      <h1 className="openui-mag-masthead__title">{title}</h1>
      {tagline ? <p className="openui-mag-masthead__tagline">{tagline}</p> : null}
    </header>
  );
}

export const Masthead = defineComponent({
  name: "Masthead",
  props: MastheadSchema,
  description:
    "Publication masthead (logotype block): serif title between double rules, issue and date above in small caps, optional tagline below. One per issue or front page.",
  component: ({ props }) => (
    <MagazineMastheadView
      title={props.title}
      tagline={props.tagline}
      issue={props.issue}
      date={props.date}
    />
  ),
});
