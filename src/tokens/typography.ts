export const textStyles = {
  xs: {
    value: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
    },
  },
  sm: {
    value: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
    },
  },
  md: {
    value: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
  lg: {
    value: {
      fontSize: "1.125rem",
      lineHeight: "1.75rem",
    },
  },
  xl: {
    value: {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
  },
  "2xl": {
    value: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
  },
  "3xl": {
    value: {
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
    },
  },
  "4xl": {
    value: {
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
    },
  },
  "5xl": {
    value: {
      fontSize: "3rem",
      lineHeight: "1",
    },
  },
  "6xl": {
    value: {
      fontSize: "3.75rem",
      lineHeight: "1",
    },
  },
  "7xl": {
    value: {
      fontSize: "4.5rem",
      lineHeight: "1",
    },
  },
  "8xl": {
    value: {
      fontSize: "6rem",
      lineHeight: "1",
    },
  },
  "9xl": {
    value: {
      fontSize: "8rem",
      lineHeight: "1",
    },
  },
};

export const fonts = {
  sans: { value: "Pretendard Variable" },
  mono: { value: "JetBrains Mono" },
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
  relaxed: { value: "1.75" },
};

export const headingStyles = {
  "h1": {
    value: {
      fontFamily: "sans",
      fontSize: "3xl",    
      fontWeight: "bold",
      lineHeight: "tight",
      letterSpacing: "tight",
    },
  },
  "h2": {
    value: {
      fontFamily: "sans", 
      fontSize: "2xl", 
      fontWeight: "bold",
      lineHeight: "tight",
      letterSpacing: "tight",
    },
  },
  "h3": {
    value: {
      fontFamily: "sans",
      fontSize: "xl", 
      fontWeight: "bold",
      lineHeight: "tight",
      letterSpacing: "tight",
    },
  },
  "h4": {
    value: {
      fontFamily: "sans",
      fontSize: "lg", 
      fontWeight: "bold", 
      lineHeight: "tight",
      letterSpacing: "tight",
    },
  },
  "h5": {
    value: {
      fontFamily: "sans",
      fontSize: "md", 
      fontWeight: "bold",
      lineHeight: "tight", 
      letterSpacing: "tight",
    },
  },
}; 
