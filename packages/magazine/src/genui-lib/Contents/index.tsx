"use client";

import { z } from "zod/v4";
import { defineComponent } from "@openuidev/react-lang";
import { ContentsItemSchema } from "./schema";

export { ContentsItemSchema } from "./schema";

export type MagazineContentsItem = {
  title: string;
  section?: string;
  page?: string;
};

export type MagazineContentsProps = {
  heading?: string;
  items?: MagazineContentsItem[];
};

export function MagazineContentsView({ heading, items }: MagazineContentsProps) {
  return (
    <nav className="openui-mag-contents" aria-label={heading ?? "Contents"}>
      {heading ? <h2 className="openui-mag-contents__heading">{heading}</h2> : null}
      <ol className="openui-mag-contents__list">
        {(items ?? []).map((item, i) => (
          <li key={i} className="openui-mag-contents__item">
            <span className="openui-mag-contents__number">{String(i + 1).padStart(2, "0")}</span>
            <span className="openui-mag-contents__title">
              {item.title}
              {item.section ? (
                <em className="openui-mag-contents__section">{item.section}</em>
              ) : null}
            </span>
            <span className="openui-mag-contents__leader" aria-hidden />
            <span className="openui-mag-contents__page">{item.page ?? ""}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * ContentsItem is a sub-component of Contents — like Table's Col, it only
 * carries data into its parent and has no standalone rendering.
 */
export const ContentsItem = defineComponent({
  name: "ContentsItem",
  props: ContentsItemSchema,
  description:
    'Entry in a Contents list. title (required), optional section and page label (e.g. "12").',
  component: () => null,
});

const ContentsSchema = z.object({
  heading: z.string().optional(),
  items: z.array(ContentsItem.ref),
});

export const Contents = defineComponent({
  name: "Contents",
  props: ContentsSchema,
  description:
    'Table of contents with dotted leaders and numbered entries. heading: e.g. "In This Issue". items: ContentsItem(title, section?, page?) array.',
  component: ({ props }) => {
    const items = (props.items as unknown[] | undefined)
      ?.filter((item) => item != null && (item as any).props)
      .map((item) => (item as any).props as MagazineContentsItem);
    return <MagazineContentsView heading={props.heading} items={items} />;
  },
});
