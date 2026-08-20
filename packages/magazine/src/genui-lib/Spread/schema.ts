import { z } from "zod/v4";

/**
 * `children` stays OPEN (mirrors upstream Stack): the parser and the library
 * decide which components are legal, not the root container. A closed union
 * here would prevent composed libraries (e.g. official openuiLibrary
 * components) from ever entering a Spread.
 */
export const SpreadSchema = z.object({
  children: z.array(z.any()),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  gap: z.enum(["normal", "wide"]).optional(),
  bleed: z.boolean().optional(),
  tone: z.enum(["paper", "white"]).optional(),
});
