import { z } from "zod/v4";

export const SectionSchema = z.object({
  title: z.string().optional(),
  children: z.array(z.any()).optional(),
});
