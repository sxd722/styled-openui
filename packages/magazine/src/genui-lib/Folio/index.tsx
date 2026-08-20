"use client";

import { defineComponent } from "@openuidev/react-lang";
import { FolioSchema } from "./schema";

export { FolioSchema } from "./schema";

export type MagazineFolioProps = {
  section?: string;
  page?: string;
  position?: "top" | "bottom";
};

export function MagazineFolioView({ section, page, position = "bottom" }: MagazineFolioProps) {
  return (
    <div className={`openui-mag-folio openui-mag-folio-${position}`} role="contentinfo">
      <span className="openui-mag-folio__section">{section ?? ""}</span>
      {page ? <span className="openui-mag-folio__page">{page}</span> : null}
    </div>
  );
}

export const Folio = defineComponent({
  name: "Folio",
  props: FolioSchema,
  description:
    'Folio — running head with page number. position: "bottom" (default) | "top". section: publication or article name; page: page label (e.g. "12", "XII"). Use on article pages.',
  component: ({ props }) => (
    <MagazineFolioView section={props.section} page={props.page} position={props.position} />
  ),
});
