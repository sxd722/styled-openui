import { z } from "zod/v4";

export const ContentsItemSchema = z.object({
  title: z.string(),
  section: z.string().optional(),
  page: z.string().optional(),
});
