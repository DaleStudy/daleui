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
      outlineColor: {
        base: "light.border.brand.focus",
        _dark: "dark.border.brand.focus",
      },
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
        bg: {
          base: "light.bgSolid.brand.default",
          _dark: "dark.bgSolid.brand.default",
        },
        color: {
          base: "light.fgSolid.brand",
          _dark: "dark.fgSolid.brand",
        },
        _hover: {
          bg: {
            base: "light.bgSolid.brand.hover",
            _dark: "dark.bgSolid.brand.hover",
          },
        },
        _active: {
          bg: {
            base: "light.bgSolid.brand.active",
            _dark: "dark.bgSolid.brand.active",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "neutral",
      css: {
        bg: {
          base: "light.bgSolid.neutral.default",
          _dark: "dark.bgSolid.neutral.default",
        },
        color: {
          base: "light.fgSolid.neutral",
          _dark: "dark.fgSolid.neutral",
        },
        _hover: {
          bg: {
            base: "light.bgSolid.neutral.hover",
            _dark: "dark.bgSolid.neutral.hover",
          },
        },
        _active: {
          bg: {
            base: "light.bgSolid.neutral.active",
            _dark: "dark.bgSolid.neutral.active",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "danger",
      css: {
        bg: {
          base: "light.bgSolid.danger.default",
          _dark: "dark.bgSolid.danger.default",
        },
        color: {
          base: "light.fgSolid.danger",
          _dark: "dark.fgSolid.danger",
        },
        _hover: {
          bg: {
            base: "light.bgSolid.danger.hover",
            _dark: "dark.bgSolid.danger.hover",
          },
        },
        _active: {
          bg: {
            base: "light.bgSolid.danger.active",
            _dark: "dark.bgSolid.danger.active",
          },
        },
      },
    },
    {
      variant: "solid",
      tone: "success",
      css: {
        bg: {
          base: "light.bgSolid.success",
          _dark: "dark.bgSolid.success",
        },
        color: {
          base: "light.fgSolid.success",
          _dark: "dark.fgSolid.success",
        },
      },
    },
    {
      variant: "solid",
      tone: "warning",
      css: {
        bg: {
          base: "light.bgSolid.warning",
          _dark: "dark.bgSolid.warning",
        },
        color: {
          base: "light.fgSolid.warning",
          _dark: "dark.fgSolid.warning",
        },
      },
    },
    {
      variant: "solid",
      tone: "info",
      css: {
        bg: {
          base: "light.bgSolid.info",
          _dark: "dark.bgSolid.info",
        },
        color: {
          base: "light.fgSolid.info",
          _dark: "dark.fgSolid.info",
        },
      },
    },
    // Outline Variants
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "1px solid",
        borderColor: {
          base: "light.border.brand.default",
          _dark: "dark.border.brand.default",
        },
        color: {
          base: "light.fg.brand.default",
          _dark: "dark.fg.brand.default",
        },
        _hover: {
          bg: {
            base: "light.bg.brand.hover",
            _dark: "dark.bg.brand.hover",
          },
          color: {
            base: "light.fg.brand.hover",
            _dark: "dark.fg.brand.hover",
          },
        },
        _active: {
          bg: {
            base: "light.bg.brand.active",
            _dark: "dark.bg.brand.active",
          },
          color: {
            base: "light.fg.brand.active",
            _dark: "dark.fg.brand.active",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "1px solid",
        borderColor: {
          base: "light.border.neutral.default",
          _dark: "dark.border.neutral.default",
        },
        color: {
          base: "light.fg.neutral.default",
          _dark: "dark.fg.neutral.default",
        },
        _hover: {
          bg: {
            base: "light.bg.neutral.hover",
            _dark: "dark.bg.neutral.hover",
          },
          color: {
            base: "light.fg.neutral.hover",
            _dark: "dark.fg.neutral.hover",
          },
          borderColor: {
            base: "light.border.neutral.hover",
            _dark: "dark.border.neutral.hover",
          },
        },
        _active: {
          bg: {
            base: "light.bg.neutral.active",
            _dark: "dark.bg.neutral.active",
          },
          color: {
            base: "light.fg.neutral.active",
            _dark: "dark.fg.neutral.active",
          },
          borderColor: {
            base: "light.border.neutral.active",
            _dark: "dark.border.neutral.active",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "danger",
      css: {
        border: "1px solid",
        borderColor: {
          base: "light.border.danger",
          _dark: "dark.border.danger",
        },
        color: {
          base: "light.fg.danger",
          _dark: "dark.fg.danger",
        },
        _hover: {
          bg: {
            base: "light.bg.danger.hover",
            _dark: "dark.bg.danger.hover",
          },
        },
        _active: {
          bg: {
            base: "light.bg.danger.active",
            _dark: "dark.bg.danger.active",
          },
        },
      },
    },
    {
      variant: "outline",
      tone: "success",
      css: {
        border: "1px solid",
        borderColor: {
          base: "light.border.success",
          _dark: "dark.border.success",
        },
        color: {
          base: "light.fg.success",
          _dark: "dark.fg.success",
        },
      },
    },
    {
      variant: "outline",
      tone: "warning",
      css: {
        border: "1px solid",
        borderColor: {
          base: "light.border.warning",
          _dark: "dark.border.warning",
        },
        color: {
          base: "light.fg.warning",
          _dark: "dark.fg.warning",
        },
      },
    },
    {
      variant: "outline",
      tone: "info",
      css: {
        border: "1px solid",
        borderColor: {
          base: "light.border.info",
          _dark: "dark.border.info",
        },
        color: {
          base: "light.fg.info",
          _dark: "dark.fg.info",
        },
      },
    },
    // Disabled States
    {
      variant: "solid",
      disabled: true,
      css: {
        bg: {
          base: "light.bg.neutral.disabled!",
          _dark: "dark.bg.neutral.disabled!",
        },
        color: {
          base: "light.fg.neutral.disabled!",
          _dark: "dark.fg.neutral.disabled!",
        },
      },
    },
    {
      variant: "outline",
      disabled: true,
      css: {
        bg: "transparent!",
        color: {
          base: "light.fg.neutral.disabled!",
          _dark: "dark.fg.neutral.disabled!",
        },
        borderColor: {
          base: "light.border.neutral.disabled!",
          _dark: "dark.border.neutral.disabled!",
        },
      },
    },
  ],
});
