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
      value: {
        fontFamily: "sans",
        fontSize: "lg", 
        fontWeight: "medium",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
    md: {
      value: {
        fontFamily: "sans",
        fontSize: "md", 
        fontWeight: "medium",
        lineHeight: "tight",
        letterSpacing: "balanced",
      },
    },
    sm: {
      value: {
        fontFamily: "sans",
        fontSize: "sm", 
        fontWeight: "medium",
        lineHeight: "tight",
        letterSpacing: "balanced",
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
        fontSize: "3xl",    
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "2": {
      value: {
        fontFamily: "sans", 
        fontSize: "2xl", 
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "3": {
      value: {
        fontFamily: "sans",
        fontSize: "xl", 
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "4": {
      value: {
        fontFamily: "sans",
        fontSize: "lg", 
        fontWeight: "bold", 
        lineHeight: "tight",
        letterSpacing: "tight",
      },
    },
    "5": {
      value: {
        fontFamily: "sans",
        fontSize: "md", 
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
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
  "4xl": { value: "2.25rem" },
  "5xl": { value: "2.75rem" },
  "6xl": { value: "3.25rem" },
  "7xl": { value: "3.75rem" },
  "8xl": { value: "4.5rem" },
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

 
