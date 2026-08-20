import { z } from "zod/v4";

/**
 * The 2x4 home-screen widget family. Kept as four tight positional schemas
 * (mirrors the upstream convention of short, fully-typed signatures) instead
 * of one wide variant-tagged schema, so positional arguments stay reliable.
 */

export const CoverWidgetSchema = z.object({
  title: z.string(),
  image: z.string(),
  issue: z.string().optional(),
  headline: z.string().optional(),
});

export const QuoteWidgetSchema = z.object({
  title: z.string(),
  quote: z.string(),
  attribution: z.string().optional(),
  issue: z.string().optional(),
});

export const ContentsWidgetSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
  issue: z.string().optional(),
});

export const DateWidgetSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  day: z.number().optional(),
  issue: z.string().optional(),
});
