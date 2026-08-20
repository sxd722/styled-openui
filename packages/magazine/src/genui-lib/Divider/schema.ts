import { z } from "zod/v4";

export const DividerSchema = z.object({
  style: z.enum(["hair", "double", "dotted", "ornament", "space"]).optional(),
  ornament: z.string().optional(),
});
