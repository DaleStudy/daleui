import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  ":root": {
    "--global-font-body": "var(--fonts-sans)",
  },
  h1: {
    fontSize: "var(--font-sizes-4xl)",
    lineHeight: "var(--line-heights-loose)",
    fontWeight: "var(--font-weights-bold)",
  },
  h2: {
    fontSize: "var(--font-sizes-3xl)",
    lineHeight: "var(--line-heights-relaxed)",
    fontWeight: "var(--font-weights-medium)",
  },
  h3: {
    fontSize: "var(--font-sizes-2xl)",
    lineHeight: "var(--line-heights-relaxed)",
    fontWeight: "var(--font-weights-medium)",
  },
  h4: {
    fontSize: "var(--font-sizes-xl)",
    lineHeight: "var(--line-heights-relaxed)",
    fontWeight: "var(--font-weights-medium)",
  },
  h5: {
    fontSize: "var(--font-sizes-lg)",
    lineHeight: "var(--line-heights-relaxed)",
    fontWeight: "var(--font-weights-medium)",
  },
  p: {
    fontSize: "var(--font-sizes-md)",
    lineHeight: "var(--line-heights-normal)",
    fontWeight: "var(--font-weights-normal)",
  },
});

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
