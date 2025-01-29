import React, { type HTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { SystemStyleObject } from "@pandacss/types";

type ButtonVariant = "solid" | "outline";

type ButtonTone = "neutral" | "accent" | "danger" | "warning";

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
  tone = "neutral",
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
  "&:disabled": { opacity: 0.5 },
};

const styles = cva({
  compoundVariants: [
    {
      variant: "solid",
      tone: "neutral",
      css: {
        background: "bg",
        color: "text",
        "&:active, &:hover": {
          background: "bg.hover",
        },
        "&:focus": {
          outlineColor: "border.neutral",
          outline: "3px solid",
          outlineOffset: "2px",
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
        "&:focus": {
          outlineColor: "border.accent",
          outline: "3px solid",
          outlineOffset: "2px",
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
        "&:focus": {
          outlineColor: "border.danger",
          outline: "3px solid",
          outlineOffset: "2px",
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
        "&:focus": {
          outlineColor: "border.warning",
          outline: "3px solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "3px solid",
        borderColor: "border",
        color: "text.DEFAULT.base",
        "&:active, &:hover": {
          background: "bg.hover",
          color: "text.muted",
        },
        "&:focus": {
          outlineColor: "border.neutral",
          outline: "3px solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "outline",
      tone: "accent",
      css: {
        border: "3px solid",
        borderColor: "border.accent",
        color: "text.accent.base",
        "&:active, &:hover": {
          background: "bg.hover.accent",
          color: "text.muted.accent",
        },
        "&:focus": {
          outlineColor: "border.accent",
          outline: "3px solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "outline",
      tone: "danger",
      css: {
        border: "3px solid",
        borderColor: "border.danger",
        color: "text.danger.base",
        "&:active, &:hover": {
          background: "bg.hover.danger",
          color: "text.muted.danger",
        },
        "&:focus": {
          outlineColor: "border.danger",
          outline: "3px solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "outline",
      tone: "warning",
      css: {
        border: "3px solid",
        borderColor: "border.warning",
        color: "text.warning.base",
        "&:active, &:hover": {
          background: "bg.hover.warning",
          color: "text.muted.warning",
        },
        "&:focus": {
          outlineColor: "border.warning",
          outline: "3px solid",
          outlineOffset: "2px",
        },
      },
    },
  ],
});
