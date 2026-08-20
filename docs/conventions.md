# Style package conventions

Every visual style is one workspace package under `packages/`. These rules
keep styles interchangeable and independently publishable; `createStyleLibrary`
in `@openui-style/core` enforces the structural ones at definition time.

## Naming

| Thing | Convention | Example |
| --- | --- | --- |
| Package | `@openui-style/<style>` | `@openui-style/swiss` |
| Library export | `<style>Library` | `swissLibrary` |
| Prompt exports | `<style>PromptOptions` (+ preamble/rules/examples) | `swissPromptOptions` |
| Library id | `openui-style/<style>` — set via `createStyleLibrary({ styleId })` | `openui-style/swiss` |
| CSS tokens | `--openui-<style>-*`, in `src/defaults.css`, never layered | `--openui-swiss-ink` |
| Class names | `.openui-<style>-<component>` | `.openui-swiss-grid` |
| CSS layer | `@layer openui-<style>` (layered.css variant) | see `tooling/build-css.mjs` |

## Package layout

```
packages/<style>/
├── package.json        # six fixed subpath exports (below) + deps on @openui-style/core
├── tsconfig.json       # extends ../../tsconfig.base.json
├── tsdown.config.ts    # copy from packages/magazine — identical shape
├── vitest.config.ts
├── src/
│   ├── index.ts        # re-exports genui-lib + prompt-options
│   ├── defaults.css    # --openui-<style>-* tokens (unlayered)
│   ├── styles/         # _tokens.scss, _flow.scss, index.scss, optional fonts.css
│   └── genui-lib/
│       ├── index.ts    # <style>Library = createStyleLibrary({ styleId, root, componentGroups, components })
│       ├── unions.ts   # <Root>ChildUnion — components whose schema imports a union must NOT be members
│       ├── prompt-options/index.ts   # server-safe: preamble + rules + examples, no React
│       └── <Component>/{index.tsx, schema.ts, <component>.scss}
└── tests/
```

## Fixed subpath exports

`.` · `./genui-lib` · `./genui-lib/prompt-options` · `./defaults.css` ·
`./styles/index.css` · `./styles/layered.css` (+ optional `./styles/fonts.css`).

## Component rules

- Schemas are Zod v4 (`import { z } from "zod/v4"`); upstream rejects v3 shapes.
- **Positional arguments bind in schema field order** — keep signatures short.
  Prefer splitting a wide variant-tagged component into several tight ones
  (see magazine's `CoverWidget` / `QuoteWidget` / …).
- Sub-components that only carry data into a parent (like upstream `Col`) live
  in the parent's folder; the parent schema uses `z.array(Sub.ref)` and
  unwraps `element.props` at render time.
- Components render via SCSS classes consuming the token variables — never
  hard-coded values — so runtime theming keeps working.
- Images: `loading="lazy" decoding="async"`.

## Adding a style

1. `cp -r packages/_template packages/<style>` and rename `TEMPLATE` /
   `template` / `<style>` markers per its README.
2. Fill `src/defaults.css` tokens and implement components.
3. Register in `demo/registry.ts` + add `demo/content/<style>.ts`.
4. `pnpm install && pnpm build && pnpm test`.

## Publishing

`workspace:^` dependencies are rewritten by `pnpm publish`; `@openui-style/core`
must go out first (or publish all packages in dependency order in one release).
