import { z } from "zod/v4";

export const CrossheadSchema = z.object({
  text: z.string(),
  style: z.enum(["centered", "rule", "numbered"]).optional(),
  number: z.string().optional(),
});
