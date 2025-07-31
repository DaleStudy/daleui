import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import React, { type ButtonHTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { Icon } from "../Icon/Icon";
import { hstack } from "../../../styled-system/patterns";

export interface CheckboxProps
  extends Omit<
    ButtonHTMLAttributes<HTMLInputElement>,
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
    <ArkCheckbox.Root
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
      checked={checked}
      required={required}
      onCheckedChange={(details) => {
        onChange?.(Boolean(details.checked), value);
      }}
      disabled={disabled}
    >
      <ArkCheckbox.Control
        className={styles({ tone, disabled })}
        data-testid={rest.id}
        {...rest}
      >
        <ArkCheckbox.Indicator className={hstack()}>
          <Icon name="check" size="sm" />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label className={hstack({ gap: "8" })}>
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
      </ArkCheckbox.Label>
      <ArkCheckbox.HiddenInput
        aria-required={required}
        aria-disabled={disabled}
        disabled={disabled}
      />
    </ArkCheckbox.Root>
  );
};

const styles = cva({
  base: {
    // appearance: "none",
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
  },
  variants: {
    tone: {
      brand: {
        "&[data-state='checked']": {
          bg: "bgSolid.brand",
          borderColor: "bgSolid.brand",
          color: "fgSolid.brand",
        },
      },
      neutral: {
        "&[data-state='checked']": {
          bg: "bgSolid.neutral",
          borderColor: "bgSolid.neutral",
          color: "fgSolid.neutral",
        },
      },
      danger: {
        "&[data-state='checked']": {
          bg: "bgSolid.danger",
          borderColor: "bgSolid.danger",
          color: "fgSolid.danger",
        },
      },
      warning: {
        "&[data-state='checked']": {
          bg: "bgSolid.warning",
          borderColor: "bgSolid.warning",
          color: "fgSolid.warning",
        },
      },
      success: {
        "&[data-state='checked']": {
          bg: "bgSolid.success",
          borderColor: "bgSolid.success",
          color: "fgSolid.success",
        },
      },
      info: {
        "&[data-state='checked']": {
          bg: "bgSolid.info",
          borderColor: "bgSolid.info",
          color: "fgSolid.info",
        },
      },
    },
    disabled: {
      true: {
        "&[data-state='checked']": {
          bg: "bg.neutral.disabled!",
          borderColor: "bg.neutral.disabled!",
          color: "fg.neutral.disabled!",
        },
      },
    },
  },
});
