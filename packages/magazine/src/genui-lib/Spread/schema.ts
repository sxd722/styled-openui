import { z } from "zod/v4";
import { SpreadChildUnion } from "../unions";

export const SpreadSchema = z.object({
  children: z.array(SpreadChildUnion),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  gap: z.enum(["normal", "wide"]).optional(),
  bleed: z.boolean().optional(),
  tone: z.enum(["paper", "white"]).optional(),
});
