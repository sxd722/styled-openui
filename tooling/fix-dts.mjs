// tsdown/rolldown emits content-hashed declaration chunk names
// (index-Dp_I649r.d.ts). Package exports point at stable names, so copy the
// hashed entry files to index.d.ts / index.d.cts per directory.
// Runs with the package directory as cwd.
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const pkgRoot = process.cwd();
const targets = [
  "dist",
  "dist/genui-lib",
  "dist/genui-lib/prompt-options",
  "dist/full",
];

for (const dir of targets) {
  const abs = join(pkgRoot, dir);
  if (!existsSync(abs)) continue;
  const files = readdirSync(abs);
  for (const ext of ["d.ts", "d.cts"]) {
    const hashed = files.find((f) => /^index-[\w-]+\.d\.(ts|cts)$/.test(f) && f.endsWith(ext));
    if (hashed) {
      copyFileSync(join(abs, hashed), join(abs, `index.${ext}`));
      console.log(`[fix-dts] ${dir}/index.${ext} <- ${hashed}`);
    }
  }
}
