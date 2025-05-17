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
  },
  optimizeDeps: {
    exclude: ["node_modules/.cache/storybook"],
  },
});
