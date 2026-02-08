import {
  Checkbox as ArkCheckbox,
  type CheckboxCheckedChangeDetails,
} from "@ark-ui/react/checkbox";
import { Check } from "lucide-react";
import React from "react";
import { css, cva } from "../../../styled-system/css";
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
  invalid?: boolean;
  /** 체크박스의 색조 */
  tone?: Tone;
  /** 필수 입력 표시 (라벨 옆에 * 표시) */
  required?: boolean;
  /** 체크 상태 변경 시 호출되는 콜백 (controlled 모드) */
  onChange?: (checked: boolean) => void;
}

/**
 * - `label` 속성으로 체크박스의 라벨을 지정할 수 있습니다.
 * - `name` 속성으로 체크박스의 form에서 사용할 name 속성을 지정할 수 있습니다.
 * - `checked` 속성으로 체크박스의 체크 상태를 제어할 수 있습니다.
 * - `defaultChecked` 속성으로 체크박스의 초기 체크 상태를 설정할 수 있습니다.
 * - `disabled` 속성으로 체크박스를 비활성화할 수 있습니다.
 * - `invalid` 속성으로 체크박스의 에러 상태를 지정할 수 있습니다.
 * - `tone` 속성으로 체크박스의 색상 강조를 지정할 수 있습니다.
 * - `required` 속성으로 체크박스의 필수 입력 여부를 지정할 수 있습니다.
 * - `onChange` 속성으로 체크박스의 체크 상태 변경 시 호출되는 콜백을 지정할 수 있습니다.
 */
export const Checkbox = ({
  label,
  name,
  checked,
  defaultChecked,
  disabled,
  invalid = false,
  tone = "brand",
  required = false,
  onChange,
}: CheckboxProps) => {
  const handleCheckedChange = (details: CheckboxCheckedChangeDetails) => {
    onChange?.(details.checked === true);
  };

  return (
    <ArkCheckbox.Root
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      invalid={invalid}
      required={required}
      onCheckedChange={handleCheckedChange}
      className={`group ${rootStyles({ disabled })}`}
    >
      <ArkCheckbox.Control
        className={controlStyles({
          tone,
          disabled,
          invalid: !disabled && invalid,
        })}
      >
        <ArkCheckbox.Indicator className={indicatorStyles()}>
          <Check size={10} absoluteStrokeWidth />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {label && (
        <ArkCheckbox.Label
          className={labelStyles({ disabled, invalid: !disabled && invalid })}
        >
          {label}
          {required && (
            <span
              data-testid="checkbox-required-indicator"
              className={css({
                color: disabled ? "fg.neutral.disabled" : "fg.danger",
              })}
            >
              {" "}
              *
            </span>
          )}
        </ArkCheckbox.Label>
      )}
      <ArkCheckbox.HiddenInput data-test-tone={tone} aria-required={required} />
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
    width: "4",
    height: "4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: "md",
    borderStyle: "solid",
    borderColor: "fg.neutral",
    borderRadius: "sm",
    transition: "all 0.2s",
    color: "transparent",

    _checked: {
      color: "fg.neutral",
    },
    _before: {
      content: '""',
      position: "absolute",
      width: "6",
      height: "6",
      borderRadius: "8",
      opacity: 0,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: -1,
    },

    _hover: {
      _before: {
        opacity: 0.2,
      },
    },
    _active: {
      _before: {
        opacity: 0.2,
      },
    },

    _focusVisible: {
      outline: "solid",
      outlineWidth: "lg",
      outlineOffset: "2",
    },
  },
  variants: {
    tone: {
      brand: {
        _hover: {
          _before: {
            backgroundColor: "fg.brand.hover",
          },
        },
        _active: {
          _before: {
            backgroundColor: "fg.brand.active",
          },
        },
        _focusVisible: {
          outlineColor: "border.brand.focus",
        },
      },
      success: {
        _before: {
          backgroundColor: "fg.success",
        },
        _focusVisible: {
          outlineColor: "border.success",
        },
      },
      warning: {
        _before: {
          backgroundColor: "fg.warning",
        },
        _focusVisible: {
          outlineColor: "border.warning",
        },
      },
      info: {
        _before: {
          backgroundColor: "fg.info",
        },
        _focusVisible: {
          outlineColor: "border.info",
        },
      },
      danger: {
        borderColor: "fg.danger",
        _before: {
          backgroundColor: "fg.danger",
        },
        _focusVisible: {
          outlineColor: "border.danger",
        },
      },
      neutral: {
        _hover: {
          _before: {
            backgroundColor: "fg.neutral.hover",
          },
        },
        _active: {
          _before: {
            backgroundColor: "fg.neutral.active",
          },
        },
        _focusVisible: {
          outlineColor: "border.neutral.active!",
        },
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        borderColor: "fg.neutral.disabled",
        backgroundColor: "bg.neutral.disabled!",
        _before: {
          display: "none",
        },
        _checked: {
          color: "fg.neutral.disabled!",
        },
      },
    },
    invalid: {
      true: {
        borderColor: "fg.danger",
        _before: {
          backgroundColor: "fg.danger!",
        },
        _focusVisible: {
          outlineColor: "border.danger!",
        },
        _checked: {
          color: "fg.danger!",
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
    textStyle: "label.md.strong",
  },
  variants: {
    disabled: {
      true: {
        color: "fg.neutral.disabled",
      },
    },
    invalid: {
      true: {
        color: "fg.danger",
      },
    },
  },
});
