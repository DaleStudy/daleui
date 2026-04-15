import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import type { LibraryFormats, Plugin } from "vite";
import { appConfig } from "./vite.config";

const componentsDir = resolve(__dirname, "src/components");
const componentEntries = Object.fromEntries(
  readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "shared")
    .map((d) => [
      `components/${d.name}/${d.name}`,
      resolve(componentsDir, d.name, `${d.name}.tsx`),
    ]),
);

const libFormats: LibraryFormats[] = ["es"];

// 폰트 패키지 CSS를 빌드에 인라인하지 않고 @import로 유지합니다.
const externalFontImports = [
  "pretendard/dist/web/variable/pretendardvariable.css",
  "@fontsource-variable/jetbrains-mono",
];

function keepFontImportsExternal(): Plugin {
  return {
    name: "keep-font-imports-external",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("index.css")) {
        let result = code;
        for (const imp of externalFontImports) {
          result = result.replace(`@import "${imp}";`, "");
        }
        return result;
      }
    },
    writeBundle(options) {
      const outDir = options.dir ?? "dist";
      const cssPath = resolve(outDir, "index.css");
      const css = readFileSync(cssPath, "utf-8");
      const imports = externalFontImports
        .map((i) => `@import "${i}";`)
        .join("\n");
      writeFileSync(cssPath, imports + "\n" + css);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  ...appConfig,
  plugins: [...(appConfig.plugins ?? []), keepFontImportsExternal()],
  build: {
    lib: {
      // 라이브러리 진입점 설정합니다.
      entry: {
        // import { Button } from "daleui";
        index: resolve(__dirname, "src/index.ts"),
        // import { Button } from "daleui/button";
        ...componentEntries,
      },
      formats: libFormats,
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
