"use client";

import type { ReactNode } from "react";
import { defineComponent } from "@openuidev/react-lang";
import { SectionSchema } from "./schema";

export { SectionSchema } from "./schema";

export type TemplateSectionProps = {
  title?: string;
  children?: ReactNode;
};

export function TemplateSectionView({ title, children }: TemplateSectionProps) {
  return (
    <section className="openui-TEMPLATE-section">
      {title ? <h2 className="openui-TEMPLATE-section__title">{title}</h2> : null}
      {children}
    </section>
  );
}

export const Section = defineComponent({
  name: "Section",
  props: SectionSchema,
  description: "EXAMPLE COMPONENT — replace with your style's real components.",
  component: ({ props, renderNode }) => (
    <TemplateSectionView title={props.title}>{renderNode(props.children)}</TemplateSectionView>
  ),
});
