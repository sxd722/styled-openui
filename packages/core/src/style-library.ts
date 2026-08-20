import {
  createLibrary,
  type ComponentGroup,
  type Library,
  type LibraryDefinition,
} from "@openuidev/react-lang";

/**
 * Library factory that encodes the @openui-style conventions. Throws at
 * definition time (never silently) on:
 *
 * - styleId not namespaced as "openui-style/<style>"
 * - missing root (style libraries are page-oriented and must declare one)
 * - renderable components missing from componentGroups (undocumented in prompts)
 * - componentGroups referencing unknown component names (typos)
 * - a component listed in multiple groups
 * - subComponents entries that do not exist
 * - Zod v3 schemas (upstream rejects them later with a vaguer error)
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
  if (!definition.root) {
    throw new Error(
      "[createStyleLibrary] style libraries must declare a root component",
    );
  }

  const componentNames = definition.components.map((component) => {
    if (component.props != null && typeof component.props === "object" && "_def" in component.props && !("_zod" in component.props)) {
      throw new Error(
        `[createStyleLibrary] component "${component.name}" uses a Zod 3 schema. ` +
          `OpenUI requires Zod 4 — import from "zod/v4".`,
      );
    }
    return component.name;
  });

  const groups = definition.componentGroups ?? [];
  const declared = new Set<string>();
  for (const group of groups) {
    for (const name of group.components) {
      if (!componentNames.includes(name)) {
        throw new Error(
          `[createStyleLibrary] group "${group.name}" lists unknown component "${name}" — check for typos`,
        );
      }
      if (declared.has(name)) {
        throw new Error(
          `[createStyleLibrary] component "${name}" is listed in more than one componentGroup`,
        );
      }
      declared.add(name);
    }
  }

  for (const sub of definition.subComponents ?? []) {
    if (!componentNames.includes(sub)) {
      throw new Error(
        `[createStyleLibrary] subComponents entry "${sub}" does not match any defined component`,
      );
    }
    declared.add(sub);
  }

  const ungrouped = componentNames.filter((name) => !declared.has(name));
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

/**
 * Compose several libraries into one — e.g. the official `openuiLibrary`
 * plus a style library, so a single Renderer gets both the interactive
 * runtime components and the styled editorial ones.
 *
 * - duplicate component names throw (never silently override)
 * - `root` must name a component present in the merged set
 * - componentGroups default to the concatenation of the input libraries'
 *   groups; pass explicit groups to reorganize for the prompt
 */
export function composeLibraries(input: {
  id: string;
  root?: string;
  libraries: Library[];
  componentGroups?: ComponentGroup[];
}): Library {
  const components: LibraryDefinition["components"] = [];
  const seen = new Map<string, string>();
  for (const library of input.libraries) {
    for (const component of Object.values(library.components)) {
      const owner = seen.get(component.name);
      if (owner) {
        throw new Error(
          `[composeLibraries] duplicate component "${component.name}" in both "${owner}" and "${library.id ?? "<unnamed>"}"`,
        );
      }
      seen.set(component.name, library.id ?? "<unnamed>");
      components.push(component);
    }
  }

  if (input.root && !seen.has(input.root)) {
    throw new Error(
      `[composeLibraries] root "${input.root}" was not found in the merged components (${[...seen.keys()].join(", ")})`,
    );
  }

  const componentGroups =
    input.componentGroups ??
    input.libraries.flatMap((library) => library.componentGroups ?? []);

  return createLibrary({
    id: input.id,
    root: input.root,
    componentGroups,
    components,
  });
}
