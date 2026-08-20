# @openui-style/TEMPLATE — style scaffold

Copy this directory to `packages/<style>` and rename the markers:

1. `TEMPLATE` → your style short name (package.json name, all CSS tokens,
   class prefixes `openui-TEMPLATE-*`, `styleId`, library export
   `templateLibrary` → `<style>Library`, `RootChildUnion` → `<Root>ChildUnion`)
2. `templatePreamble/Rules/Examples/PromptOptions` → your prompt exports
3. Replace the example `Section` component with real components
   (one folder per component: `index.tsx`, `schema.ts`, `<component>.scss`)
4. Update `src/defaults.css` tokens and `src/styles/_tokens.scss`
5. Register the style in `demo/registry.ts` + add `demo/content/<style>.ts`
6. `pnpm install && pnpm build && pnpm test`

See `docs/conventions.md` for the full rules.
