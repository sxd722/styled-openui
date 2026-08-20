import { z } from "zod/v4";

export const FolioSchema = z.object({
  section: z.string().optional(),
  page: z.string().optional(),
  position: z.enum(["top", "bottom"]).optional(),
});
