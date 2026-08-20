import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const here = dirname(fileURLToPath(import.meta.url));

// Aliases point at package sources so HMR works across the workspace.
export default defineConfig({
  root: here,
  plugins: [react()],
  resolve: {
    alias: {
      "@openui-style/core": resolve(here, "../packages/core/src"),
      "@openui-style/magazine": resolve(here, "../packages/magazine/src"),
    },
  },
  server: {
    port: 5179,
  },
});
