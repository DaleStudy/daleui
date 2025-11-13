export const textStyles = {
  display: {
    lg: {
      value: {
        fontFamily: "sans",
        fontSize: "8xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "7xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "5xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
  },
  title: {
    lg: {
      value: {
        fontFamily: "sans",
        fontSize: "4xl",
        fontWeight: "semibold",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "3xl",
        fontWeight: "semibold",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "2xl",
        fontWeight: "medium",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
  },
  body: {
    lg: {
      value: {
        fontFamily: "sans",
        fontSize: "lg",
        fontWeight: "normal",
        lineHeight: "balanced",
        letterSpacing: "balanced",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "md",
        fontWeight: "normal",
        lineHeight: "balanced",
        letterSpacing: "balanced",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "sm",
        fontWeight: "semibold",
        lineHeight: "balanced",
        letterSpacing: "balanced",
      },
    },
  },
  label: {
    lg: {
      DEFAULT: {
        value: {
          fontFamily: "sans",
          fontSize: "lg",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
      underline: {
        value: {
          fontFamily: "sans",
          fontSize: "lg",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
          textDecoration: "underline",
        },
      },
    },
    md: {
      DEFAULT: {
        value: {
          fontFamily: "sans",
          fontSize: "md",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
      underline: {
        value: {
          fontFamily: "sans",
          fontSize: "md",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
          textDecoration: "underline",
        },
      },
      strong: {
        value: {
          fontFamily: "sans",
          fontSize: "md",
          fontWeight: "semibold",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
    },
    sm: {
      DEFAULT: {
        value: {
          fontFamily: "sans",
          fontSize: "sm",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
        },
      },
      underline: {
        value: {
          fontFamily: "sans",
          fontSize: "sm",
          fontWeight: "medium",
          lineHeight: "tight",
          letterSpacing: "balanced",
          textDecoration: "underline",
        },
      },
    },
  },
  caption: {
    value: {
      fontFamily: "sans",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "tight",
      letterSpacing: "balanced",
    },
  },
  code: {
    value: {
      fontFamily: "mono",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "balanced",
      letterSpacing: "balanced",
    },
  },
  heading: {
    "1": {
      value: {
        fontFamily: "sans",
        fontSize: { base: "3xl", lg: "5xl" },
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "2": {
      value: {
        fontFamily: "sans",
        fontSize: { base: "3xl", lg: "4xl" },
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "3": {
      value: {
        fontFamily: "sans",
        fontSize: { base: "2xl", lg: "3xl" },
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "4": {
      value: {
        fontFamily: "sans",
        fontSize: { base: "xl", lg: "2xl" },
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "5": {
      value: {
        fontFamily: "sans",
        fontSize: { base: "lg", lg: "xl" },
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
  },
};

export const fonts = {
  sans: { value: '"Pretendard Variable", sans-serif' },
  mono: { value: '"JetBrains Mono", monospace' },
};

export const fontWeights = {
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
};

export type FontWeight = keyof typeof fontWeights;

export const fontSizes = {
  xs: { value: "0.75rem" }, // 12px
  sm: { value: "0.875rem" }, // 14px
  md: { value: "1rem" }, // 16px
  lg: { value: "1.125rem" }, // 18px
  xl: { value: "1.25rem" }, // 20px
  "2xl": { value: "1.5rem" }, // 24px
  "3xl": { value: "1.875rem" }, // 30px
  "4xl": { value: "2.25rem" }, // 36px
  "5xl": { value: "2.75rem" }, // 44px
  "6xl": { value: "3.25rem" }, // 52px
  "7xl": { value: "3.75rem" }, // 60px
  "8xl": { value: "4.5rem" }, // 72px
};

export type FontSize = keyof typeof fontSizes;

export const letterSpacings = {
  tight: { value: "-0.1" },
  balanced: { value: "0" },
};

export const lineHeights = {
  tight: { value: "1.2" },
  balanced: { value: "1.5" },
};
