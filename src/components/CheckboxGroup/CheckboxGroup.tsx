import {
  CheckboxGroup as ArkCheckboxGroup,
  useCheckboxGroupContext,
} from "@ark-ui/react/checkbox";
import {
  type ReactNode,
  type Ref,
  createContext,
  useContext,
  useId,
} from "react";
import { css, cva } from "../../../styled-system/css";
import { HelperText } from "../shared/HelperText";
import { useField } from "../shared/useField";
import type { Tone } from "../../tokens/colors";
import type { FieldProps } from "../shared/types";
import { Checkbox } from "../Checkbox/Checkbox";

type CheckboxGroupTone = Extract<Tone, "brand" | "neutral">;

/**
 * 항목 스타일링에만 필요한 값(tone, invalid)을 전달하는 컨텍스트입니다.
 * 선택 상태·disabled·readOnly·name은 ArkUI CheckboxGroup 컨텍스트가 관리합니다.
 */
const CheckboxGroupContext = createContext<
  | ({
      tone: CheckboxGroupTone;
    } & Pick<FieldProps, "invalid">)
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

  /**
   * 색상 강조를 지정합니다.
   * @default "brand"
   */
  tone?: CheckboxGroupTone;

  /** 요소 참조 */
  ref?: Ref<HTMLDivElement>;

  /**
   * 그룹 하단에 표시할 보조 또는 에러 메시지입니다.
   * @default undefined
   */
  helperText?: string;
}

/**
 * 체크박스 그룹 컴포넌트입니다.
 *
 * 사용자가 여러 선택지를 선택할 수 있을 때 사용합니다.
 * 특히 선택지가 2-5개로 적고 모든 옵션을 한눈에 보여주어야 할 때 적합합니다.
 *
 * @example
 * <CheckboxGroup name="fruits" label="좋아하는 과일을 선택하세요 (옵션 선택)">
 *   <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
 *   <CheckboxGroup.Item value="banana">바나나</CheckboxGroup.Item>
 *   <CheckboxGroup.Item value="orange">오렌지</CheckboxGroup.Item>
 * </CheckboxGroup>
 */
function CheckboxGroupRoot({
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
  readOnly = false,
  helperText,
  errorMessage,
}: CheckboxGroupProps) {
  const labelId = useId();
  const {
    fieldProps,
    helpTextProps,
    bottomText,
    showBottomText,
    isReadOnly,
    isDisabled,
  } = useField({ helperText, errorMessage, invalid, disabled, readOnly });

  return (
    <CheckboxGroupContext.Provider value={{ tone, invalid }}>
      <ArkCheckboxGroup
        ref={ref}
        name={name}
        value={values}
        defaultValue={defaultValues}
        onValueChange={(value) => onChange?.(value)}
        disabled={isDisabled}
        readOnly={isReadOnly}
        invalid={invalid}
        aria-labelledby={labelId}
        aria-describedby={fieldProps["aria-describedby"]}
        className={checkboxGroupRootStyles}
      >
        <span
          id={labelId}
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
                  color: isDisabled ? "fg.neutral.disabled" : "fg.danger",
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
        </span>
        <div className={checkboxGroupStyles({ orientation })}>{children}</div>
        {showBottomText && (
          <HelperText {...helpTextProps} disabled={isDisabled}>
            {bottomText}
          </HelperText>
        )}
      </ArkCheckboxGroup>
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

export interface CheckboxGroupItemProps {
  /** 옵션 값 */
  value: string;

  /** 자식 요소 */
  children?: string;

  /** 비활성화 여부 */
  disabled?: boolean;
}

export function CheckboxGroupItem({
  value,
  children,
  disabled = false,
}: CheckboxGroupItemProps) {
  const context = useContext(CheckboxGroupContext);
  const group = useCheckboxGroupContext();

  if (!context) {
    throw new Error(
      "CheckboxGroup.Item 컴포넌트는 CheckboxGroup 내부에서만 사용해야 합니다.",
    );
  }

  const { tone, invalid } = context;
  const isDisabled = disabled || (group?.disabled ?? false);
  const isReadOnly = group?.readOnly ?? false;

  return (
    <Checkbox
      label={children}
      value={value}
      disabled={isDisabled}
      readOnly={isReadOnly}
      invalid={!isDisabled && !!invalid}
      tone={tone}
    />
  );
}

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  /**
   * CheckboxGroup의 개별 체크박스 항목입니다.
   * CheckboxGroup 내부에서만 사용 가능하며, 그룹의 tone, disabled, invalid 상태를 자동으로 상속받습니다.
   */
  Item: CheckboxGroupItem,
});
