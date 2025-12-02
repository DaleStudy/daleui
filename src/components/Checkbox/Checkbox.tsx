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
  /** 체크 상태 (controlled 모드) */
  checked?: boolean;
  /** 초기 체크 상태 (uncontrolled 모드) */
  defaultChecked?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 에러 상태 (테두리 + 체크 아이콘 + 라벨 모두 붉은색) */
  error?: boolean;
  /** 체크박스의 색조 */
  tone?: Tone;
  /** 체크 상태 변경 시 호출되는 콜백 */
  onChange?: (details: { checked: boolean }) => void;
}

/**
 * - `label` 속성으로 체크박스의 라벨을 지정할 수 있습니다.
 * - `name` 속성으로 체크박스의 form에서 사용할 name 속성을 지정할 수 있습니다.
 * - `checked` 속성으로 체크박스의 체크 상태를 제어할 수 있습니다.
 * - `defaultChecked` 속성으로 체크박스의 초기 체크 상태를 설정할 수 있습니다.
 * - `disabled` 속성으로 체크박스를 비활성화할 수 있습니다.
 * - `error` 속성으로 체크박스의 에러 상태를 지정할 수 있습니다.
 * - `tone` 속성으로 체크박스의 색상 강조를 지정할 수 있습니다.
 * - `onChange` 속성으로 체크박스의 체크 상태 변경 시 호출되는 콜백을 지정할 수 있습니다.
 */
export const Checkbox = ({
  label,
  name,
  checked,
  defaultChecked,
  disabled,
  error,
  tone = "brand",
  onChange,
}: CheckboxProps) => {
  const handleCheckedChange = onChange
    ? (details: { checked: boolean | "indeterminate" }) => {
        onChange({ checked: details.checked === true });
      }
    : undefined;

  return (
    <ArkCheckbox.Root
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      invalid={error}
      onCheckedChange={handleCheckedChange}
      className={rootStyles({ disabled })}
    >
      <ArkCheckbox.Control
        className={controlStyles({ tone, disabled, error: !disabled && error })}
      >
        <ArkCheckbox.Indicator className={indicatorStyles()}>
          <Check size={10} strokeWidth={3} />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {label && (
        <ArkCheckbox.Label
          className={labelStyles({ disabled, error: !disabled && error })}
        >
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
    transition: "all 0.2s",
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
          borderRadius: "8",
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
          borderRadius: "8",
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
          borderRadius: "8",
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
          borderRadius: "8",
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
          borderRadius: "8",
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
          borderRadius: "8",
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
    error: {
      true: {
        borderColor: "border.danger",
        "&:hover::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "8",
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
        '&[data-state="checked"]': {
          color: "fg.danger",
        },
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
    userSelect: "none",
  },
  variants: {
    disabled: {
      true: {
        color: "fg.neutral.disabled",
      },
    },
    error: {
      true: {
        color: "fg.danger",
      },
    },
  },
});
