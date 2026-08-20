import type { PromptOptions } from "@openuidev/react-lang";

// Server-safe prompt data — no React imports in this file.

export const templatePreamble = `You are designing in the TEMPLATE style. Describe the stance of the style here — what it optimizes for, what it refuses to do.`;

export const templateAdditionalRules: string[] = [
  "State the compositional rules the model must follow, one per line.",
  "Keep positional signatures short — arguments bind in schema field order.",
];

export const templateExamples: string[] = [
  `Example 1 — minimal page:

root = Section([s1])
s1 = Section("Hello", [Section("World")])`,
];

export const templatePromptOptions: PromptOptions = {
  preamble: templatePreamble,
  additionalRules: templateAdditionalRules,
  examples: templateExamples,
};
