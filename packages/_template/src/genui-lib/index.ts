"use client";

import { createStyleLibrary } from "@openui-style/core";

import { Section } from "./Section";

export * from "./unions";
export * from "./Section";

const templateComponentGroups = [
  {
    name: "Layout",
    components: ["Section"],
    notes: ["Section is a placeholder — replace with your components."],
  },
];

/** The TEMPLATE-style component library for OpenUI. */
export const templateLibrary = createStyleLibrary({
  styleId: "openui-style/TEMPLATE",
  root: "Section",
  componentGroups: templateComponentGroups,
  components: [Section],
});
