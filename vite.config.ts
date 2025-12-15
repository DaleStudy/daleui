/// <reference types="vitest/config" />
import { readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const componentsDir = resolve(__dirname, "src/components");
const components = readdirSync(componentsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const componentEntries = components.reduce(
  (acc, component) => {
    acc[`components/${component}/${component}`] = resolve(
      componentsDir,
      component,
      `${component}.tsx`,
    );
    return acc;
  },
  {} as Record<string, string>,
);

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
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        ...componentEntries,
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const isEsModule = format === "es";
        if (entryName === "index") {
          return isEsModule ? "index.mjs" : "index.cjs";
        }
        const [, componentName, fileName] = entryName.split("/");
        return isEsModule
          ? `components/${componentName}/${fileName}.mjs`
          : `components/${componentName}/${fileName}.cjs`;
      },
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "index.css";
          }
          return assetInfo.name || "asset";
        },
      },
    },
    copyPublicDir: false,
  },
});
