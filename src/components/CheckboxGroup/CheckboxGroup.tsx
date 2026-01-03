import {
  Checkbox as ArkCheckbox,
  type CheckboxCheckedChangeDetails,
} from "@ark-ui/react/checkbox";
import { Check } from "lucide-react";
import { type ReactNode, createContext, useContext, useState } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

const CheckboxGroupContext = createContext<{
  tone: Tone;
  disabled?: boolean;
  invalid?: boolean;
  name: string;
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
} | null>(null);

export interface CheckboxGroupProps {
  /**
   * 체크박스 요소들
   */
  children: ReactNode;

  /**
   * 동일 그룹의 체크박스들이 공유하는 이름입니다.
   */
  name: string;

  /**
   * 체크박스 그룹을 설명하는 텍스트입니다.
   */
  label: string;

  /**
   * 컴포넌트가 처음 렌더링될 때 선택되는 값들입니다.
   * @default undefined
   */
  defaultValue?: string[];

  /**
   * 외부에서 선택 값을 직접 제어할 때 사용합니다.
   * @default undefined
   */
  value?: string[];

  /**
   * 사용자가 선택을 변경할 때 호출되는 콜백입니다.
   * @default undefined
   */
  onChange?: (value: string[]) => void;

  /**
   * true이면 모든 체크박스가 비활성화되어 상호작용이 불가합니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 체크박스의 배치 방향입니다. 'horizontal'은 가로, 'vertical'은 세로입니다.
   * @default undefined
   */
  orientation?: "horizontal" | "vertical";

  /**
   * 색상 강조를 지정합니다.
   * @default "brand"
   */
  tone?: Tone;

  /**
   * 에러 상태를 지정합니다.
   * @default false
   */
  invalid?: boolean;
}

/**
 * 체크박스 그룹 컴포넌트입니다.
 *
 * 사용자가 여러 선택지를 선택할 수 있을 때 사용합니다.
 * 특히 선택지가 2-5개로 적고 모든 옵션을 한눈에 보여주어야 할 때 적합합니다.
 *
 * @example
 * <CheckboxGroup name="fruits" label="좋아하는 과일을 선택하세요 (옵션 선택)">
 *   <CheckboxItem value="apple">사과</CheckboxItem>
 *   <CheckboxItem value="banana">바나나</CheckboxItem>
 *   <CheckboxItem value="orange">오렌지</CheckboxItem>
 * </CheckboxGroup>
 */
export function CheckboxGroup({
  children,
  name,
  label,
  defaultValue,
  value,
  onChange,
  disabled,
  orientation,
  tone = "brand",
  invalid = false,
}: CheckboxGroupProps) {
  const isControlled = value !== undefined;
  const [internalValues, setInternalValues] = useState<string[]>(
    defaultValue ?? [],
  );

  const selectedValues = isControlled ? value : internalValues;

  const handleValueChange = (itemValue: string, checked: boolean) => {
    const newValues = checked
      ? [...selectedValues, itemValue]
      : selectedValues.filter((v) => v !== itemValue);

    if (!isControlled) {
      setInternalValues(newValues);
    }

    onChange?.(newValues);
  };

  return (
    <CheckboxGroupContext.Provider
      value={{
        tone,
        disabled,
        invalid,
        name,
        selectedValues,
        onValueChange: handleValueChange,
      }}
    >
      <div className={checkboxGroupRootStyles}>
        <label
          className={css({
            textStyle: "body.lg",
            marginBottom: "8",
          })}
        >
          {label}
        </label>
        <div className={checkboxGroupStyles({ orientation })}>{children}</div>
      </div>
    </CheckboxGroupContext.Provider>
  );
}

const checkboxGroupRootStyles = css({
  display: "flex",
  flexDirection: "column",
});

const checkboxGroupStyles = cva({
  base: {
    display: "flex",
    gap: "8",
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface CheckboxItemProps {
  /**
   * 체크박스의 값입니다.
   */
  value: string;

  /**
   * 라벨 등 자식 요소를 표시합니다.
   */
  children?: ReactNode;

  /**
   * true이면 이 체크박스가 비활성화됩니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * DOM 요소에 대한 ref입니다.
   */
  ref?: React.Ref<HTMLInputElement>;
}

export function CheckboxItem({
  value,
  children,
  disabled,
  ref,
}: CheckboxItemProps) {
  const context = useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error(
      "CheckboxItem 컴포넌트는 CheckboxGroup 내부에서만 사용해야 합니다.",
    );
  }

  const {
    tone,
    disabled: groupDisabled,
    invalid: groupInvalid,
    name,
    selectedValues,
    onValueChange,
  } = context;
  const isDisabled = disabled || groupDisabled;
  const isInvalid = groupInvalid;
  const isChecked = selectedValues.includes(value);

  const handleCheckedChange = (details: CheckboxCheckedChangeDetails) => {
    const checked = details.checked === true;
    onValueChange(value, checked);
  };

  return (
    <ArkCheckbox.Root
      name={name}
      checked={isChecked}
      disabled={isDisabled}
      invalid={!isDisabled && isInvalid}
      onCheckedChange={handleCheckedChange}
      className={`group ${rootStyles({ disabled: isDisabled })}`}
    >
      <ArkCheckbox.Control
        className={controlStyles({
          tone,
          disabled: isDisabled,
          invalid: !isDisabled && isInvalid,
        })}
      >
        <ArkCheckbox.Indicator className={indicatorStyles()}>
          <Check size={10} absoluteStrokeWidth />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {children && (
        <ArkCheckbox.Label
          className={labelTextStyles({
            disabled: isDisabled,
            invalid: !isDisabled && isInvalid,
          })}
        >
          {children}
        </ArkCheckbox.Label>
      )}
      <ArkCheckbox.HiddenInput ref={ref} data-test-tone={tone} />
    </ArkCheckbox.Root>
  );
}

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
        ".group:hover &::before": {
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
        ".group:active &::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "8",
          backgroundColor: "fg.brand.active",
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
        ".group:hover &::before, .group:active &::before": {
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
        ".group:hover &::before, .group:active &::before": {
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
        ".group:hover &::before, .group:active &::before": {
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
        borderColor: "fg.danger",
        ".group:hover &::before, .group:active &::before": {
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
        ".group:hover &::before": {
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
        ".group:active &::before": {
          content: '""',
          position: "absolute",
          width: "26px",
          height: "26px",
          borderRadius: "8",
          backgroundColor: "fg.neutral.active",
          opacity: 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        },
        "&[data-focus-visible]": {
          outline: "solid",
          outlineWidth: "lg",
          outlineColor: "border.neutral.active",
          outlineOffset: "2",
        },
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        borderColor: "fg.neutral.disabled",
        backgroundColor: "bg.neutral.disabled!",
        ".group:hover &::before": {
          display: "none",
        },
        '&[data-state="checked"]': {
          color: "fg.neutral.disabled!",
        },
      },
    },
    invalid: {
      true: {
        borderColor: "fg.danger",
        ".group:hover &::before": {
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

const labelTextStyles = cva({
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
    invalid: {
      true: {
        color: "fg.danger",
      },
    },
  },
});
