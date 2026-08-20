import {
  createLibrary,
  type Library,
  type LibraryDefinition,
} from "@openuidev/react-lang";

/**
 * Library factory that encodes the @openui-style conventions:
 *
 * - every style library carries a stable `id` (`openui-style/<style>`)
 * - every renderable component must be listed in a componentGroup, so the
 *   generated system prompt always documents the full inventory
 * - data-only sub-components (like upstream Table's Col) are exempt via
 *   `subComponents` — they are documented through their parent's notes
 *
 * Throws at definition time when a component is missing from the groups.
 */
export interface StyleLibraryDefinition extends Omit<LibraryDefinition, "id"> {
  /** Stable library id, e.g. "openui-style/magazine". */
  styleId: string;
  /** Names of data-only sub-components that do not need a componentGroup. */
  subComponents?: string[];
}

export function createStyleLibrary(definition: StyleLibraryDefinition): Library {
  if (!definition.styleId || !definition.styleId.startsWith("openui-style/")) {
    throw new Error(
      `[createStyleLibrary] styleId must look like "openui-style/<style>" — got ${JSON.stringify(definition.styleId)}`,
    );
  }

  const grouped = new Set(
    (definition.componentGroups ?? []).flatMap((group) => group.components),
  );
  for (const sub of definition.subComponents ?? []) grouped.add(sub);
  const ungrouped = definition.components
    .map((component) => component.name)
    .filter((name) => !grouped.has(name));
  if (ungrouped.length > 0) {
    throw new Error(
      `[createStyleLibrary] components missing from componentGroups (the prompt would not document them): ${ungrouped.join(", ")}`,
    );
  }

  return createLibrary({
    ...definition,
    id: definition.styleId,
  });
}
