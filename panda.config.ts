import { defineConfig } from "@pandacss/dev";
import { globalCss } from "./src/styles/globalCss";
import { colors, semanticColors } from "./src/tokens/colors";
import { spacing, semanticSpacing } from "./src/tokens/spacing";
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

  staticCss: {
    css: [
      {
        properties: {
          textStyle: Object.keys(textStyles),
          fontSize: Object.keys(fontSizes),
          fontWeight: Object.keys(fontWeights),
        },
      },
    ],
  },

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      tokens: {
        colors,
        fonts,
        fontWeights,
        fontSizes,
        letterSpacings,
        lineHeights,
        spacing,
      },
      semanticTokens: {
        colors: semanticColors,
        spacing: semanticSpacing,
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
