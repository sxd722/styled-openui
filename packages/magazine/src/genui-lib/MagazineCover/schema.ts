import { z } from "zod/v4";

export const MagazineCoverSchema = z.object({
  url: z.string(),
  title: z.string(),
  headline: z.string().optional(),
  issue: z.string().optional(),
  tone: z.enum(["color", "mono"]).optional(),
});
