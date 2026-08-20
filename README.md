# styled-openui

Multi-style component libraries for [OpenUI](https://github.com/thesysdev/openui) — one pnpm workspace package per visual style, all built on the official extension points (`defineComponent` / `createLibrary` from `@openuidev/react-lang`).

| Package | Status | Description |
| --- | --- | --- |
| [`@openui-style/core`](packages/core) | stable | Shared runtime utilities — inline markup rendering, `createStyleLibrary` factory |
| [`@openui-style/magazine`](packages/magazine) | stable | Magazine editorial style: multi-column spreads, drop caps, pull quotes, covers, 2×4 home-screen widgets |
| `packages/_template` | scaffold | Copy to add a new style |

## Layout

```
openui-style/
├── packages/
│   ├── core/          # @openui-style/core — shared markup + style-library factory
│   ├── magazine/      # @openui-style/magazine — 24 editorial components
│   └── _template/     # scaffold for new styles (not a workspace package)
├── demo/              # unified demo: style switcher, per-style pages, paste-and-render playground
├── tooling/           # shared build scripts (CSS artifacts, dts renaming)
├── docs/conventions.md  # the rules every style package follows
└── openui/            # reference clone of upstream (git-ignored)
```

## Develop

```bash
pnpm install
pnpm build       # build all style packages
pnpm test        # vitest across packages + demo
pnpm typecheck
pnpm demo        # http://localhost:5179 — routes: #/<style>/<page>
```

## Add a style

```bash
cp -r packages/_template packages/<style>
# rename TEMPLATE markers, implement components, then:
# demo/registry.ts += one entry; demo/content/<style>.ts += sample docs
pnpm install && pnpm build && pnpm test
```

The full conventions (token namespacing, class prefixes, exports map,
positional-signature rules, sub-component pattern) live in
[docs/conventions.md](docs/conventions.md).

## License

MIT
