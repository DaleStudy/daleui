import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import React from "react";
import { cva } from "../../../styled-system/css";

type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps {
  /** 사이즈 */
  size?: ToggleSize;
  /** 제어 모드 체크 여부 */
  checked?: boolean;
  /** 비제어 모드 초기 체크 여부 */
  defaultChecked?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
  /** 체크 상태 변경 핸들러 */
  onChange?: (checked: boolean) => void;
  /** 라벨 내용 */
  label?: string;
  /** 폼 name */
  name?: string;
  /** 입력 요소 참조 */
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * 토글(Toggle)은 On/Off 두 가지 상태를 즉시 전환할 수 있는 컴포넌트입니다.
 * 별도의 저장이나 확인 절차 없이 선택 즉시 설정이 반영되는 항목에 사용합니다.
 *
 */
export const Toggle = ({
  ref,
  size = "md",
  checked,
  defaultChecked,
  disabled,
  readOnly,
  onChange,
  label,
  name,
}: ToggleProps) => {
  return (
    <ArkSwitch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      readOnly={readOnly}
      onCheckedChange={(details) => onChange?.(details.checked)}
      name={name}
      className={rootStyles({ disabled, readOnly })}
    >
      <ArkSwitch.Control
        className={controlStyles({ size, disabled, readOnly })}
      >
        <ArkSwitch.Thumb className={thumbStyles({ size })} />
      </ArkSwitch.Control>
      {label && (
        <ArkSwitch.Label className={labelStyles({ disabled })}>
          {label}
        </ArkSwitch.Label>
      )}
      <ArkSwitch.HiddenInput ref={ref} />
    </ArkSwitch.Root>
  );
};

const rootStyles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8",
    cursor: "pointer",
  },
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
      },
    },
    readOnly: {
      true: {
        cursor: "default",
      },
    },
  },
});

const controlStyles = cva({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: "full",
    backgroundColor: "bgSolid.neutral",
    transition: "background-color 0.2s",

    _hover: {
      backgroundColor: "bgSolid.neutral.hover",
    },
    _active: {
      backgroundColor: "bgSolid.neutral.active",
    },
    _checked: {
      backgroundColor: "bgSolid.brand",
      _hover: {
        backgroundColor: "bgSolid.brand.hover",
      },
      _active: {
        backgroundColor: "bgSolid.brand.active",
      },
    },
    _focusVisible: {
      outline: "solid",
      outlineWidth: "md",
      outlineOffset: "2",
      outlineColor: "border.brand.focus",
    },
  },
  variants: {
    size: {
      sm: {
        width: "40px",
        height: "24px",
        padding: "3px",
      },
      md: {
        width: "52px",
        height: "32px",
        padding: "4px",
      },
      lg: {
        width: "64px",
        height: "40px",
        padding: "4px",
      },
    },
    disabled: {
      true: {
        backgroundColor: "bgSolid.neutral.disabled!",
        _hover: {
          backgroundColor: "bgSolid.neutral.disabled!",
        },
        _active: {
          backgroundColor: "bgSolid.neutral.disabled!",
        },
        _checked: {
          backgroundColor: "bgSolid.neutral.disabled!",
          _hover: {
            backgroundColor: "bgSolid.neutral.disabled!",
          },
        },
      },
    },
    readOnly: {
      true: {
        _hover: {
          backgroundColor: "bgSolid.neutral",
        },
        _active: {
          backgroundColor: "bgSolid.neutral",
        },
        _checked: {
          _hover: {
            backgroundColor: "bgSolid.brand",
          },
          _active: {
            backgroundColor: "bgSolid.brand",
          },
        },
      },
    },
  },
});

const thumbStyles = cva({
  base: {
    display: "block",
    borderRadius: "full",
    backgroundColor: "white",
    flexShrink: 0,
    transition: "transform 0.2s",
  },
  variants: {
    size: {
      sm: {
        width: "18px",
        height: "18px",
        _checked: {
          transform: "translateX(16px)",
        },
      },
      md: {
        width: "24px",
        height: "24px",
        _checked: {
          transform: "translateX(20px)",
        },
      },
      lg: {
        width: "32px",
        height: "32px",
        _checked: {
          transform: "translateX(24px)",
        },
      },
    },
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
  },
});
