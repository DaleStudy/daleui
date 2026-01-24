import { type ReactNode, createContext, useContext, useState } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { Checkbox } from "../Checkbox/Checkbox";

const CheckboxGroupContext = createContext<{
  tone: Tone;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
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
  defaultValues?: string[];

  /**
   * 외부에서 선택 값을 직접 제어할 때 사용합니다.
   * @default undefined
   */
  values?: string[];

  /**
   * 사용자가 선택을 변경할 때 호출되는 콜백입니다.
   * @default undefined
   */
  onChange?: (values: string[]) => void;

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

  /**
   * 필수 입력 여부를 지정합니다. true일 경우 라벨 옆에 * 표시가 나타납니다.
   * @default false
   */
  required?: boolean;
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
  defaultValues,
  values,
  onChange,
  disabled = false,
  orientation,
  tone = "brand",
  invalid = false,
  required = false,
}: CheckboxGroupProps) {
  const isControlled = values !== undefined;
  const [internalValues, setInternalValues] = useState<string[]>(
    defaultValues ?? [],
  );

  const selectedValues = isControlled ? values : internalValues;

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
        required,
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
          {required && (
            <span
              aria-label="옵션 필수"
              className={css({
                color: disabled ? "fg.neutral.disabled" : "fg.danger",
                display: "inline",
              })}
            >
              {" "}
              *
            </span>
          )}
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
}

export function CheckboxItem({
  value,
  children,
  disabled = false,
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
    required: groupRequired,
    name,
    selectedValues,
    onValueChange,
  } = context;
  const isDisabled = disabled || groupDisabled;
  const isInvalid = groupInvalid;
  const isChecked = selectedValues.includes(value);

  const handleChange = (checked: boolean) => {
    onValueChange(value, checked);
  };

  return (
    <Checkbox
      label={children}
      name={name}
      checked={isChecked}
      disabled={isDisabled}
      invalid={!isDisabled && isInvalid}
      tone={tone}
      required={groupRequired}
      onChange={handleChange}
    />
  );
}
