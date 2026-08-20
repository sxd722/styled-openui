import { z } from "zod/v4";

import { Section } from "./Section";

/**
 * Everything that can be a child of the root component.
 * Only leaf components live here — a component whose schema imports this
 * union must NOT be a member of it (avoids circular dependencies).
 */
export const RootChildUnion = z.union([Section.ref]);
