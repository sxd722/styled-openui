# @openui-style/magazine

Magazine editorial-style component library for [OpenUI](https://github.com/thesysdev/openui) — serif display type, print-style multi-column spreads, drop caps, pull quotes, covers, folios, and a family of 2×4 phone home-screen widgets.

Built on the official extension points (`defineComponent` / `createLibrary` from `@openuidev/react-lang`), following the conventions of the upstream `react-ui` package. Zero runtime dependencies.

## Install

```bash
pnpm add @openui-style/magazine
# peer deps: @openuidev/react-lang, react, react-dom, zod
```

Import the styles once:

```ts
import "@openui-style/magazine/defaults.css";      // design tokens (always unlayered)
import "@openui-style/magazine/styles/index.css";  // component styles
// optional — accepts a Google Fonts request; without it the fallback
// stacks (Georgia etc.) keep everything readable:
import "@openui-style/magazine/styles/fonts.css";
// or, if you manage CSS layers (recommended with Tailwind v4):
import "@openui-style/magazine/styles/layered.css";
```

## Use

### With a renderer

```tsx
import { Renderer } from "@openuidev/react-lang";
import { magazineLibrary, magazinePromptOptions } from "@openui-style/magazine";

const systemPrompt = magazineLibrary.prompt(magazinePromptOptions);
// ... send the prompt to your LLM, stream the OpenUI Lang response ...

<Renderer response={openuiLangString} library={magazineLibrary} />
```

### With AgentInterface

```tsx
<AgentInterface componentLibrary={magazineLibrary} ... />
```

### Standalone React components

Every component is also exported as a plain view for hand-built layouts:

```tsx
import { MagazineHeadlineView, MagazinePullQuoteView } from "@openui-style/magazine";
```

## Components (24)

| Group | Components |
| --- | --- |
| Publication | `Masthead`, `MagazineCover`, `Contents` (+ `ContentsItem` sub-component), `ArticleCard`, `Folio` |
| Page layout | `Spread` (root — print-style multi-column page), `Figure` (captions, credits, text wrap), `BleedImage` |
| Typography | `Headline`, `Standfirst`, `Byline`, `DropCap`, `Prose`, `PullQuote`, `Crosshead`, `Divider` |
| Notes | `Footnote`, `Sidenote` |
| Reading UX | `ReadingProgress` |
| 2×4 widgets | `CoverWidget`, `QuoteWidget`, `ContentsWidget`, `DateWidget` |

A minimal article:

```txt
root = Spread([headline, byline, opener, body], 2)
headline = Headline("The Quiet Craft of Type", "display", "Typography")
byline = Byline("Marta Ilonka", "Design Editor", "19 August 2026")
opener = DropCap("Every magazine page begins long before the first sentence is read.")
body = Prose("Body copy flows through the columns like a printed page.")
```

## Design tokens

All tokens live under the `--openui-magazine-*` namespace in `defaults.css` (kept unlayered in both CSS variants so runtime overrides always win):

- Palette — paper `#fdfcf8`, ink `#141414`, gray ramp, hairline rules, one editorial-red accent
- Type — Playfair Display (display) / Lora (body) / Inter (captions), fallback Georgia stacks; scale 56 / 32 / 24 / 18 / 16 / 14 / 12
- Grid — column count/gap, page max/padding, 4px baseline rhythm
- Widgets — `--openui-magazine-widget-w/h` (default 150×316dp ≈ 2×4 launcher cells)

Override on `:root` or any wrapper:

```css
:root {
  --openui-magazine-accent: #1d4ed8;
  --openui-magazine-font-display: "Cormorant Garamond", Georgia, serif;
}
```

## Prompt engineering

`magazinePromptOptions` encodes the editorial craft as prompt data:

- **preamble** — the print-designer stance (content first; black/white/gray + one accent)
- **rules** — one DropCap per article; PullQuote repeats an existing sentence, max one per screen; Crosshead every 300–500 words; one display headline per page; 45–75 character measure via column count; real image URLs; CJK keeps `hyphenate` off
- **examples** — six complete OpenUI Lang compositions (feature spread, issue front page, text-wrap essay, widget trio)

## Repository layout

Part of the [styled-openui](https://github.com/sxd722/styled-openui) monorepo — see
[docs/conventions.md](https://github.com/sxd722/styled-openui/blob/main/docs/conventions.md)
for the style-package rules.

```
packages/magazine/
├── src/
│   ├── index.ts              # package entry
│   ├── defaults.css          # --openui-magazine-* design tokens
│   ├── styles/               # SCSS aggregation + fonts.css + flow registry
│   └── genui-lib/
│       ├── index.ts          # magazineLibrary (createStyleLibrary, root: Spread)
│       ├── unions.ts         # SpreadChildUnion
│       ├── prompt-options/   # server-safe prompt data
│       └── <Name>/{index.tsx, schema.ts, <name>.scss}
└── tests/                    # vitest + jsdom: schemas, library, prompt, rendering
```

## Develop

From the repo root:

```bash
pnpm install
pnpm test        # vitest across all workspace packages
pnpm typecheck   # tsc --noEmit across all packages
pnpm build       # sass + tsdown → dist (ESM/CJS/dts + CSS artifacts)
pnpm demo        # Vite demo at http://localhost:5179 (#/magazine/article #/magazine/front #/magazine/widgets #/magazine/playground)
```

Or scoped to this package: `pnpm --filter @openui-style/magazine <script>`.

## License

MIT
