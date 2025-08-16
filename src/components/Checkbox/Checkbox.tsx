import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { Check } from "lucide-react";
import React, {
  type ButtonHTMLAttributes,
  useCallback,
  useId,
  useState,
} from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

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
  id: idProp,
  label,
  value,
  tone = "neutral",
  disabled,
  checked,
  required,
  onChange,
  ...rest
}: CheckboxProps) => {
  // uncontrolled 모드에서 내부 상태 추적 (data-checked 동기화용)
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  const handleCheckedChange = useCallback(
    (next: boolean) => {
      // uncontrolled 모드에서 내부 상태 업데이트
      if (checked === undefined) {
        setInternalChecked(next);
      }
      onChange?.(next, value);
    },
    [checked, onChange, value],
  );

  // 실제 체크 상태: controlled면 checked prop, uncontrolled면 내부 상태
  const actualChecked = checked !== undefined ? checked : internalChecked;

  // id 관리: 외부에서 전달된 id 우선, 없으면 안정적 id 생성
  const autoId = useId();
  const id = idProp ?? `checkbox-${autoId}`;

  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "8",
        color: "fg.neutral",
      })}
    >
      <BaseCheckbox.Root
        id={id}
        checked={checked}
        disabled={disabled}
        required={required}
        value={value}
        onCheckedChange={(next) => handleCheckedChange(next as boolean)}
        data-checked={actualChecked}
        className={styles({ tone, disabled })}
        aria-required={required ? "true" : undefined}
        aria-labelledby={`${id}-label`}
        {...rest}
      >
        <BaseCheckbox.Indicator
          className={css({
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Check size={16} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={css({
          cursor: disabled ? "not-allowed" : "pointer",
          color: disabled ? "fg.neutral.disabled" : "fg.neutral",
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
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
    </div>
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
        "&[data-checked='true']": {
          bg: "bgSolid.brand",
          borderColor: "bgSolid.brand",
          color: "fgSolid.brand",
        },
      },
      neutral: {
        "&[data-checked='true']": {
          bg: "bgSolid.neutral",
          borderColor: "bgSolid.neutral",
          color: "fgSolid.neutral",
        },
      },
      danger: {
        "&[data-checked='true']": {
          bg: "bgSolid.danger",
          borderColor: "bgSolid.danger",
          color: "fgSolid.danger",
        },
      },
      warning: {
        "&[data-checked='true']": {
          bg: "bgSolid.warning",
          borderColor: "bgSolid.warning",
          color: "fgSolid.warning",
        },
      },
      success: {
        "&[data-checked='true']": {
          bg: "bgSolid.success",
          borderColor: "bgSolid.success",
          color: "fgSolid.success",
        },
      },
      info: {
        "&[data-checked='true']": {
          bg: "bgSolid.info",
          borderColor: "bgSolid.info",
          color: "fgSolid.info",
        },
      },
    },
    disabled: {
      true: {
        "&[data-checked='true']": {
          bg: "bg.neutral.disabled!",
          borderColor: "bg.neutral.disabled!",
          color: "fg.neutral.disabled!",
        },
      },
    },
  },
});
