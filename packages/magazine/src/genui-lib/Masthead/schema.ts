import { z } from "zod/v4";

export const MastheadSchema = z.object({
  title: z.string(),
  tagline: z.string().optional(),
  issue: z.string().optional(),
  date: z.string().optional(),
});
