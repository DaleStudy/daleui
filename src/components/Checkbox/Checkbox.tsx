import {
  Checkbox as ArkCheckbox,
  type CheckboxCheckedChangeDetails,
} from "@ark-ui/react/checkbox";
import { Check } from "lucide-react";
import React from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { HelperText } from "../shared/HelperText";
import { useHelperText } from "../shared/useHelperText";
import type { FieldProps } from "../shared/types";

export interface CheckboxProps extends Omit<FieldProps, "label"> {
  /** 라벨 내용 */
  label?: React.ReactNode;
  /** 폼 name */
  name?: string;
  /** 제어 모드 체크 여부 */
  checked?: boolean;
  /** 비제어 모드 초기 체크 여부 */
  defaultChecked?: boolean;
  /** 색조 */
  tone?: Tone;
  /** 체크 변경 핸들러 */
  onChange?: (checked: boolean) => void;
  /** 입력 요소 참조 */
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * 체크박스(Checkbox)는 사용자가 하나 이상을 중복 선택할 수 있도록 지원하는 인터페이스 구성 요소입니다.
 * 개별 항목의 상태를 '선택(Checked)' 또는 '해제(Unchecked)'로 변경하는 기능을 수행합니다.
 */
export const Checkbox = ({
  ref,
  label,
  name,
  checked,
  defaultChecked,
  disabled,
  invalid = false,
  tone = "brand",
  required = false,
  onChange,
  helperText,
  errorMessage,
}: CheckboxProps) => {
  const { helperTextId, bottomText, showBottomText, ariaDescribedBy, isError } =
    useHelperText({ helperText, errorMessage, invalid });

  const handleCheckedChange = (details: CheckboxCheckedChangeDetails) => {
    onChange?.(details.checked === true);
  };

  return (
    <div>
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
        <ArkCheckbox.HiddenInput
          data-test-tone={tone}
          aria-required={required}
          aria-describedby={ariaDescribedBy}
          ref={ref}
        />
      </ArkCheckbox.Root>
      {showBottomText && (
        <HelperText id={helperTextId} invalid={isError} disabled={disabled}>
          {bottomText}
        </HelperText>
      )}
    </div>
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
