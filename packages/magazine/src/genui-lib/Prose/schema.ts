import { z } from "zod/v4";

export const ProseSchema = z.object({
  text: z.string(),
  indent: z.boolean().optional(),
  hyphenate: z.boolean().optional(),
});
