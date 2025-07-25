import React, { type HTMLAttributes } from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

type ButtonVariant = "solid" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** 텍스트 */
  children: React.ReactNode;
  /** 타입 */
  type?: "button" | "submit";
  /** 클릭 시 실행함수 */
  onClick?: () => void;
  /** 종류 */
  variant: ButtonVariant;
  /** 색조 */
  tone?: Tone;
  /** 버튼의 크기 */
  size?: ButtonSize;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}

/**
 * - `variant` 속성으로 버튼의 스타일 종류를 지정할 수 있습니다.
 * - `tone` 속성으로 버튼의 색상 강조를 지정할 수 있습니다.
 * - `size` 속성으로 버튼의 크기를 지정할 수 있습니다.
 * - `type` 속성으로 버튼의 타입을 지정할 수 있습니다.
 * - `disabled` 속성을 사용하여 버튼을 비활성화할 수 있습니다.
 */
export const Button = ({
  children,
  type = "button",
  onClick,
  variant = "solid",
  tone = "brand",
  size = "md",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={styles({ tone, variant, size, disabled })}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

const styles = cva({
  base: {
    appearance: "none",
    margin: "0",
    fontWeight: 500,
    textAlign: "center",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ["auto", "100%"],
    borderRadius: "md",
    cursor: "pointer",
    transition: "0.2s",
    lineHeight: "1",
    outline: "0",
    "&:disabled": {
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "lg",
      outlineOffset: "2",
    },
  },
  variants: {
    size: {
      sm: {
        px: "24",
        py: "8",
        fontSize: "sm",
      },
      md: {
        px: "32",
        py: "12",
        fontSize: "md",
      },
      lg: {
        px: "40",
        py: "16",
        fontSize: "lg",
      },
    },
    variant: {
      solid: {},
      outline: {},
    },
    tone: {
      brand: {},
      neutral: {},
      danger: {},
      success: {},
      warning: {},
      info: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    // Solid Variants
    {
      variant: "solid",
      tone: "brand",
      css: {
        bg: "bgSolid.brand",
        color: "fgSolid.brand",
        "&:hover": {
          bg: "bgSolid.brand.hover",
        },
        "&:active": {
          bg: "bgSolid.brand.active",
        },
      },
    },
    {
      variant: "solid",
      tone: "neutral",
      css: {
        bg: "bgSolid.neutral",
        color: "fgSolid.neutral",
        "&:hover": {
          bg: "bgSolid.neutral.hover",
        },
        "&:active": {
          bg: "bgSolid.neutral.active",
        },
      },
    },
    {
      variant: "solid",
      tone: "danger",
      css: {
        bg: "bgSolid.danger",
        color: "fgSolid.danger",
        "&:hover": {
          bg: "bgSolid.danger.hover",
        },
        "&:active": {
          bg: "bgSolid.danger.active",
        },
      },
    },
    {
      variant: "solid",
      tone: "success",
      css: {
        bg: "bgSolid.success",
        color: "fgSolid.success",
      },
    },
    {
      variant: "solid",
      tone: "warning",
      css: {
        bg: "bgSolid.warning",
        color: "fgSolid.warning",
      },
    },
    {
      variant: "solid",
      tone: "info",
      css: {
        bg: "bgSolid.info",
        color: "fgSolid.info",
      },
    },
    // Outline Variants
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "brand",
        borderWidth: "lg",
        color: "fg.brand",
        "&:hover": {
          bg: "bg.brand.hover",
          color: "fg.brand.hover",
        },
        "&:active": {
          bg: "bg.brand.active",
          color: "fg.brand.active",
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "neutral",
        borderWidth: "lg",
        color: "fg.neutral",
        "&:hover": {
          bg: "bg.neutral.hover",
          color: "fg.neutral.hover",
          borderColor: "border.neutral.hover",
        },
        "&:active": {
          bg: "bg.neutral.active",
          color: "fg.neutral.active",
          borderColor: "border.neutral.active",
        },
      },
    },
    {
      variant: "outline",
      tone: "danger",
      css: {
        border: "danger",
        borderWidth: "lg",
        color: "fg.danger",
        "&:hover": {
          bg: "bg.danger.hover",
        },
        "&:active": {
          bg: "bg.danger.active",
        },
      },
    },
    {
      variant: "outline",
      tone: "success",
      css: {
        border: "success",
        borderWidth: "lg",
        color: "fg.success",
      },
    },
    {
      variant: "outline",
      tone: "warning",
      css: {
        border: "warning",
        borderWidth: "lg",
        color: "fg.warning",
      },
    },
    {
      variant: "outline",
      tone: "info",
      css: {
        border: "info",
        borderWidth: "lg",
        color: "fg.info",
      },
    },
    // Disabled States
    {
      variant: "solid",
      disabled: true,
      css: {
        bg: "bg.neutral.disabled!",
        color: "fg.neutral.disabled!",
      },
    },
    {
      variant: "outline",
      disabled: true,
      css: {
        bg: "transparent!",
        color: "fg.neutral.disabled!",
        borderColor: "border.neutral.disabled!",
      },
    },
  ],
});
