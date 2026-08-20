import { z } from "zod/v4";

export const BylineSchema = z.object({
  author: z.string(),
  role: z.string().optional(),
  date: z.string().optional(),
});
