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
    outlineColor: { base: "{colors.violet.10}", _dark: "{colors.violet.7}" },
    outline: "3px solid",
    outlineOffset: "2px",
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
        },
      },
      accent: {
        background: "bg.accent",
        color: "text.accent",
        "&:active, &:hover": {
          background: "bg.hover.accent",
        },
      },
      danger: {
        background: "bg.danger",
        color: "text.danger",
        "&:active, &:hover": {
          background: "bg.hover.danger",
        },
      },
      warning: {
        background: "bg.warning",
        color: "text.warning",
        "&:active, &:hover": {
          background: "bg.hover.warning",
        },
      },
      solid: {
        background: { base: "{colors.violet.9}", _dark: "{colors.violet.9}" },
        color: { base: "{colors.violet.1}", _dark: "{colors.violet.1}" },
        "&:active, &:hover": {
          background: {
            base: "{colors.violet.8}",
            _dark: "{colors.violetDark.10}",
          },
        },
      },
      outline: {
        background: {
          base: "{colors.violet.2}",
          _dark: "{colors.violetDark.8}",
        },
        color: {
          base: "{colors.violetDark.1}",
          _dark: "{colors.violet.1}",
        },
        border: "4px solid",
        borderColor: {
          base: "{colors.violetDark.10}",
          _dark: "{colors.violet.7}",
        },
        "&:active, &:hover": {
          background: {
            base: "{colors.violet.4}",
            _dark: "{colors.violetDark.10}",
          },
        },
      },
      "outline-gradient": {
        "--gradient-color":
          "linear-gradient(90deg,{colors.teal.9},{colors.violet.10})",
        background: "transparent",
        color: {
          base: "{colors.violetDark.1}",
          _dark: "{colors.violet.1}",
        },
        border: "4px solid transparent",
        borderRadius: "10px",
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "padding-box, border-box",
        borderImage: "var(--gradient-color)",
        borderImageSlice: "1",
        borderImageOutset: "0",
        "&:active, &:hover": {},
      },
    },
  },
});
