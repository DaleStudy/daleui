import type { Tokens } from "@pandacss/types";

export const textStyles = {
  xs: {
    fontSize: "0.75rem",
    lineHeight: "1rem",
  },
  sm: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  md: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  lg: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
  },
  xl: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
  },
  "2xl": {
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
  "3xl": {
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
  },
  "4xl": {
    fontSize: "2.25rem",
    lineHeight: "2.5rem",
  },
  "5xl": {
    fontSize: "3rem",
    lineHeight: "1",
  },
  "6xl": {
    fontSize: "3.75rem",
    lineHeight: "1",
  },
  "7xl": {
    fontSize: "4.5rem",
    lineHeight: "1",
  },
  "8xl": {
    fontSize: "6rem",
    lineHeight: "1",
  },
  "9xl": {
    fontSize: "8rem",
    lineHeight: "1",
  },
};

export type TextStyle = keyof typeof textStyles;

export const fonts: Tokens["fonts"] = {
  sans: { value: '"Spoqa Han Sans Neo", "Noto Sans KR", sans-serif' },
  // TODO customize serif and mono font styles when needed
};

export const fontWeights = {
  thin: "100",
  light: "300",
  normal: "400",
  medium: "500",
  bold: "700",
};

export type FontWeight = keyof typeof fontWeights;

export const fontSizes = {
  "2xs": "0.5rem",
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

export type FontSize = keyof typeof fontSizes;

export const letterSpacings: Tokens["letterSpacings"] = {
  tighter: { value: "-0.05em" },
  tight: { value: "-0.025em" },
  normal: { value: "0em" },
  wide: { value: "0.025em" },
  wider: { value: "0.05em" },
  widest: { value: "0.1em" },
};

export const lineHeights: Tokens["lineHeights"] = {
  none: { value: "1" },
  tight: { value: "1.25" },
  snug: { value: "1.375" },
  normal: { value: "1.5" },
  relaxed: { value: "1.625" },
  loose: { value: "2" },
};
