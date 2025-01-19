import React from "react";
import { css, cva } from "../../../styled-system/css";
import type { SystemStyleObject } from "@pandacss/types";
// import { colors } from "../../tokens/colors";

type ButtonVariant =
  | "solid"
  | "outline"
  | "outline-gradient"
  | "default"
  | "accent"
  | "danger"
  | "warning";

export interface ButtonProps {
  /** 버튼 텍스트 */
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: ButtonVariant;
  style?: SystemStyleObject; // Add style prop for custom inline styles
}

/**
 * 버튼 컴포넌트입니다.
 */
export const Button = ({
  children,
  type = "button",
  onClick,
  variant = "default",
  style, // destructure the style prop
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={css(
        styles.raw({ variant }),
        baseStyles,
        ...(Array.isArray(style) ? style : [style]) // Ensure style is an array
      )}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

const baseStyles = {
  appearance: "none",
  margin: "0",
  padding: "0.7rem 3rem",
  fontSize: "1.5rem",
  fontWeight: 500,
  textAlign: "center",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: ["auto", "100%"],
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.2s",
  lineHeight: "1",
  outline: "0",
  "&:focus": {
    outlineColor: "focus",
    outline: "3px solid",
    outlineOffset: "2px",
    borderRadius: "10px",
  },
  "&:disabled": { opacity: 0.5 },
};

const styles = cva({
  variants: {
    variant: {
      default: {
        background: "bg",
        color: "text",
        "&:active, &:hover": {
          background: "bg.hover",
          outline: "0",
        },
      },
      accent: {
        background: "bg.accent",
        color: "text.accent",
        "&:active, &:hover": {
          background: "bg.hover.accent",
          outline: "0",
        },
      },
      danger: {
        background: "bg.danger",
        color: "text.danger",
        "&:active, &:hover": {
          background: "bg.hover.danger",
          outline: "0",
        },
      },
      warning: {
        background: "bg.warning",
        color: "text.warning",
        "&:active, &:hover": {
          background: "bg.hover.warning",
          outline: "0",
        },
      },
      solid: {
        background: "bg.solid",
        color: "text.solid",
        "&:active, &:hover": {
          background: "bg.hover.solid",
          outline: "0",
        },
      },
      outline: {
        background: "bg.outline",
        color: "text.outline",
        border: "4px solid",
        borderColor: "border.outline",
        "&:active, &:hover": {
          background: "bg.hover.outline",
          outline: "0",
        },
      },
      "outline-gradient": {
        "--gradient-color": "linear-gradient(135deg, #24eaca, #846de9)",
        background: "transparent",
        color: "text.outline",
        border: "4px solid transparent",
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "padding-box, border-box",
        borderImage: "var(--gradient-color)",
        borderImageSlice: "1",
        borderImageOutset: "0",
        "&:active, &:hover": {
          outline: "0",
        },
      },
    },
  },
});
