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
  /** 체크박스의 id (label 연결에 사용) */
  id: string;
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
  id,
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
        gap: "0.5rem",
        cursor: "pointer",
        color: "text",
      })}
    >
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        required={required}
        onCheckedChange={(checked) => {
          onChange?.(checked === true, value);
        }}
        disabled={disabled}
        className={css(styles.raw({ tone }), baseStyles)}
        {...rest}
      >
        <CheckboxPrimitive.Indicator className={css(indicatorStyles)}>
          <Check size={16} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
      {required && <span className={css({ color: "text.danger" })}>*</span>}
    </label>
  );
};

const baseStyles = {
  appearance: "none",
  margin: "0",
  backgroundColor: "transparent",
  border: "3px solid",
  borderColor: "border",
  borderRadius: "4px",
  width: "1.5rem",
  height: "1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "0.2s",
  outline: "none",
  "&:hover": {
    backgroundColor: "bg.hover",
  },
  "&:focus": {
    outlineColor: "border.neutral",
    outline: "3px solid",
    outlineOffset: "2px",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const indicatorStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const styles = cva({
  base: {},
  variants: {
    tone: {
      neutral: {
        "&[data-state='checked']": {
          backgroundColor: "bg",
          borderColor: "border",
          color: "text",
        },
        "&:disabled[data-state='checked']": {
          backgroundColor: "bg",
          borderColor: "border",
        },
      },
      accent: {
        "&[data-state='checked']": {
          backgroundColor: "bg.accent",
          borderColor: "border.accent",
          color: "text.accent",
        },
        "&:disabled[data-state='checked']": {
          backgroundColor: "bg.accent",
          borderColor: "border.accent",
        },
      },
      danger: {
        "&[data-state='checked']": {
          backgroundColor: "bg.danger",
          borderColor: "border.danger",
          color: "text.danger",
        },
        "&:disabled[data-state='checked']": {
          backgroundColor: "bg.danger",
          borderColor: "border.danger",
        },
      },
      warning: {
        "&[data-state='checked']": {
          backgroundColor: "bg.warning",
          borderColor: "border.warning",
          color: "text.warning",
        },
        "&:disabled[data-state='checked']": {
          backgroundColor: "bg.warning",
          borderColor: "border.warning",
        },
      },
    },
  },
  compoundVariants: [
    {
      tone: "accent",
      css: {
        "&:focus": {
          outlineColor: "border.accent",
        },
      },
    },
    {
      tone: "danger",
      css: {
        "&:focus": {
          outlineColor: "border.danger",
        },
      },
    },
    {
      tone: "warning",
      css: {
        "&:focus": {
          outlineColor: "border.warning",
        },
      },
    },
  ],
});
