import React, { type ButtonHTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "onChange" | "checked" | "value" | "required"
  > {
  /** 라벨 */
  label: React.ReactNode;
  /** 체크박스의 값 */
  value?: string;
  /** 색조 */
  tone?: Tone;
  /** 체크박스 비활성화 여부 */
  disabled?: boolean;
  /** 체크박스 선택 여부 */
  checked?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 변경 이벤트 핸들러 */
  onChange?: (checked: boolean, value?: string) => void;
}

/**
 * - `tone` 속성으로 체크박스의 색상 강조를 지정할 수 있습니다.
 * - `disabled` 속성을 사용하여 체크박스를 비활성화할 수 있습니다.
 * - `value` 속성을 통해 체크박스에 값을 지정할 수 있습니다.
 * - `required` 속성을 사용하여 필수 입력 항목으로 지정할 수 있습니다.
 */
export const Checkbox = ({
  label,
  value,
  tone = "neutral",
  disabled,
  checked,
  required,
  onChange,
  ...rest
}: CheckboxProps) => {
  return (
    <label
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "8",
        cursor: "pointer",
        color: {
          base: "light.fg.neutral.default",
          _dark: "dark.fg.neutral.default",
        },
        _disabled: {
          cursor: "not-allowed",
          color: {
            base: "light.fg.neutral.disabled",
            _dark: "dark.fg.neutral.disabled",
          },
        },
      })}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        required={required}
        onCheckedChange={(checked) => {
          onChange?.(checked === true, value);
        }}
        disabled={disabled}
        className={styles({ tone, disabled })}
        {...rest}
      >
        <CheckboxPrimitive.Indicator
          className={css({
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Check size={16} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
      {required && (
        <span
          className={css({
            color: { base: "light.fg.danger", _dark: "dark.fg.danger" },
          })}
        >
          *
        </span>
      )}
    </label>
  );
};

const styles = cva({
  base: {
    appearance: "none",
    margin: "0",
    backgroundColor: "transparent",
    border: "3px solid",
    borderColor: {
      base: "light.border.neutral.default",
      _dark: "dark.border.neutral.default",
    },
    borderRadius: "sm",
    width: "1.5rem",
    height: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s",
    outline: "none",
    _hover: {
      bg: { base: "light.bg.neutral.hover", _dark: "dark.bg.neutral.hover" },
      color: {
        base: "light.fg.neutral.hover",
        _dark: "dark.fg.neutral.hover",
      },
    },
    _focusVisible: {
      outline: "2px solid",
      outlineOffset: "2px",
      outlineColor: {
        base: "light.border.brand.focus",
        _dark: "dark.border.brand.focus",
      },
    },
    _disabled: {
      borderColor: {
        base: "light.border.neutral.disabled",
        _dark: "dark.border.neutral.disabled",
      },
      bg: "transparent!",
      cursor: "not-allowed",
    },
  },
  variants: {
    tone: {
      brand: {
        _checked: {
          bg: {
            base: "light.bgSolid.brand.default",
            _dark: "dark.bgSolid.brand.default",
          },
          borderColor: {
            base: "light.bgSolid.brand.default",
            _dark: "dark.bgSolid.brand.default",
          },
          color: { base: "light.fgSolid.brand", _dark: "dark.fgSolid.brand" },
        },
      },
      neutral: {
        _checked: {
          bg: {
            base: "light.bgSolid.neutral.default",
            _dark: "dark.bgSolid.neutral.default",
          },
          borderColor: {
            base: "light.bgSolid.neutral.default",
            _dark: "dark.bgSolid.neutral.default",
          },
          color: {
            base: "light.fgSolid.neutral",
            _dark: "dark.fgSolid.neutral",
          },
        },
      },
      danger: {
        _checked: {
          bg: {
            base: "light.bgSolid.danger.default",
            _dark: "dark.bgSolid.danger.default",
          },
          borderColor: {
            base: "light.bgSolid.danger.default",
            _dark: "dark.bgSolid.danger.default",
          },
          color: { base: "light.fgSolid.danger", _dark: "dark.fgSolid.danger" },
        },
      },
      warning: {
        _checked: {
          bg: { base: "light.bgSolid.warning", _dark: "dark.bgSolid.warning" },
          borderColor: {
            base: "light.bgSolid.warning",
            _dark: "dark.bgSolid.warning",
          },
          color: {
            base: "light.fgSolid.warning",
            _dark: "dark.fgSolid.warning",
          },
        },
      },
      success: {
        _checked: {
          bg: { base: "light.bgSolid.success", _dark: "dark.bgSolid.success" },
          borderColor: {
            base: "light.bgSolid.success",
            _dark: "dark.bgSolid.success",
          },
          color: {
            base: "light.fgSolid.success",
            _dark: "dark.fgSolid.success",
          },
        },
      },
      info: {
        _checked: {
          bg: { base: "light.bgSolid.info", _dark: "dark.bgSolid.info" },
          borderColor: {
            base: "light.bgSolid.info",
            _dark: "dark.bgSolid.info",
          },
          color: { base: "light.fgSolid.info", _dark: "dark.fgSolid.info" },
        },
      },
    },
    disabled: {
      true: {
        _checked: {
          bg: {
            base: "light.bg.neutral.disabled!",
            _dark: "dark.bg.neutral.disabled!",
          },
          borderColor: {
            base: "light.bg.neutral.disabled!",
            _dark: "dark.bg.neutral.disabled!",
          },
          color: {
            base: "light.fg.neutral.disabled!",
            _dark: "dark.fg.neutral.disabled!",
          },
        },
      },
    },
  },
});
