/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { codecovVitePlugin } from "@codecov/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "daleui-bundle",
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
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
