import { type HTMLAttributes, type ReactNode } from "react";
import { cva } from "../../../styled-system/css";
import { Icon, type IconProps } from "../Icon/Icon";
import { hstack } from "../../../styled-system/patterns";

type variant = "solid" | "outline" | "ghost";
type size = "sm" | "md" | "lg";
type tone = "brand" | "neutral" | "danger";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "style"> {
  /** 텍스트 */
  children: ReactNode;
  /** 종류 */
  variant?: variant;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  fullWidth?: boolean;
  /** 좌측 아이콘 */
  leftIcon?: IconProps["name"];
  /** 우측 아이콘 */
  rightIcon?: IconProps["name"];
  /** 클릭 시 실행함수 */
  onClick?: () => void;
  /** 버튼의 크기 */
  size?: size;
  /** 색조 */
  tone?: tone;
  /** 타입 */
  type?: "button" | "submit" | "reset";
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
  variant = "solid",
  disabled,
  fullWidth,
  leftIcon,
  rightIcon,
  onClick,
  size = "md",
  tone = "brand",
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={styles({ tone, variant, size, disabled, fullWidth })}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <div className={hstack({ gap: "8" })}>
        {leftIcon && (
          <Icon data-testid={`icon-${leftIcon}`} name={leftIcon} size={size} />
        )}
        {children}
        {rightIcon && (
          <Icon
            data-testid={`icon-${rightIcon}`}
            name={rightIcon}
            size={size}
          />
        )}
      </div>
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
    width: "auto",
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
      outline: {
        borderWidth: "lg",
      },
      ghost: {
        bg: "transparent",
        border: "none",
      },
    },
    tone: {
      brand: {},
      neutral: {},
      danger: {},
    },
    disabled: {
      true: {},
      false: {},
    },
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {},
    },
  },
  compoundVariants: [
    // solid
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
    // outline
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "brand",
        color: "fg.brand",
        "&:hover": {
          color: "fg.brand.hover",
        },
        "&:active": {
          color: "fg.brand.active",
          borderColor: "border.brand.active",
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "neutral",
        color: "fg.neutral",
        "&:hover": {
          color: "fg.neutral.hover",
        },
        "&:active": {
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
        color: "fg.danger",
        "&:hover": {
          color: "fg.danger.hover",
        },
        "&:active": {
          color: "fg.danger.active",
          borderColor: "border.danger.active",
        },
      },
    },
    // ghost
    {
      variant: "ghost",
      tone: "brand",
      css: {
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
      variant: "ghost",
      tone: "neutral",
      css: {
        color: "fg.neutral",
        "&:hover": {
          bg: "bg.neutral.hover",
          color: "fg.neutral.hover",
        },
        "&:active": {
          bg: "bg.neutral.active",
          color: "fg.neutral.active",
        },
      },
    },
    {
      variant: "ghost",
      tone: "danger",
      css: {
        color: "fg.danger",
        "&:hover": {
          bg: "bg.danger.hover",
          color: "fg.danger.hover",
        },
        "&:active": {
          bg: "bg.danger.active",
          color: "fg.danger.active",
        },
      },
    },
    // disabled
    {
      disabled: true,
      css: {
        bg: "bg.neutral.disabled!",
        color: "fg.neutral.disabled!",
        border: "none!",
      },
    },
  ],
});
