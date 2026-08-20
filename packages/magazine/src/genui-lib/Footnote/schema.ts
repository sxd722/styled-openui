import { z } from "zod/v4";

export const FootnoteSchema = z.object({
  text: z.string(),
  marker: z.string().optional(),
});
