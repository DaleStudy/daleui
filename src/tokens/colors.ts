import type { Tokens, SemanticTokens } from "@pandacss/types";

export type Tone = "neutral" | "accent" | "danger" | "warning";

export const semanticColors: SemanticTokens["colors"] = {
  current: { value: "currentColor" },
  transparent: { value: "rgb(0 0 0 / 0)" },
  base: {
    value: { base: "{colors.gray.1}", _dark: "{colors.grayDark.1}" },
  },
  bg: {
    DEFAULT: {
      DEFAULT: {
        value: { base: "{colors.grayDark.3}", _dark: "{colors.gray.3}" },
      },
      accent: {
        value: { base: "{colors.teal.5}", _dark: "{colors.tealDark.8}" },
      },
      danger: {
        value: { base: "{colors.red.3}", _dark: "{colors.redDark.3}" },
      },
      warning: {
        value: { base: "{colors.yellow.3}", _dark: "{colors.yellowDark.3}" },
      },
    },
    hover: {
      DEFAULT: {
        value: { base: "{colors.grayDark.8}", _dark: "{colors.gray.6}" },
      },
      accent: {
        value: { base: "{colors.teal.4}", _dark: "{colors.violetDark.4}" },
      },
      danger: {
        value: { base: "{colors.red.4}", _dark: "{colors.redDark.4}" },
      },
      warning: {
        value: { base: "{colors.yellow.4}", _dark: "{colors.yellowDark.4}" },
      },
    },
    active: {
      DEFAULT: {
        value: { base: "{colors.gray.5}", _dark: "{colors.grayDark.5}" },
      },
      accent: {
        value: { base: "{colors.teal.5}", _dark: "{colors.violetDark.5}" },
      },
      danger: {
        value: { base: "{colors.red.5}", _dark: "{colors.redDark.5}" },
      },
      warning: {
        value: { base: "{colors.yellow.5}", _dark: "{colors.yellowDark.5}" },
      },
    },
  },
  border: {
    DEFAULT: {
      DEFAULT: {
        value: { base: "{colors.gray.7}", _dark: "{colors.grayDark.7}" },
      },
      accent: {
        value: { base: "{colors.teal.7}", _dark: "{colors.violetDark.7}" },
      },
      danger: {
        value: { base: "{colors.red.7}", _dark: "{colors.redDark.7}" },
      },
      warning: {
        value: { base: "{colors.yellow.7}", _dark: "{colors.yellowDark.7}" },
      },
    },
    hover: {
      DEFAULT: {
        value: { base: "{colors.gray.8}", _dark: "{colors.grayDark.8}" },
      },
      accent: {
        value: { base: "{colors.teal.8}", _dark: "{colors.violetDark.8}" },
      },
      danger: {
        value: { base: "{colors.red.8}", _dark: "{colors.redDark.8}" },
      },
      warning: {
        value: { base: "{colors.yellow.8}", _dark: "{colors.yellowDark.8}" },
      },
    },
  },
  solid: {
    DEFAULT: {
      DEFAULT: {
        value: { base: "{colors.gray.9}", _dark: "{colors.grayDark.9}" },
      },
      accent: {
        value: { base: "{colors.teal.9}", _dark: "{colors.violetDark.9}" },
      },
      danger: {
        value: { base: "{colors.red.9}", _dark: "{colors.redDark.9}" },
      },
      warning: {
        value: { base: "{colors.yellow.9}", _dark: "{colors.yellowDark.9}" },
      },
    },
    hover: {
      DEFAULT: {
        value: { base: "{colors.gray.10}", _dark: "{colors.grayDark.10}" },
      },
      accent: {
        value: { base: "{colors.teal.10}", _dark: "{colors.violetDark.10}" },
      },
      danger: {
        value: { base: "{colors.red.10}", _dark: "{colors.redDark.10}" },
      },
      warning: {
        value: { base: "{colors.yellow.10}", _dark: "{colors.yellowDark.10}" },
      },
    },
  },
  text: {
    muted: {
      DEFAULT: {
        value: { base: "{colors.gray.11}", _dark: "{colors.grayDark.11}" },
      },
      accent: {
        value: { base: "{colors.teal.11}", _dark: "{colors.tealDark.11}" },
      },
      danger: {
        value: { base: "{colors.red.11}", _dark: "{colors.redDark.11}" },
      },
      warning: {
        value: { base: "{colors.yellow.11}", _dark: "{colors.yellowDark.11}" },
      },
    },
    DEFAULT: {
      DEFAULT: {
        value: { base: "{colors.grayDark.12}", _dark: "{colors.gray.12}" },
      },
      accent: {
        value: { base: "{colors.teal.12}", _dark: "{colors.violetDark.12}" },
      },
      danger: {
        value: { base: "{colors.red.12}", _dark: "{colors.redDark.12}" },
      },
      warning: {
        value: { base: "{colors.yellow.12}", _dark: "{colors.yellowDark.12}" },
      },
    },
  },
};

export const colors: Tokens["colors"] = {
  teal: {
    1: { value: "#f7fffc" },
    2: { value: "#effdf9" },
    3: { value: "#d2fdf0" },
    4: { value: "#b4fae7" },
    5: { value: "#96f3dc" },
    6: { value: "#74e8cd" },
    7: { value: "#3fd9ba" },
    8: { value: "#00c4a2" },
    9: { value: "#27f5d1" },
    10: { value: "#00ebc7" },
    11: { value: "#007b64" },
    12: { value: "#004739" },
  },
  tealDark: {
    1: { value: "#0b1311" },
    2: { value: "#101c19" },
    3: { value: "#0d2e26" },
    4: { value: "#013b31" },
    5: { value: "#06493c" },
    6: { value: "#12584a" },
    7: { value: "#1a6a5a" },
    8: { value: "#1b806c" },
    9: { value: "#00ebc7" },
    10: { value: "#00e0bd" },
    11: { value: "#00dab7" },
    12: { value: "#a9f1de" },
  },
  violet: {
    1: { value: "#fcfcff" },
    2: { value: "#f9f8ff" },
    3: { value: "#f2f1ff" },
    4: { value: "#e8e5ff" },
    5: { value: "#ded9ff" },
    6: { value: "#d1c9ff" },
    7: { value: "#beb4ff" },
    8: { value: "#a797f9" },
    9: { value: "#815cf0" },
    10: { value: "#754ee0" },
    11: { value: "#6848c7" },
    12: { value: "#332166" },
  },
  violetDark: {
    1: { value: "#110e1e" },
    2: { value: "#181529" },
    3: { value: "#271d4b" },
    4: { value: "#322066" },
    5: { value: "#3c2974" },
    6: { value: "#463483" },
    7: { value: "#55419a" },
    8: { value: "#6951bd" },
    9: { value: "#815cf0" },
    10: { value: "#754ee1" },
    11: { value: "#b6a5ff" },
    12: { value: "#e0dcff" },
  },
  red: {
    1: { value: "#fffcfc" },
    2: { value: "#fff7f8" },
    3: { value: "#ffeaea" },
    4: { value: "#ffdcdd" },
    5: { value: "#ffced0" },
    6: { value: "#fbbec2" },
    7: { value: "#f3abaf" },
    8: { value: "#ea9198" },
    9: { value: "#ff526f" },
    10: { value: "#f14464" },
    11: { value: "#ce1948" },
    12: { value: "#671324" },
  },
  redDark: {
    1: { value: "#170e0f" },
    2: { value: "#1f1415" },
    3: { value: "#3d1117" },
    4: { value: "#530a1a" },
    5: { value: "#641022" },
    6: { value: "#761d2d" },
    7: { value: "#902b3c" },
    8: { value: "#bd384f" },
    9: { value: "#ff526f" },
    10: { value: "#f14464" },
    11: { value: "#ff8e9a" },
    12: { value: "#ffd0d3" },
  },
  yellow: {
    1: { value: "#fefdf8" },
    2: { value: "#fffce6" },
    3: { value: "#fff8ab" },
    4: { value: "#fff180" },
    5: { value: "#ffe753" },
    6: { value: "#f1d94e" },
    7: { value: "#e0ca53" },
    8: { value: "#ccb300" },
    9: { value: "#ffe700" },
    10: { value: "#fd0" },
    11: { value: "#8d7800" },
    12: { value: "#433d1a" },
  },
  yellowDark: {
    1: { value: "#12110b" },
    2: { value: "#1a180f" },
    3: { value: "#292406" },
    4: { value: "#352c00" },
    5: { value: "#403600" },
    6: { value: "#4e4406" },
    7: { value: "#61561a" },
    8: { value: "#7b6e25" },
    9: { value: "#fde34e" },
    10: { value: "#f3d941" },
    11: { value: "#f9df49" },
    12: { value: "#f7edb5" },
  },
  gray: {
    1: { value: "#fcfcfe" },
    2: { value: "#f8f9fb" },
    3: { value: "#eff0f3" },
    4: { value: "#e7e8eb" },
    5: { value: "#e0e1e5" },
    6: { value: "#d8d9dd" },
    7: { value: "#ccced3" },
    8: { value: "#b9bbc2" },
    9: { value: "#898c96" },
    10: { value: "#7f828b" },
    11: { value: "#61636b" },
    12: { value: "#1c1f28" },
  },
  grayDark: {
    1: { value: "#101113" },
    2: { value: "#18191b" },
    3: { value: "#222225" },
    4: { value: "#282a2d" },
    5: { value: "#2f3135" },
    6: { value: "#383a3f" },
    7: { value: "#45474d" },
    8: { value: "#5e6069" },
    9: { value: "#6b6e77" },
    10: { value: "#787b84" },
    11: { value: "#b1b3bb" },
    12: { value: "#edeef0" },
  },
};
