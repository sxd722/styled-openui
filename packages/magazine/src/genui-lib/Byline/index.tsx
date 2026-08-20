"use client";

import { defineComponent } from "@openuidev/react-lang";
import { BylineSchema } from "./schema";

export { BylineSchema } from "./schema";

export type MagazineBylineProps = {
  author: string;
  role?: string;
  date?: string;
};

export function MagazineBylineView({ author, role, date }: MagazineBylineProps) {
  const parts: string[] = [`By ${author}`];
  if (role) parts.push(role);
  if (date) parts.push(date);
  return (
    <div className="openui-mag-byline">
      {parts.map((part, i) => (
        <span key={i} className="openui-mag-byline__part">
          {i > 0 ? <span className="openui-mag-byline__dot" aria-hidden> · </span> : null}
          {part}
        </span>
      ))}
    </div>
  );
}

export const Byline = defineComponent({
  name: "Byline",
  props: BylineSchema,
  description:
    "Byline — author credit line under the standfirst: \"By {author}\" plus optional role and date, separated by middots. Placed between Standfirst and DropCap.",
  component: ({ props }) => (
    <MagazineBylineView author={props.author} role={props.role} date={props.date} />
  ),
});
