import type { Tokens } from "@pandacss/types";

/**
 * border, outline
 */
export const borders: Tokens["borders"] = {
  neutral: {
    value: {
      // width: "1px", // FIXME Replace it to the following after issue https://github.com/chakra-ui/panda/issues/3275 is fixed
      width: "{borderWidths.sm}",
      color: "{colors.border}", // FIXME Update it to the following after PR #251 is merged.
      // color: "{colors.border.neutral}",
      style: "solid",
    },
  },
  brand: {
    value: {
      // width: "1px", // FIXME Replace it to the following after issue https://github.com/chakra-ui/panda/issues/3275 is fixed
      width: "{borderWidths.sm}",
      color: "{colors.border.accent}", // FIXME Update it to the following after PR #251 is merged.
      // color: "{colors.border.brand}",
      style: "solid",
    },
  },
  danger: {
    value: {
      // width: "1px", // FIXME Replace it to the following after issue https://github.com/chakra-ui/panda/issues/3275 is fixed
      width: "{borderWidths.sm}",
      color: "{colors.border.danger}",
      style: "solid",
    },
  },
  success: {
    value: {
      // width: "1px", // FIXME Replace it to the following after issue https://github.com/chakra-ui/panda/issues/3275 is fixed
      width: "{borderWidths.sm}",
      color: "{colors.border}", // FIXME Update it to the following after PR #251 is merged.
      // color: "{colors.border.success}",
      style: "solid",
    },
  },
  warning: {
    value: {
      // width: "1px", // FIXME Replace it to the following after issue https://github.com/chakra-ui/panda/issues/3275 is fixed
      width: "{borderWidths.sm}",
      color: "{colors.border.warning}",
      style: "solid",
    },
  },
  info: {
    value: {
      // width: "1px", // FIXME Replace it to the following after issue https://github.com/chakra-ui/panda/issues/3275 is fixed
      width: "{borderWidths.sm}",
      color: "{colors.border}", // FIXME Update it to the following after PR #251 is merged.
      // color: "{colors.border.info}",
      style: "solid",
    },
  },
};

/**
 * borderWidth, outlineWidth
 */
export const borderWidths: Tokens["borderWidths"] = {
  sm: { value: "1px" },
  md: { value: "1.5px" },
  lg: { value: "2px" },
};
