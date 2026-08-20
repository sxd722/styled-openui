import { z } from "zod/v4";

export const StandfirstSchema = z.object({
  text: z.string(),
  align: z.enum(["left", "center", "right"]).optional(),
});
