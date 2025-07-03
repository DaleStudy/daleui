import type { SemanticTokens, Tokens } from "@pandacss/types";

export type Tone =
  | "brand"
  | "neutral"
  | "danger"
  | "success"
  | "warning"
  | "info";

export const semanticColors: SemanticTokens["colors"] = {
  appBg: {
    value: { base: "{colors.white}", _dark: "{colors.black}" },
  },
  fgSolid: {
    neutral: {
      value: { base: "{colors.slate.1}", _dark: "{colors.darkSage.1}" },
    },
    brand: {
      value: { base: "{colors.violet.1}", _dark: "{colors.darkTeal.1}" },
    },
    success: {
      value: { base: "{colors.green.1}", _dark: "{colors.darkGreen.1}" },
    },
    warning: {
      value: { base: "{colors.amber.12}", _dark: "{colors.darkAmber.2}" },
    },
    danger: { value: { base: "{colors.red.1}", _dark: "{colors.darkRed.2}" } },
    info: { value: { base: "{colors.blue.1}", _dark: "{colors.darkBlue.2}" } },
  },
  bg: {
    brand: {
      DEFAULT: {
        value: { base: "{colors.violet.2}", _dark: "{colors.darkTeal.2}" },
      },
      hover: {
        value: { base: "{colors.violet.3}", _dark: "{colors.darkTeal.3}" },
      },
      active: {
        value: { base: "{colors.violet.4}", _dark: "{colors.darkTeal.4}" },
      },
    },
    neutral: {
      DEFAULT: {
        value: { base: "{colors.white}", _dark: "{colors.darkSage.1}" },
      },
      hover: {
        value: { base: "{colors.slate.2}", _dark: "{colors.darkSage.2}" },
      },
      active: {
        value: { base: "{colors.slate.3}", _dark: "{colors.darkSage.3}" },
      },
      disabled: {
        value: { base: "{colors.slate.5}", _dark: "{colors.darkSage.5}" },
      },
    },
    danger: {
      DEFAULT: {
        value: { base: "{colors.red.1}", _dark: "{colors.darkRed.1}" },
      },
      hover: { value: { base: "{colors.red.2}", _dark: "{colors.darkRed.2}" } },
      active: {
        value: { base: "{colors.red.3}", _dark: "{colors.darkRed.3}" },
      },
    },
    success: {
      value: { base: "{colors.green.1}", _dark: "{colors.darkGreen.1}" },
    },
    warning: {
      value: { base: "{colors.amber.1}", _dark: "{colors.darkAmber.1}" },
    },
    info: { value: { base: "{colors.blue.2}", _dark: "{colors.darkBlue.3}" } },
  },
  border: {
    brand: {
      DEFAULT: {
        value: { base: "{colors.violet.8}", _dark: "{colors.darkTeal.8}" },
      },
      active: {
        value: { base: "{colors.violet.9}", _dark: "{colors.darkTeal.9}" },
      },
      focus: {
        value: { base: "{colors.violet.10}", _dark: "{colors.darkTeal.10}" },
      },
    },
    neutral: {
      DEFAULT: {
        value: { base: "{colors.slate.5}", _dark: "{colors.darkSage.6}" },
      },
      hover: {
        value: { base: "{colors.slate.6}", _dark: "{colors.darkSage.7}" },
      },
      active: {
        value: { base: "{colors.slate.7}", _dark: "{colors.darkSage.8}" },
      },
      disabled: {
        value: { base: "{colors.slate.6}", _dark: "{colors.darkSage.7}" },
      },
    },
    success: {
      value: { base: "{colors.green.8}", _dark: "{colors.darkGreen.8}" },
    },
    warning: {
      value: { base: "{colors.amber.7}", _dark: "{colors.darkAmber.7}" },
    },
    danger: { value: { base: "{colors.red.9}", _dark: "{colors.darkRed.8}" } },
    info: { value: { base: "{colors.blue.9}", _dark: "{colors.darkBlue.9}" } },
  },
  bgSolid: {
    brand: {
      DEFAULT: {
        value: { base: "{colors.violet.9}", _dark: "{colors.darkTeal.9}" },
      },
      hover: {
        value: { base: "{colors.violet.10}", _dark: "{colors.darkTeal.10}" },
      },
      active: {
        value: { base: "{colors.violet.11}", _dark: "{colors.darkTeal.11}" },
      },
    },
    neutral: {
      DEFAULT: {
        value: { base: "{colors.slate.9}", _dark: "{colors.darkSage.11}" },
      },
      hover: {
        value: { base: "{colors.slate.10}", _dark: "{colors.darkSage.12}" },
      },
      active: {
        value: { base: "{colors.slate.11}", _dark: "{colors.white}" },
      },
      disabled: {
        value: { base: "{colors.slate.5}", _dark: "{colors.darkSlate.6}" },
      },
    },
    danger: {
      DEFAULT: {
        value: { base: "{colors.red.10}", _dark: "{colors.darkRed.10}" },
      },
      hover: {
        value: { base: "{colors.red.11}", _dark: "{colors.darkRed.11}" },
      },
      active: {
        value: { base: "{colors.red.12}", _dark: "{colors.darkRed.12}" },
      },
    },
    success: {
      DEFAULT: {
        value: { base: "{colors.green.10}", _dark: "{colors.darkGreen.10}" },
      },
      hover: {
        value: { base: "{colors.green.11}", _dark: "{colors.darkGreen.11}" },
      },
      active: {
        value: { base: "{colors.green.12}", _dark: "{colors.darkGreen.12}" },
      },
    },
    warning: {
      DEFAULT: {
        value: { base: "{colors.amber.9}", _dark: "{colors.darkAmber.10}" },
      },
      hover: {
        value: { base: "{colors.amber.10}", _dark: "{colors.darkAmber.11}" },
      },
      active: {
        value: { base: "{colors.amber.11}", _dark: "{colors.darkAmber.12}" },
      },
    },
    info: {
      DEFAULT: {
        value: { base: "{colors.blue.10}", _dark: "{colors.darkBlue.10}" },
      },
      hover: {
        value: { base: "{colors.blue.11}", _dark: "{colors.darkBlue.11}" },
      },
      active: {
        value: { base: "{colors.blue.12}", _dark: "{colors.darkBlue.12}" },
      },
    },
  },
  fg: {
    brand: {
      DEFAULT: {
        value: { base: "{colors.violet.9}", _dark: "{colors.darkTeal.9}" },
      },
      hover: {
        value: { base: "{colors.violet.10}", _dark: "{colors.darkTeal.10}" },
      },
      active: {
        value: { base: "{colors.violet.11}", _dark: "{colors.darkTeal.11}" },
      },
      visited: {
        value: { base: "{colors.violet.12}", _dark: "{colors.darkTeal.12}" },
      },
    },
    neutral: {
      DEFAULT: {
        value: { base: "{colors.slate.9}", _dark: "{colors.darkSage.11}" },
      },
      hover: {
        value: { base: "{colors.slate.10}", _dark: "{colors.darkSage.12}" },
      },
      active: { value: { base: "{colors.slate.11}", _dark: "{colors.white}" } },
      placeholder: {
        value: { base: "{colors.slate.7}", _dark: "{colors.darkSage.9}" },
      },
      disabled: {
        value: { base: "{colors.slate.10}", _dark: "{colors.darkSage.9}" },
      },
    },
    success: {
      value: { base: "{colors.green.11}", _dark: "{colors.darkGreen.11}" },
    },
    warning: {
      value: { base: "{colors.amber.11}", _dark: "{colors.darkAmber.11}" },
    },
    danger: {
      value: { base: "{colors.red.11}", _dark: "{colors.darkRed.11}" },
    },
    info: {
      value: { base: "{colors.blue.11}", _dark: "{colors.darkBlue.11}" },
    },
  },
};

export const colors: Tokens["colors"] = {
  base: {
    white: { value: "#FFFFFF" },
    black: { value: "#000000" },
  },
  slate: {
    1: { value: "#F4F6F7" },
    2: { value: "#E3E8EA" },
    3: { value: "#CAD3D7" },
    4: { value: "#A4B4BC" },
    5: { value: "#A4B4BC" },
    6: { value: "#788D98" },
    7: { value: "#5D727D" },
    8: { value: "#505F6A" },
    9: { value: "#455159" },
    10: { value: "#3D464D" },
    11: { value: "#363C43" },
    12: { value: "#1C2024" },
  },
  darkSlate: {
    1: { value: "#111113" },
    2: { value: "#18191B" },
    3: { value: "#212225" },
    4: { value: "#272A2D" },
    5: { value: "#2E3135" },
    6: { value: "#363A3F" },
    7: { value: "#43484E" },
    8: { value: "#5A6169" },
    9: { value: "#696E77" },
    10: { value: "#777B84" },
    11: { value: "#B0B4BA" },
    12: { value: "#EDEEF0" },
  },
  sage: {
    1: { value: "#FBFDFC" },
    2: { value: "#F7F9F8" },
    3: { value: "#EEF1F0" },
    4: { value: "#E6E9E8" },
    5: { value: "#DFE2E0" },
    6: { value: "#D7DAD9" },
    7: { value: "#CBCFCD" },
    8: { value: "#B8BCBA" },
    9: { value: "#868E8B" },
    10: { value: "#7C8481" },
    11: { value: "#5F6563" },
    12: { value: "#1A211E" },
  },
  darkSage: {
    1: { value: "#0F1110" },
    2: { value: "#161917" },
    3: { value: "#1D211F" },
    4: { value: "#2C312F" },
    5: { value: "#3A403E" },
    6: { value: "#4A524F" },
    7: { value: "#5D6763" },
    8: { value: "#707D78" },
    9: { value: "#8B9792" },
    10: { value: "#A9B4AE" },
    11: { value: "#C7D1CB" },
    12: { value: "#E1E7E3" },
  },
  violet: {
    1: { value: "#FDFDFF" },
    2: { value: "#F7F8FF" },
    3: { value: "#EFF1FF" },
    4: { value: "#E3E7FF" },
    5: { value: "#D6DBFF" },
    6: { value: "#C7CCFF" },
    7: { value: "#B3B8FF" },
    8: { value: "#979AFF" },
    9: { value: "#5333E1" },
    10: { value: "#481ACF" },
    11: { value: "#32228D" },
    12: { value: "#2A2270" },
  },
  darkViolet: {
    1: { value: "#14121F" },
    2: { value: "#1B1525" },
    3: { value: "#291F43" },
    4: { value: "#33255B" },
    5: { value: "#3C2E69" },
    6: { value: "#473876" },
    7: { value: "#56468B" },
    8: { value: "#6958AD" },
    9: { value: "#6E56CF" },
    10: { value: "#7D66D9" },
    11: { value: "#BAA7FF" },
    12: { value: "#E2DDFE" },
  },
  teal: {
    1: { value: "#FAFEFD" },
    2: { value: "#F3FBF9" },
    3: { value: "#E0F8F3" },
    4: { value: "#CCF3EA" },
    5: { value: "#B8EAE0" },
    6: { value: "#A1DED2" },
    7: { value: "#83CDC1" },
    8: { value: "#53B9AB" },
    9: { value: "#12A594" },
    10: { value: "#0D9B8A" },
    11: { value: "#008573" },
    12: { value: "#0D3D38" },
  },
  darkTeal: {
    1: { value: "#0D1514" },
    2: { value: "#111C1B" },
    3: { value: "#0D2D2A" },
    4: { value: "#023B37" },
    5: { value: "#084843" },
    6: { value: "#145750" },
    7: { value: "#1C6961" },
    8: { value: "#207E73" },
    9: { value: "#12A594" },
    10: { value: "#0EB39E" },
    11: { value: "#0BD8B6" },
    12: { value: "#ADF0DD" },
  },
  red: {
    1: { value: "#FFFCFC" },
    2: { value: "#FFF7F7" },
    3: { value: "#FEEBEC" },
    4: { value: "#FFDBDC" },
    5: { value: "#FFCDCE" },
    6: { value: "#FDBDBE" },
    7: { value: "#F4A9AA" },
    8: { value: "#EB8E90" },
    9: { value: "#E43F44" },
    10: { value: "#D7292E" },
    11: { value: "#CB2328" },
    12: { value: "#641723" },
  },
  darkRed: {
    1: { value: "#191111" },
    2: { value: "#201314" },
    3: { value: "#3B1219" },
    4: { value: "#500F1C" },
    5: { value: "#611623" },
    6: { value: "#72232D" },
    7: { value: "#8C333A" },
    8: { value: "#B54548" },
    9: { value: "#E5484D" },
    10: { value: "#EC5D5E" },
    11: { value: "#FF9592" },
    12: { value: "#FFD1D9" },
  },
  amber: {
    1: { value: "#FEFDFB" },
    2: { value: "#FEFBE9" },
    3: { value: "#FFF7C2" },
    4: { value: "#FFEE9C" },
    5: { value: "#FBE577" },
    6: { value: "#F3D673" },
    7: { value: "#E9C162" },
    8: { value: "#E2A336" },
    9: { value: "#FFC53D" },
    10: { value: "#FFBA18" },
    11: { value: "#DD9E08" },
    12: { value: "#4F3422" },
  },
  darkAmber: {
    1: { value: "#16120C" },
    2: { value: "#1D180F" },
    3: { value: "#302008" },
    4: { value: "#3F2700" },
    5: { value: "#4D3000" },
    6: { value: "#5C3D05" },
    7: { value: "#714F19" },
    8: { value: "#8F6424" },
    9: { value: "#FFC53D" },
    10: { value: "#FFD60A" },
    11: { value: "#FFCA16" },
    12: { value: "#FFE7B3" },
  },
  blue: {
    1: { value: "#FBFDFF" },
    2: { value: "#F4FAFF" },
    3: { value: "#E6F4FE" },
    4: { value: "#D5EFFF" },
    5: { value: "#C2E5FF" },
    6: { value: "#ACD8FC" },
    7: { value: "#8EC8F6" },
    8: { value: "#5EB1EF" },
    9: { value: "#0090FF" },
    10: { value: "#0463AF" },
    11: { value: "#095190" },
    12: { value: "#113264" },
  },
  darkBlue: {
    1: { value: "#0D1520" },
    2: { value: "#111927" },
    3: { value: "#0D2847" },
    4: { value: "#003362" },
    5: { value: "#004074" },
    6: { value: "#104D87" },
    7: { value: "#205D9E" },
    8: { value: "#2870BD" },
    9: { value: "#0090FF" },
    10: { value: "#3B9EFF" },
    11: { value: "#70B8FF" },
    12: { value: "#C2E6FF" },
  },
  green: {
    1: { value: "#FBFEFC" },
    2: { value: "#F4FBF6" },
    3: { value: "#E6F6EB" },
    4: { value: "#D6F1DF" },
    5: { value: "#C4E8D1" },
    6: { value: "#ADDDC0" },
    7: { value: "#8ECEAA" },
    8: { value: "#5BB98B" },
    9: { value: "#30A46C" },
    10: { value: "#21784F" },
    11: { value: "#1A6644" },
    12: { value: "#193B2D" },
  },
  darkGreen: {
    1: { value: "#0E1512" },
    2: { value: "#121B17" },
    3: { value: "#132D21" },
    4: { value: "#113B29" },
    5: { value: "#174933" },
    6: { value: "#20573E" },
    7: { value: "#28684A" },
    8: { value: "#2F7C57" },
    9: { value: "#30A46C" },
    10: { value: "#33B074" },
    11: { value: "#3DD68C" },
    12: { value: "#B1F1CB" },
  },
};
