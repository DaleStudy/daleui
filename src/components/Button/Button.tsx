import React, { type HTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { SystemStyleObject } from "@pandacss/types";

type ButtonVariant = "solid" | "outline" | "transparent";

type ButtonTone = "primary" | "neutral" | "accent" | "danger" | "warning";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** 텍스트 */
  children: React.ReactNode;
  /** 타입 */
  type?: "button" | "submit";
  onClick?: () => void;
  /** 종류 */
  variant: ButtonVariant;
  /** 색조 */
  tone?: ButtonTone;
  /** 추가 스타일 */
  style?: SystemStyleObject; // Add style prop for custom inline styles
}

/**
 * 버튼 컴포넌트입니다.
 */
export const Button = ({
  children,
  type = "button",
  onClick,
  variant = "solid",
  tone = "primary",
  style, // destructure the style prop
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={css(
        styles.raw({ tone, variant }),
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
  compoundVariants: [
    {
      variant: "solid",
      tone: "primary",
      css: {
        background: "primary",
        color: "{colors.violet.1}",
        "&:active, &:hover": {
          background: "{colors.violetDark.10}",
        },
      },
    },
    {
      variant: "solid",
      tone: "neutral",
      css: {
        background: "bg",
        color: "text",
        "&:active, &:hover": {
          background: "bg.hover",
        },
      },
    },
    {
      variant: "solid",
      tone: "neutral",
      css: {
        background: "bg",
        color: "text",
        "&:active, &:hover": {
          background: "bg.hover",
        },
      },
    },
    {
      variant: "solid",
      tone: "accent",
      css: {
        background: "bg.accent",
        color: "text.accent",
        "&:active, &:hover": {
          background: "bg.hover.accent",
        },
      },
    },
    {
      variant: "solid",
      tone: "danger",
      css: {
        background: "bg.danger",
        color: "text.danger",
        "&:active, &:hover": {
          background: "bg.hover.danger",
        },
      },
    },
    {
      variant: "solid",
      tone: "warning",
      css: {
        background: "bg.warning",
        color: "text.warning",
        "&:active, &:hover": {
          background: "bg.hover.warning",
        },
      },
    },
  ],
});
