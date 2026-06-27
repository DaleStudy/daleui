import { defineConfig } from "@pandacss/dev";
import { globalCss } from "./src/styles/globalCss";
import { borderWidths, borders } from "./src/tokens/borders";
import { colors, semanticColors } from "./src/tokens/colors";
import { radii } from "./src/tokens/radii";
import { spacing } from "./src/tokens/spacing";
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
  textStyles,
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
    "--font-pretendard": "Pretendard Variable",
  },

  staticCss: {
    css: [
      {
        properties: {
          textStyle: Object.keys(textStyles),
          fontSize: Object.keys(fontSizes),
          fontWeight: Object.keys(fontWeights),
          gap: Object.keys(spacing || {}),
          padding: Object.keys(spacing || {}),
          margin: Object.keys(spacing || {}),
        },
      },
    ],
  },

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        // 스켈레톤 - 중성 회색 펄스 (불투명도 깜빡임)
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        // 스켈레톤 - 중성 회색 웨이브 (::after 광택이 가로질러 흐름)
        wave: {
          "0%": { transform: "translateX(-100%)" },
          "60%, 100%": { transform: "translateX(100%)" },
        },
      },
      tokens: {
        borders,
        borderWidths,
        colors,
        fonts,
        fontWeights,
        fontSizes,
        letterSpacings,
        lineHeights,
        radii,
        spacing,
      },
      semanticTokens: {
        colors: semanticColors,
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
