"use client";

import { createStyleLibrary } from "@openui-style/core";

import { ArticleCard } from "./ArticleCard";
import { BleedImage } from "./BleedImage";
import { Byline } from "./Byline";
import { Contents, ContentsItem } from "./Contents";
import { Crosshead } from "./Crosshead";
import { Divider } from "./Divider";
import { DropCap } from "./DropCap";
import { Figure } from "./Figure";
import { Folio } from "./Folio";
import { Footnote } from "./Footnote";
import { Headline } from "./Headline";
import { MagazineCover } from "./MagazineCover";
import {
  ContentsWidget,
  CoverWidget,
  DateWidget,
  QuoteWidget,
} from "./MagazineWidget";
import { Masthead } from "./Masthead";
import { Prose } from "./Prose";
import { PullQuote } from "./PullQuote";
import { ReadingProgress } from "./ReadingProgress";
import { Sidenote } from "./Sidenote";
import { Spread } from "./Spread";
import { Standfirst } from "./Standfirst";

export * from "./unions";
export * from "./ArticleCard";
export * from "./BleedImage";
export * from "./Byline";
export * from "./Contents";
export * from "./Crosshead";
export * from "./Divider";
export * from "./DropCap";
export * from "./Figure";
export * from "./Folio";
export * from "./Footnote";
export * from "./Headline";
export * from "./MagazineCover";
export * from "./MagazineWidget";
export * from "./Masthead";
export * from "./Prose";
export * from "./PullQuote";
export * from "./ReadingProgress";
export * from "./Sidenote";
export * from "./Spread";
export * from "./Standfirst";

const magazineComponentGroups = [
  {
    name: "Publication",
    components: [
      "Masthead",
      "MagazineCover",
      "Contents",
      "ArticleCard",
      "Folio",
      "CoverWidget",
      "QuoteWidget",
      "ContentsWidget",
      "DateWidget",
    ],
    notes: [
      "Masthead, MagazineCover and Contents build the front of an issue; ArticleCard fills grids of story cards; Folio is the running head on article pages.",
      'Contents takes ContentsItem entries: contents = Contents("In This Issue", [c1, c2]) where c1 = ContentsItem("Story title", "Features", "12").',
      "The four *Widget components render 2x4 phone home-screen widgets — pick one per surface, keep text under ~60 characters.",
    ],
  },
  {
    name: "Page layout",
    components: ["Spread", "Figure", "BleedImage"],
    notes: [
      "Spread is the page — content flows through print-style columns. 2 columns for essays, 3 for feature pages, 4 for dense news grids.",
      "Figure with wrap left/right floats so body text runs around it; BleedImage runs to the page edges and spans all columns.",
    ],
  },
  {
    name: "Typography",
    components: [
      "Headline",
      "Standfirst",
      "Byline",
      "DropCap",
      "Prose",
      "PullQuote",
      "Crosshead",
      "Divider",
    ],
    notes: [
      "Article order: Headline → Standfirst → Byline → DropCap → Prose (interleave Figure, PullQuote, Crosshead) → Footnote → Folio.",
      "DropCap appears exactly once per article, on the opening paragraph. PullQuote repeats one key sentence from the body — never new information.",
    ],
  },
  {
    name: "Notes",
    components: ["Footnote", "Sidenote"],
    notes: [
      "Footnote for citations at the end of a passage; Sidenote for commentary that floats beside the text.",
    ],
  },
  {
    name: "Reading UX",
    components: ["ReadingProgress"],
    notes: ["One ReadingProgress per article page, as the first child of Spread."],
  },
];

/** The magazine editorial component library for OpenUI. */
export const magazineLibrary = createStyleLibrary({
  styleId: "openui-style/magazine",
  root: "Spread",
  subComponents: ["ContentsItem"],
  componentGroups: magazineComponentGroups,
  components: [
    // Publication
    Masthead,
    MagazineCover,
    Contents,
    ContentsItem,
    ArticleCard,
    Folio,
    CoverWidget,
    QuoteWidget,
    ContentsWidget,
    DateWidget,
    // Page layout
    Spread,
    Figure,
    BleedImage,
    // Typography
    Headline,
    Standfirst,
    Byline,
    DropCap,
    Prose,
    PullQuote,
    Crosshead,
    Divider,
    // Notes
    Footnote,
    Sidenote,
    // Reading UX
    ReadingProgress,
  ],
});
