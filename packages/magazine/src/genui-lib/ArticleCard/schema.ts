import { z } from "zod/v4";

export const ArticleCardSchema = z.object({
  headline: z.string(),
  standfirst: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  tone: z.enum(["color", "mono"]).optional(),
  layout: z.enum(["stacked", "side"]).optional(),
});
