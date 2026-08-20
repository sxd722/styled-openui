import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const here = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    // Resolve workspace deps to sources so tests never run against stale dist.
    alias: {
      "@openui-style/core": resolve(here, "../core/src"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
