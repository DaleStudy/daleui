import { defineConfig } from "@pandacss/dev";
import { globalCss } from "./src/styles/globalCss";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  globalCss,

  globalVars: {
    "--font-spoqa": "Spoqa Han Sans Neo",
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: "var(--font-spoqa), Noto Sans KR, sans-serif" },
        },
        fontWeights: {
          thin: { value: "100" },
          light: { value: "300" },
          normal: { value: "400" },
          medium: { value: "500" },
          bold: { value: "700" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
