import * as Ariakit from "@ariakit/react";
import React from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "checked" | "value" | "required" | "disabled"
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
        color: "fg.neutral",
        "&:disabled": {
          cursor: "not-allowed",
          color: "fg.neutral.disabled",
        },
      })}
    >
      <Ariakit.Checkbox
        required={required}
        onChange={(event) => {
          onChange?.(event.target.checked, value);
        }}
        disabled={disabled}
        className={styles({ tone, disabled })}
        aria-required={required}
        {...rest}
      />
      {label}
      {required && (
        <span
          className={css({
            color: "fg.danger",
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
    border: "neutral",
    borderWidth: "lg",
    borderRadius: "sm",
    width: "1.5rem",
    height: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s",
    outline: "none",
    position: "relative",
    "&:hover": {
      bg: "bg.neutral.hover",
      color: "fg.neutral.hover",
    },
    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "lg",
      outlineOffset: "2",
    },
    "&:disabled": {
      borderColor: "border.neutral.disabled",
      bg: "transparent!",
      cursor: "not-allowed",
    },
    "&:checked": {
      "&::after": {
        content: '""',
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "1rem",
        height: "1rem",
        transform: "translate(-50%, -50%)",
        mask: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>\')',
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        backgroundColor: "currentColor",
      },
    },
  },
  variants: {
    tone: {
      brand: {
        "&:checked": {
          bg: "bgSolid.brand",
          borderColor: "bgSolid.brand",
          color: "fgSolid.brand",
        },
      },
      neutral: {
        "&:checked": {
          bg: "bgSolid.neutral",
          borderColor: "bgSolid.neutral",
          color: "fgSolid.neutral",
        },
      },
      danger: {
        "&:checked": {
          bg: "bgSolid.danger",
          borderColor: "bgSolid.danger",
          color: "fgSolid.danger",
        },
      },
      warning: {
        "&:checked": {
          bg: "bgSolid.warning",
          borderColor: "bgSolid.warning",
          color: "fgSolid.warning",
        },
      },
      success: {
        "&:checked": {
          bg: "bgSolid.success",
          borderColor: "bgSolid.success",
          color: "fgSolid.success",
        },
      },
      info: {
        "&:checked": {
          bg: "bgSolid.info",
          borderColor: "bgSolid.info",
          color: "fgSolid.info",
        },
      },
    },
    disabled: {
      true: {
        "&:checked": {
          bg: "bg.neutral.disabled!",
          borderColor: "bg.neutral.disabled!",
          color: "fg.neutral.disabled!",
        },
      },
    },
  },
});
