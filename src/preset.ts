import { type Preset, definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/dev/presets";
import { globalCss } from "./styles/globalCss";
import { borderWidths, borders } from "./tokens/borders";
import { colors, semanticColors } from "./tokens/colors";
import { radii } from "./tokens/radii";
import { spacing } from "./tokens/spacing";
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
  textStyles,
} from "./tokens/typography";

const daleuiPreset: Preset = definePreset({
  name: "daleui",
  // 기본 토큰은 유지하되 상용 시스템 폰트를 참조하는 serif는 제외합니다.
  presets: [
    {
      ...pandaPreset,
      theme: {
        ...pandaPreset.theme,
        tokens: { ...pandaPreset.theme.tokens, fonts },
      },
    },
  ],
  globalCss,
  globalVars: {
    "--font-pretendard": "Pretendard Variable",
  },
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
      },
      tokens: {
        borders,
        borderWidths,
        colors,
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
});

export default daleuiPreset;
