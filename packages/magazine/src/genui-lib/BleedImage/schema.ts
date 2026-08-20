import { z } from "zod/v4";

export const BleedImageSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  overlay: z.string().optional(),
  height: z.enum(["short", "medium", "tall"]).optional(),
  tone: z.enum(["color", "mono"]).optional(),
});
