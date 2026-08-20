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
  // Main index — CJS
  { ...shared, format: ["cjs"], dts: true, entry: { index: "src/index.ts" } },
  // Main index — ESM
  { ...shared, format: ["esm"], dts: true, entry: { index: "src/index.ts" } },
  // genui-lib/prompt-options — server-safe prompt data, no "use client" (CJS)
  {
    ...shared,
    format: ["cjs"],
    dts: true,
    outDir: "dist/genui-lib/prompt-options",
    entry: { index: "src/genui-lib/prompt-options/index.ts" },
  },
  // genui-lib/prompt-options — ESM
  {
    ...shared,
    format: ["esm"],
    dts: true,
    outDir: "dist/genui-lib/prompt-options",
    entry: { index: "src/genui-lib/prompt-options/index.ts" },
  },
  // genui-lib — CJS
  {
    ...shared,
    format: ["cjs"],
    dts: true,
    outDir: "dist/genui-lib",
    entry: { index: "src/genui-lib/index.ts" },
  },
  // genui-lib — ESM
  {
    ...shared,
    format: ["esm"],
    dts: true,
    outDir: "dist/genui-lib",
    entry: { index: "src/genui-lib/index.ts" },
  },
  // full — composed library over @openuidev/react-ui (optional peer) — CJS
  {
    ...shared,
    format: ["cjs"],
    dts: true,
    outDir: "dist/full",
    entry: { index: "src/full/index.ts" },
  },
  // full — ESM
  {
    ...shared,
    format: ["esm"],
    dts: true,
    outDir: "dist/full",
    entry: { index: "src/full/index.ts" },
  },
]);
