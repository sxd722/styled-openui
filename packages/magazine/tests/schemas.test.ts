import { describe, expect, it } from "vitest";

import {
  ArticleCardSchema,
  BleedImageSchema,
  BylineSchema,
  ContentsItemSchema,
  ContentsWidgetSchema,
  CoverWidgetSchema,
  CrossheadSchema,
  DateWidgetSchema,
  DividerSchema,
  DropCapSchema,
  FigureSchema,
  FolioSchema,
  FootnoteSchema,
  HeadlineSchema,
  MagazineCoverSchema,
  MastheadSchema,
  ProseSchema,
  PullQuoteSchema,
  QuoteWidgetSchema,
  ReadingProgressSchema,
  SidenoteSchema,
  SpreadSchema,
  StandfirstSchema,
} from "../src";

describe("component schemas", () => {
  it("Headline accepts valid props and rejects bad levels", () => {
    expect(HeadlineSchema.safeParse({ text: "Hello" }).success).toBe(true);
    expect(
      HeadlineSchema.safeParse({ text: "Hello", level: "display", kicker: "News", align: "center" })
        .success,
    ).toBe(true);
    expect(HeadlineSchema.safeParse({ text: "Hello", level: "mega" }).success).toBe(false);
    expect(HeadlineSchema.safeParse({}).success).toBe(false);
  });

  it("DropCap only allows 2 or 3 lines", () => {
    expect(DropCapSchema.safeParse({ text: "x", lines: 2 }).success).toBe(true);
    expect(DropCapSchema.safeParse({ text: "x", lines: 3 }).success).toBe(true);
    expect(DropCapSchema.safeParse({ text: "x", lines: 5 }).success).toBe(false);
    expect(DropCapSchema.safeParse({ text: "x", variant: "accent" }).success).toBe(true);
    expect(DropCapSchema.safeParse({ text: "x", variant: "purple" }).success).toBe(false);
  });

  it("Prose flags are optional booleans", () => {
    expect(ProseSchema.safeParse({ text: "body" }).success).toBe(true);
    expect(ProseSchema.safeParse({ text: "body", indent: true, hyphenate: false }).success).toBe(
      true,
    );
    expect(ProseSchema.safeParse({ text: "body", indent: "yes" }).success).toBe(false);
  });

  it("Figure enums cover wrap/size/tone", () => {
    const valid = {
      url: "https://picsum.photos/seed/x/800/600",
      caption: "A caption",
      credit: "Photograph: X",
      wrap: "left",
      size: "small",
      tone: "mono",
    };
    expect(FigureSchema.safeParse(valid).success).toBe(true);
    expect(FigureSchema.safeParse({ ...valid, wrap: "up" }).success).toBe(false);
    expect(FigureSchema.safeParse({ caption: "no url" }).success).toBe(false);
  });

  it("Spread columns are 1–4", () => {
    expect(SpreadSchema.safeParse({ children: [], columns: 4 }).success).toBe(true);
    expect(SpreadSchema.safeParse({ children: [], columns: 5 }).success).toBe(false);
  });

  it("widget schemas validate their variants", () => {
    expect(
      QuoteWidgetSchema.safeParse({ title: "The Magazine", quote: "A line", attribution: "Anon" })
        .success,
    ).toBe(true);
    expect(
      CoverWidgetSchema.safeParse({
        title: "The Magazine",
        image: "https://picsum.photos/seed/x/600/800",
        issue: "No. 12",
        headline: "h",
      }).success,
    ).toBe(true);
    expect(
      ContentsWidgetSchema.safeParse({ title: "T", items: ["a", "b"] }).success,
    ).toBe(true);
    expect(
      DateWidgetSchema.safeParse({ title: "T", date: "19 August 2026", day: 19 }).success,
    ).toBe(true);
    expect(
      ContentsWidgetSchema.safeParse({ title: "T", items: "not-an-array" }).success,
    ).toBe(false);
  });

  it("remaining leaf schemas validate happy paths", () => {
    expect(StandfirstSchema.safeParse({ text: "deck" }).success).toBe(true);
    expect(BylineSchema.safeParse({ author: "Ada", role: "Editor", date: "2026" }).success).toBe(
      true,
    );
    expect(PullQuoteSchema.safeParse({ text: "q", variant: "edge" }).success).toBe(true);
    expect(CrossheadSchema.safeParse({ text: "Part I", style: "numbered", number: "I" }).success)
      .toBe(true);
    expect(DividerSchema.safeParse({ style: "ornament", ornament: "✳" }).success).toBe(true);
    expect(BleedImageSchema.safeParse({ url: "u", overlay: "text", height: "tall" }).success).toBe(
      true,
    );
    expect(FolioSchema.safeParse({ section: "Features", page: "12", position: "top" }).success)
      .toBe(true);
    expect(FootnoteSchema.safeParse({ text: "note", marker: "1" }).success).toBe(true);
    expect(SidenoteSchema.safeParse({ text: "aside" }).success).toBe(true);
    expect(MastheadSchema.safeParse({ title: "The Magazine", issue: "No. 12" }).success).toBe(true);
    expect(
      MagazineCoverSchema.safeParse({ url: "u", title: "The Magazine", headline: "h" }).success,
    ).toBe(true);
    expect(ContentsItemSchema.safeParse({ title: "Story", section: "Essay", page: "8" }).success)
      .toBe(true);
    expect(
      ArticleCardSchema.safeParse({
        headline: "H",
        standfirst: "s",
        category: "Design",
        layout: "side",
        tone: "mono",
      }).success,
    ).toBe(true);
    expect(ReadingProgressSchema.safeParse({ height: 3, variant: "accent" }).success).toBe(true);
  });
});
