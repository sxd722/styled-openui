import { describe, expect, it } from "vitest";

import {
  magazineAdditionalRules,
  magazineExamples,
  magazineLibrary,
  magazinePreamble,
  magazinePromptOptions,
} from "../src";

const EXPECTED_COMPONENTS = [
  "Spread",
  "Headline",
  "Standfirst",
  "Byline",
  "DropCap",
  "Prose",
  "PullQuote",
  "Crosshead",
  "Divider",
  "Figure",
  "BleedImage",
  "Folio",
  "Footnote",
  "Sidenote",
  "Masthead",
  "MagazineCover",
  "Contents",
  "ContentsItem",
  "ArticleCard",
  "ReadingProgress",
  "CoverWidget",
  "QuoteWidget",
  "ContentsWidget",
  "DateWidget",
];

describe("magazineLibrary", () => {
  it("uses Spread as the root component", () => {
    expect(magazineLibrary.root).toBe("Spread");
  });

  it("registers every magazine component", () => {
    const names = Object.keys(magazineLibrary.components);
    for (const name of EXPECTED_COMPONENTS) {
      expect(names).toContain(name);
    }
    expect(names).toHaveLength(EXPECTED_COMPONENTS.length);
  });

  it("groups components for the prompt", () => {
    const groups = magazineLibrary.componentGroups ?? [];
    const groupNames = groups.map((g) => g.name);
    expect(groupNames).toContain("Publication");
    expect(groupNames).toContain("Typography");
    expect(groups.every((g) => g.components.length > 0)).toBe(true);
  });

  it("serializes to JSON schema with descriptions", () => {
    const schema = magazineLibrary.toJSONSchema();
    for (const name of EXPECTED_COMPONENTS) {
      expect(schema.$defs?.[name]).toBeDefined();
    }
    expect(schema.$defs?.DropCap?.description).toContain("drop cap");
  });
});

describe("magazineLibrary.prompt()", () => {
  const prompt = magazineLibrary.prompt(magazinePromptOptions);

  it("includes the editorial preamble", () => {
    expect(prompt).toContain(magazinePreamble.slice(0, 40));
  });

  it("includes every component signature", () => {
    expect(prompt).toContain("Spread(");
    expect(prompt).toContain("Headline(");
    expect(prompt).toContain("DropCap(");
    expect(prompt).toContain("PullQuote(");
    expect(prompt).toContain("QuoteWidget(");
  });

  it("carries the magazine craft rules", () => {
    expect(prompt).toContain("45–75 characters");
    expect(prompt).toContain("exactly once per article");
    expect(prompt).toContain("300–500 words");
    for (const rule of magazineAdditionalRules) {
      expect(prompt).toContain(rule);
    }
  });

  it("carries the composition examples", () => {
    for (const example of magazineExamples) {
      expect(prompt).toContain(example.slice(0, 30));
    }
    expect(prompt).toContain('headline = Headline("The Quiet Craft of Type", "display"');
  });
});
