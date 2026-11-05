import { defineConfig } from "@pandacss/dev";
import daleuiPreset from "./src/preset";
import { spacing } from "./src/tokens/spacing";
import { fontSizes, fontWeights, textStyles } from "./src/tokens/typography";

export default defineConfig({
  presets: ["@pandacss/preset-base", daleuiPreset],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

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

  // The output directory for your css system
  outdir: "styled-system",
});
