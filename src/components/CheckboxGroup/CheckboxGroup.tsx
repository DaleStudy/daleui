import {
  type ReactNode,
  type Ref,
  createContext,
  useContext,
  useState,
} from "react";
import { css, cva } from "../../../styled-system/css";
import { HelperText } from "../shared/HelperText";
import { useHelperText } from "../shared/useHelperText";
import type { Tone } from "../../tokens/colors";
import type { FieldProps } from "../shared/types";
import { Checkbox } from "../Checkbox/Checkbox";

const CheckboxGroupContext = createContext<
  | ({
      tone: Tone;
      name: string;
      selectedValues: string[];
      onValueChange: (value: string, checked: boolean) => void;
    } & Pick<FieldProps, "disabled" | "invalid">)
  | null
>(null);

export interface CheckboxGroupProps extends FieldProps {
  /** 자식 요소 */
  children: ReactNode;

  /** 그룹 공유 name */
  name: string;

  /** 그룹 레이블 */
  label: string;

  /** 비제어 모드 초기 선택 값 목록 */
  defaultValues?: string[];

  /** 제어 모드 선택 값 목록 */
  values?: string[];

  /** 선택 값 변경 핸들러 */
  onChange?: (values: string[]) => void;

  /** 배치 방향 (horizontal | vertical) */
  orientation?: "horizontal" | "vertical";

  /** 색조 */
  tone?: Tone;

  /** 요소 참조 */
  ref?: Ref<HTMLDivElement>;
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
  ref,
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
  helperText,
  errorMessage,
}: CheckboxGroupProps) {
  const { helperTextId, bottomText, showBottomText, ariaDescribedBy, isError } =
    useHelperText({ helperText, errorMessage, invalid });
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
        name,
        selectedValues,
        onValueChange: handleValueChange,
      }}
    >
      <div
        ref={ref}
        className={checkboxGroupRootStyles}
        aria-describedby={ariaDescribedBy}
      >
        <label
          className={css({
            textStyle: "label.md.strong",
            marginBottom: "8",
          })}
        >
          {label}
          {required && (
            <>
              <span
                className={css({
                  color: disabled ? "fg.neutral.disabled" : "fg.danger",
                  display: "inline",
                })}
                aria-hidden="true"
              >
                {" "}
                *
              </span>
              <span
                className={css({
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: "0",
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: "0",
                })}
              >
                (필수)
              </span>
            </>
          )}
        </label>
        <div className={checkboxGroupStyles({ orientation })}>{children}</div>
        {showBottomText && (
          <HelperText id={helperTextId} invalid={isError} disabled={disabled}>
            {bottomText}
          </HelperText>
        )}
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
  /** 옵션 값 */
  value: string;

  /** 자식 요소 */
  children?: ReactNode;

  /** 비활성화 여부 */
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
      onChange={handleChange}
    />
  );
}
