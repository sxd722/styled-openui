import { z } from "zod/v4";

export const DropCapSchema = z.object({
  text: z.string(),
  lines: z.union([z.literal(2), z.literal(3)]).optional(),
  variant: z.enum(["ink", "accent"]).optional(),
});
