import { style } from "@vanilla-extract/css";

export const button = style({
  vars: {
    "--button-color": "#ffffff",
    "--button-bg-color": "#0d6efd",
    "--button-hover-bg-color": "#025ce2",
  },
  appearance: "none",
  margin: "0",
  padding: "0.5rem 1rem",
  background: "var(--button-bg-color)",
  color: "var(--button-color)",
  fontSize: "1rem",
  fontWeight: 400,
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  width: ["auto", "100%"],
  border: "none",
  borderRadius: "4px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  cursor: "pointer",
  transition: "0.5s",
  selectors: {
    "&:active,  &:hover,  &:focus": {
      background: "var(--button-hover-bg-color)",
      outline: "0",
    },
    "&:disabled": { opacity: 0.5 },
  },
});
