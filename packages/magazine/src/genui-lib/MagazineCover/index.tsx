"use client";

import { defineComponent } from "@openuidev/react-lang";
import { MagazineCoverSchema } from "./schema";

export { MagazineCoverSchema } from "./schema";

export type MagazineCoverProps = {
  url: string;
  title: string;
  headline?: string;
  issue?: string;
  tone?: "color" | "mono";
};

export function MagazineCoverView({
  url,
  title,
  headline,
  issue,
  tone = "color",
}: MagazineCoverProps) {
  return (
    <figure className={`openui-mag-cover openui-mag-cover-${tone}`}>
      <img src={url} alt={`${title} cover`} loading="lazy" decoding="async" />
      <div className="openui-mag-cover__masthead">
        <span className="openui-mag-cover__issue">{issue ?? ""}</span>
        <h2 className="openui-mag-cover__title">{title}</h2>
      </div>
      {headline ? (
        <figcaption className="openui-mag-cover__headline">{headline}</figcaption>
      ) : null}
    </figure>
  );
}

export const MagazineCover = defineComponent({
  name: "MagazineCover",
  props: MagazineCoverSchema,
  description:
    'Full-bleed magazine cover (3:4). title: publication name set at the top in white display serif; headline: cover line over a gradient at the bottom; issue: issue label top-right. tone: "color" | "mono".',
  component: ({ props }) => (
    <MagazineCoverView
      url={props.url}
      title={props.title}
      headline={props.headline}
      issue={props.issue}
      tone={props.tone}
    />
  ),
});
