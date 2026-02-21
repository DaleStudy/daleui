import { readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import type { LibraryFormats } from "vite";
import { appConfig } from "./vite.config";

const componentsDir = resolve(__dirname, "src/components");
const componentEntries = Object.fromEntries(
  readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => [
      `components/${d.name}/${d.name}`,
      resolve(componentsDir, d.name, `${d.name}.tsx`),
    ]),
);

const libFormats: LibraryFormats[] = ["es"];

// https://vitejs.dev/config/
export default defineConfig({
  ...appConfig,
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
        // .part 파일을 해당 컴포넌트 폴더 안에 배치합니다. (예: Card.part → components/Card/Card.part.js)
        manualChunks(id) {
          const match = id.match(/src\/components\/(\w+)\/.*\.part\./);
          if (match) {
            return `components/${match[1]}/${match[1]}.part`;
          }
        },
      },
    },
    // public 디렉토리를 빌드 결과물에 복사하지 않습니다.
    copyPublicDir: false,
  },
});
