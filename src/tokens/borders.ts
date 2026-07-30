import type { Tokens } from "@pandacss/types";

/**
 * border, outline
 */
export const borders: Tokens["borders"] = {
  neutral: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.neutral}",
      style: "solid",
    },
  },
  brand: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.brand}",
      style: "solid",
    },
  },
  danger: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.danger}",
      style: "solid",
    },
  },
  success: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.success}",
      style: "solid",
    },
  },
  warning: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.warning}",
      style: "solid",
    },
  },
  info: {
    value: {
      width: "{borderWidths.sm}",
      color: "{colors.border.info}",
      style: "solid",
    },
  },
};

/**
 * borderWidth, outlineWidth
 */
export const borderWidths: Tokens["borderWidths"] = {
  // 고밀도(DPR 2+)에서 hairline, DPR 1에서는 1 device px로 올림
  // https://drafts.csswg.org/css-values-4/#snap-as-a-line-width
  xs: { value: "0.5px" },
  sm: { value: "1px" },
  md: { value: "1.5px" },
  lg: { value: "2px" },
};
