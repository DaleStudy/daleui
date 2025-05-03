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
  sans: { value: '"Pretendard Variable", "Noto Sans KR", sans-serif' },
  // TODO customize serif and mono font styles when needed
};

export const fontWeights = {
  thin: { value: "100" },
  light: { value: "300" },
  normal: { value: "400" },
  medium: { value: "500" },
  bold: { value: "700" },
};

export type FontWeight = keyof typeof fontWeights;

export const fontSizes = {
  "2xs": { value: "0.5rem" },
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
  "4xl": { value: "2.25rem" },
  "5xl": { value: "3rem" },
  "6xl": { value: "3.75rem" },
  "7xl": { value: "4.5rem" },
  "8xl": { value: "6rem" },
  "9xl": { value: "8rem" },
};

export type FontSize = keyof typeof fontSizes;

export const letterSpacings = {
  tighter: { value: "-0.05em" },
  tight: { value: "-0.025em" },
  normal: { value: "0em" },
  wide: { value: "0.025em" },
  wider: { value: "0.05em" },
  widest: { value: "0.1em" },
};

export const lineHeights = {
  none: { value: "1" },
  tight: { value: "1.25" },
  snug: { value: "1.375" },
  normal: { value: "1.5" },
  relaxed: { value: "1.625" },
  loose: { value: "2" },
};
