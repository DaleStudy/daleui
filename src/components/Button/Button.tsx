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
  tone = "neutral",
  size = "md",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={styles({ tone, variant, size })}
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
      opacity: 0.5,
      cursor: "not-allowed",
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
      neutral: {},
      accent: {},
      danger: {},
      warning: {},
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      tone: "neutral",
      css: {
        background: "background.interactive.neutral.default",
        color: "foreground.default.primary",
        "&:hover": {
          background: "background.interactive.neutral.hover",
        },
        "&:active": {
          background: "background.interactive.neutral.press",
        },
        "&:focus-visible": {
          outlineColor: "borders.interactive.focusRing",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "solid",
      tone: "accent",
      css: {
        background: "background.interactive.brand.default",
        color: "foreground.Inverse.primary",
        "&:hover": {
          background: "background.interactive.brand.hover",
        },
        "&:active": {
          background: "background.interactive.brand.press",
        },
        "&:focus-visible": {
          outlineColor: "borders.interactive.focusRing",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "solid",
      tone: "danger",
      css: {
        background: "background.interactive.danger.default",
        color: "foreground.Inverse.primary",
        "&:hover": {
          background: "background.interactive.danger.hover",
        },
        "&:active": {
          background: "background.interactive.danger.press",
        },
        "&:focus-visible": {
          outlineColor: "borders.interactive.focusRing",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "solid",
      tone: "warning",
      css: {
        // background.interactive.warning이 없으므로 accent.amber 활용
        // background.accent.amber는 밝은 색이므로, 텍스트는 어두운 색 사용
        background: "background.accent.amber",
        color: "foreground.accent.amber",
        "&:hover": {
          // background.accent.amber에 hover가 없으므로, 유사한 색이나 직접 지정
          background: {
            base: "{colors.amber.4}",
            _dark: "{colors.darkAmber.6}",
          },
        },
        "&:active": {
          background: {
            base: "{colors.amber.5}",
            _dark: "{colors.darkAmber.7}",
          },
        },
        "&:focus-visible": {
          outlineColor: "borders.interactive.focusRing",
          outlineWidth: "2px",
          outlineStyle: "solid",
          outlineOffset: "2px",
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "3px solid",
        borderColor: "borders.interactive.neutral.default",
        color: "foreground.interactive.neutral.default",
        "&:active, &:hover": {
          background: "background.interactive.neutral.press",
          color: "foreground.interactive.neutral.muted",
        },
        "&:focus": {
          outlineColor: "borders.interactive.focusRing",
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
        borderColor: "borders.interactive.brand.default",
        color: "foreground.interactive.brand.default",
        "&:active, &:hover": {
          background: "background.interactive.brand.hover",
          color: "foreground.Inverse.primary",
        },
        "&:focus": {
          outlineColor: "borders.interactive.focusRing",
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
        borderColor: "borders.system.danger",
        color: "foreground.system.danger",
        "&:active, &:hover": {
          background: "background.interactive.danger.hover",
          color: "foreground.Inverse.primary",
        },
        "&:focus": {
          outlineColor: "borders.interactive.focusRing",
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
        borderColor: "borders.system.warning",
        color: "foreground.system.warning",
        "&:active, &:hover": {
          background: "background.accent.amber",
          // color: "text.muted.warning",
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
