import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { Check } from "lucide-react";
import React from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

export interface CheckboxProps {
  /** 체크박스 라벨 텍스트 */
  label?: React.ReactNode;
  /** 체크박스의 name 속성 */
  name?: string;
  /** 체크박스의 value 속성 */
  value?: string;
  /** 초기 체크 상태 (uncontrolled 모드) */
  defaultChecked?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 읽기 전용 상태 */
  readOnly?: boolean;
  /** 유효하지 않은 상태 */
  invalid?: boolean;
  /** 체크박스의 색조 */
  tone?: Tone;
  /** 체크 상태 변경 시 호출되는 콜백 */
  onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void;
}

/**
 * Ark UI 기반 체크박스 컴포넌트
 * - `tone` 속성으로 체크박스의 색상 강조를 지정할 수 있습니다.
 * - `disabled` 속성을 사용하여 체크박스를 비활성화할 수 있습니다.
 * - `invalid` 속성을 사용하여 에러 상태를 표시할 수 있습니다.
 */
export const Checkbox = ({
  label,
  name,
  value,
  defaultChecked,
  disabled,
  readOnly,
  invalid,
  tone = "brand",
  onCheckedChange,
}: CheckboxProps) => {
  return (
    <ArkCheckbox.Root
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      onCheckedChange={onCheckedChange}
      className={rootStyles({ disabled })}
    >
      <ArkCheckbox.Control
        className={controlStyles({ tone, disabled, invalid })}
      >
        <ArkCheckbox.Indicator className={indicatorStyles()}>
          <Check size={10} strokeWidth={3} />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {label && (
        <ArkCheckbox.Label className={labelStyles({ disabled })}>
          {label}
        </ArkCheckbox.Label>
      )}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  );
};

const rootStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "8",
    cursor: "pointer",
    padding: "4",
  },
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
      },
    },
  },
});

const controlStyles = cva({
  base: {
    appearance: "none",
    position: "relative",
    flexShrink: 0,
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "fg.neutral",
    borderRadius: "sm",
    cursor: "pointer",
    transition: "all 0.2s",
    outline: "none",
    color: "transparent",

    '&[data-state="checked"]': {
      color: "fg.neutral",
    },
  },
  variants: {
    tone: {
      brand: {
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "fg.brand.hover",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
        },
      },
      success: {
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "fg.success",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.success",
          outlineOffset: "2",
        },
      },
      warning: {
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "fg.warning",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.warning",
          outlineOffset: "2",
        },
      },
      info: {
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "fg.info",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.info",
          outlineOffset: "2",
        },
      },
      danger: {
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "fg.danger",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.danger",
          outlineOffset: "2",
        },
      },
      neutral: {
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "fg.neutral.hover",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.neutral.focus",
          outlineOffset: "2",
        },
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        borderColor: "fg.neutral.disabled",
        backgroundColor: "transparent!",
        "&:hover::before": {
          display: "none",
        },
        '&[data-state="checked"]': {
          color: "fg.neutral.disabled!",
        },
      },
    },
    invalid: {
      true: {
        borderColor: "border.danger",
      },
    },
  },
});

const indicatorStyles = cva({
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const labelStyles = cva({
  base: {
    fontSize: "md",
    fontWeight: "semibold",
    lineHeight: "1.2",
    color: "fg.neutral",
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    disabled: {
      true: {
        color: "fg.neutral.disabled",
        cursor: "not-allowed",
      },
    },
  },
});
