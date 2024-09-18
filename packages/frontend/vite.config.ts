/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      application: resolve(__dirname, "src/application"),
      features: resolve(__dirname, "src/features"),
      mocks: resolve(__dirname, "src/mocks"),
      styles: resolve(__dirname, "src/styles"),
      ui: resolve(__dirname, "src/ui"),
      "local-service": resolve(__dirname, "src/local-service"),
      __generated__: resolve(__dirname, "src/__generated__"),
    },
  },
});
