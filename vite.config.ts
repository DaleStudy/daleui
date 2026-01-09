import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { codecovVitePlugin } from "@codecov/vite-plugin";

export const appConfig = {
  plugins: [
    react(),
    svgr(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "daleui-bundle",
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  optimizeDeps: {
    exclude: ["node_modules/.cache/storybook"],
  },
};

// https://vitejs.dev/config/
export default defineConfig(appConfig);
