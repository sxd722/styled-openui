import { z } from "zod/v4";

export const SidenoteSchema = z.object({
  text: z.string(),
});
