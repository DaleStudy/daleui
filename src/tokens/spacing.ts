import type { Tokens, SemanticTokens } from "@pandacss/types";

export const semanticSpacing: SemanticTokens["spacing"] = {
  px: {
    sm: {
      value: "{spacing.24}", // 1.5rem
    },
    md: {
      value: "{spacing.32}", // 2rem
    },
    lg: {
      value: "{spacing.40}", // 2.5rem
    },
  },
  py: {
    sm: {
      value: "{spacing.8}", // 0.5rem
    },
    md: {
      value: "{spacing.12}", // 0.75rem
    },
    lg: {
      value: "{spacing.16}", // 1rem
    },
  },
  gap: {
    sm: {
      value: "{spacing.16}", // 1rem
    },
    md: {
      value: "{spacing.24}", // 1.5rem
    },
    lg: {
      value: "{spacing.32}", // 2rem
    },
  },
};

export const spacing: Tokens["spacing"] = {
  0: { value: "0rem" },
  2: { value: "0.125rem" },
  4: { value: "0.25rem" },
  8: { value: "0.5rem" },
  12: { value: "0.75rem" },
  16: { value: "1rem" },
  20: { value: "1.25rem" },
  24: { value: "1.5rem" },
  32: { value: "2rem" },
  36: { value: "2.25rem" },
  40: { value: "2.5rem" },
  48: { value: "3rem" },
};
