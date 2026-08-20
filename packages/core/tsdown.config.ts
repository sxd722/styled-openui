import { defineConfig } from "tsdown";

const shared = {
  dts: false,
  sourcemap: true,
  target: "es2022" as const,
  outDir: "dist",
  clean: false,
  outputOptions: {
    sourcemapExcludeSources: true,
  },
  deps: {
    neverBundle: [/^(?![./]|[A-Za-z]:[/\\])/, /\.scss$/, /\.css$/],
  },
} satisfies Parameters<typeof defineConfig>[0];

export default defineConfig([
  { ...shared, format: ["cjs"], dts: true, entry: { index: "src/index.ts" } },
  { ...shared, format: ["esm"], dts: true, entry: { index: "src/index.ts" } },
]);
