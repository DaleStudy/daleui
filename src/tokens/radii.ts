import type { Tokens } from "@pandacss/types";

export const radii: Tokens["radii"] = {
  xs: { value: "0.125rem" }, // 2px
  sm: { value: "0.25rem" }, // 4px
  md: { value: "0.5rem" }, // 8px
  lg: { value: "1rem" }, // 16px
  full: { value: "calc(infinity * 1px)" }, // 9999px
};
