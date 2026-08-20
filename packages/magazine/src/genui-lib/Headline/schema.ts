import { z } from "zod/v4";

export const HeadlineSchema = z.object({
  text: z.string(),
  level: z.enum(["display", "title", "subtitle"]).optional(),
  kicker: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional(),
});
