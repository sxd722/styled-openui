import { z } from "zod/v4";

export const FigureSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  wrap: z.enum(["none", "left", "right"]).optional(),
  size: z.enum(["small", "medium", "large"]).optional(),
  tone: z.enum(["color", "mono"]).optional(),
});
