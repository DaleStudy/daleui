/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/setupTests.tsx"],
    coverage: {
      exclude: ["styled-system/**"],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 95,
        lines: 90,
      },
      reporter: ["text", "text-summary", "lcov"],
    },
  },
  optimizeDeps: {
    exclude: ["node_modules/.cache/storybook"],
  },
});
