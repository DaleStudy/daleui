import { defineConfig } from "@pandacss/dev";
import { globalCss } from "./src/styles/globalCss";
import {
  textStyles,
  fonts,
  fontWeights,
  fontSizes,
  letterSpacings,
  lineHeights,
} from "./src/tokens/typography";

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
      textStyles,
      tokens: {
        fonts,
        fontWeights,
        fontSizes,
        letterSpacings,
        lineHeights,
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
