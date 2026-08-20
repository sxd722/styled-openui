import { z } from "zod/v4";

export const PullQuoteSchema = z.object({
  text: z.string(),
  attribution: z.string().optional(),
  variant: z.enum(["center", "edge", "marker"]).optional(),
});
