/// <reference types="vitest/config" />
import { readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { codecovVitePlugin } from "@codecov/vite-plugin";

const componentsDir = resolve(__dirname, "src/components");
const componentEntries = Object.fromEntries(
  readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => [
      `components/${d.name}/${d.name}`,
      resolve(componentsDir, d.name, `${d.name}.tsx`),
    ]),
);

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
  build: {
    lib: {
      // 라이브러리 진입점 설정합니다.
      entry: {
        // import { Button } from "daleui";
        index: resolve(__dirname, "src/index.ts"),
        // import { Button } from "daleui/button";
        ...componentEntries,
      },
      formats: ["es"],
    },

    rollupOptions: {
      // 사용하는 쪽 프로젝트의 react를 그대로 사용하게 합니다.
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        // 모든 CSS 자산을 하나의 파일로 만듭니다. (PandaCSS는 빌드타임에 css를 생성하기 떄문에)
        assetFileNames: "index.css",
      },
    },
    // public 디렉토리를 빌드 결과물에 복사하지 않습니다.
    copyPublicDir: false,
  },
});
