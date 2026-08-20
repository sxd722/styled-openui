import { z } from "zod/v4";

export const ReadingProgressSchema = z.object({
  height: z.number().optional(),
  variant: z.enum(["ink", "accent"]).optional(),
});
