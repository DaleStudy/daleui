import type { Tokens, SemanticTokens } from "@pandacss/types";

export const semanticSpacing: SemanticTokens["spacing"] = {
  px: {
    sm: {
      value: "{spacing.6}", // 1.5rem
    },
    md: {
      value: "{spacing.8}", // 2rem
    },
    lg: {
      value: "{spacing.10}", // 2.5rem
    },
  },
  py: {
    sm: {
      value: "{spacing.2}", // 0.5rem
    },
    md: {
      value: "{spacing.3}", // 0.75rem
    },
    lg: {
      value: "{spacing.4}", // 1rem
    },
  },
  gap: {
    sm: {
      value: "{spacing.4}", // 1rem
    },
    md: {
      value: "{spacing.6}", // 1.5rem
    },
    lg: {
      value: "{spacing.8}", // 2rem
    },
  },
};

export const spacing: Tokens["spacing"] = {
  0: { value: "0rem" },
  0.5: { value: "0.125rem" },
  1: { value: "0.25rem" },
  1.5: { value: "0.375rem" },
  2: { value: "0.5rem" },
  2.5: { value: "0.625rem" },
  3: { value: "0.75rem" },
  3.5: { value: "0.875rem" },
  4: { value: "1rem" },
  5: { value: "1.25rem" },
  6: { value: "1.5rem" },
  7: { value: "1.75rem" },
  8: { value: "2rem" },
  9: { value: "2.25rem" },
  10: { value: "2.5rem" },
  11: { value: "2.75rem" },
  12: { value: "3rem" },
  14: { value: "3.5rem" },
  16: { value: "4rem" },
  20: { value: "5rem" },
  24: { value: "6rem" },
  28: { value: "7rem" },
  32: { value: "8rem" },
  36: { value: "9rem" },
  40: { value: "10rem" },
};
