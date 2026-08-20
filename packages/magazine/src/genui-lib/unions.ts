import { z } from "zod/v4";

import { ArticleCard } from "./ArticleCard";
import { BleedImage } from "./BleedImage";
import { Byline } from "./Byline";
import { Contents } from "./Contents";
import { ContentsWidget, CoverWidget, DateWidget, QuoteWidget } from "./MagazineWidget";
import { Crosshead } from "./Crosshead";
import { Divider } from "./Divider";
import { DropCap } from "./DropCap";
import { Figure } from "./Figure";
import { Folio } from "./Folio";
import { Footnote } from "./Footnote";
import { Headline } from "./Headline";
import { MagazineCover } from "./MagazineCover";
import { Masthead } from "./Masthead";
import { Prose } from "./Prose";
import { PullQuote } from "./PullQuote";
import { ReadingProgress } from "./ReadingProgress";
import { Sidenote } from "./Sidenote";
import { Standfirst } from "./Standfirst";

/**
 * Everything that can flow inside a Spread.
 *
 * Only leaf components live here: their schemas never import this union, so
 * there is no circular dependency (mirrors the upstream rule that components
 * whose schema references a union must not be members of it). Spread itself
 * is the root and never nests.
 */
export const SpreadChildUnion = z.union([
  Headline.ref,
  Standfirst.ref,
  Byline.ref,
  DropCap.ref,
  Prose.ref,
  PullQuote.ref,
  Crosshead.ref,
  Divider.ref,
  Figure.ref,
  BleedImage.ref,
  Folio.ref,
  Footnote.ref,
  Sidenote.ref,
  Masthead.ref,
  MagazineCover.ref,
  Contents.ref,
  ArticleCard.ref,
  ReadingProgress.ref,
  CoverWidget.ref,
  QuoteWidget.ref,
  ContentsWidget.ref,
  DateWidget.ref,
]);
