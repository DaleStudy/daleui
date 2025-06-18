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
    _disabled: {
      cursor: "not-allowed",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineOffset: "2px",
      outlineColor: "border.brand.focus",
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
        _hover: {
          bg: "bgSolid.brand.hover",
        },
        _active: {
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
        _hover: {
          bg: "bgSolid.neutral.hover",
        },
        _active: {
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
        _hover: {
          bg: "bgSolid.danger.hover",
        },
        _active: {
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
        border: "1px solid",
        borderColor: "border.brand",
        color: "fg.brand",
        _hover: {
          bg: "bg.brand.hover",
          color: "fg.brand.hover",
        },
        _active: {
          bg: "bg.brand.active",
          color: "fg.brand.active",
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "1px solid",
        borderColor: "border.neutral",
        color: "fg.neutral",
        _hover: {
          bg: "bg.neutral.hover",
          color: "fg.neutral.hover",
          borderColor: "border.neutral.hover",
        },
        _active: {
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
        border: "1px solid",
        borderColor: "border.danger",
        color: "fg.danger",
        _hover: {
          bg: "bg.danger.hover",
        },
        _active: {
          bg: "bg.danger.active",
        },
      },
    },
    {
      variant: "outline",
      tone: "success",
      css: {
        border: "1px solid",
        borderColor: "border.success",
        color: "fg.success",
      },
    },
    {
      variant: "outline",
      tone: "warning",
      css: {
        border: "1px solid",
        borderColor: "border.warning",
        color: "fg.warning",
      },
    },
    {
      variant: "outline",
      tone: "info",
      css: {
        border: "1px solid",
        borderColor: "border.info",
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
