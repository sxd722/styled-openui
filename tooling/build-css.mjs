// Per-style-package CSS build. Runs with the package directory as cwd
// (invoked from a package script as `node ../../tooling/build-css.mjs`).
//
// Inputs (relative to the package root):
//   src/styles/index.scss   — aggregated component styles (required)
//   src/defaults.css        — design tokens, always unlayered (required)
//   src/styles/fonts.css    — optional web-font imports (copied verbatim)
//
// Outputs:
//   dist/styles/index.css          — unlayered component styles (default)
//   dist/layered/styles/index.css  — opt-in `@layer openui-<style>` variant
//   dist/defaults.css
//   dist/styles/fonts.css
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { compile } from "sass";

const pkgRoot = process.cwd();
const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));

// "@openui-style/magazine" -> "openui-magazine"; override via package.json
// `style.layer` when the short name is ambiguous.
const scope = String(pkg.name).replace(/^@[^/]+\//, "");
const layer = pkg.style?.layer ?? `openui-${scope}`;

const dist = join(pkgRoot, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "styles"), { recursive: true });
mkdirSync(join(dist, "layered", "styles"), { recursive: true });

const css = compile(join(pkgRoot, "src/styles/index.scss"), { style: "expanded" }).css;
writeFileSync(join(dist, "styles", "index.css"), css);
writeFileSync(join(dist, "layered", "styles", "index.css"), `@layer ${layer} {\n${css}\n}\n`);
cpSync(join(pkgRoot, "src/defaults.css"), join(dist, "defaults.css"));
if (existsSync(join(pkgRoot, "src/styles/fonts.css"))) {
  cpSync(join(pkgRoot, "src/styles/fonts.css"), join(dist, "styles", "fonts.css"));
}

console.log(`[build-css] ${pkg.name}: CSS artifacts written to dist/ (layer: ${layer})`);
