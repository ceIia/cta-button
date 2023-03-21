/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ctabutton",
      formats: ["iife", "es"],
      fileName: "index",
    },
    rollupOptions: {
      output: {
        globals: {
          lit: "lit",
        },
      },
    },
  },
  esbuild: {
    target: "es2019",
  },
});
