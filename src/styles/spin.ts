import { css } from "../../styled-system/css";

export const spin = css({
  animation: "spin 1s linear infinite",
  "@media (prefers-reduced-motion: reduce)": {
    animationDuration: "2s",
  },
});
