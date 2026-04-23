import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { type ReactNode, createContext, useContext } from "react";
import { css, cva } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import { HelperText } from "../shared/HelperText";
import { useHelperText } from "../shared/useHelperText";
import type { FieldProps } from "../shared/types";

type RadioGroupTone = "brand" | "neutral";

const RadioGroupContext = createContext<
  | ({
      tone: RadioGroupTone;
    } & Pick<FieldProps, "disabled" | "invalid" | "required">)
  | null
>(null);

export interface RadioGroupProps extends FieldProps {
  /** 자식 요소 */
  children: ReactNode;

  /** 그룹 공유 name */
  name: string;

  /** 그룹 레이블 */
  label: string;

  /** 비제어 모드 초기 선택 값 */
  defaultValue?: string;

  /** 제어 모드 선택 값 */
  value?: string;

  /** 선택 값 변경 핸들러 */
  onChange?: (value: string) => void;

  /** 배치 방향 (horizontal | vertical) */
  orientation?: "horizontal" | "vertical";

  /** 색조 */
  tone?: RadioGroupTone;

  /** 레이블 보조 텍스트 */
  hint?: string;
}

/**
 * 라디오 버튼 그룹 컴포넌트입니다.
 *
 * 사용자가 제한된 선택지 중 하나만 선택해야 할 때 사용합니다.
 * 특히 선택지가 2-5개로 적고 모든 옵션을 한눈에 보여주어야 할 때 적합합니다.
 *
 * 선택지가 많은 경우(6개 이상)에는 대신 [Select](?path=/docs/components-select--docs) 컴포넌트 사용을 권장합니다.
 *
 * @example
 * <RadioGroup name="fruits" label="좋아하는 과일을 선택하세요">
 *   <RadioGroup.Item value="apple">사과</RadioGroup.Item>
 *   <RadioGroup.Item value="banana">바나나</RadioGroup.Item>
 *   <RadioGroup.Item value="orange">오렌지</RadioGroup.Item>
 * </RadioGroup>
 */
function RadioGroupRoot({
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
  required = false,
  hint,
  helperText,
  errorMessage,
}: RadioGroupProps) {
  const { fieldProps, helpTextProps, bottomText, showBottomText } =
    useHelperText({ helperText, errorMessage, invalid });

  return (
    <RadioGroupContext.Provider value={{ tone, disabled, invalid, required }}>
      <ArkRadioGroup.Root
        name={name}
        defaultValue={defaultValue}
        value={value}
        onValueChange={(details) => {
          if (details.value) onChange?.(details.value);
        }}
        disabled={disabled}
        orientation={orientation}
        className={radioGroupRootStyles}
        {...fieldProps}
      >
        <ArkRadioGroup.Label
          className={css({
            textStyle: "label.md.strong",
            marginBottom: "8",
          })}
        >
          {label}
          {required && (
            <span
              data-testid="radiogroup-required-indicator"
              className={css({
                color: disabled ? "fg.neutral.disabled" : "fg.danger",
              })}
            >
              {" "}
              *
            </span>
          )}
          {hint && (
            <span
              className={css({
                textStyle: "label.md",
              })}
            >
              {" "}
              {hint}
            </span>
          )}
        </ArkRadioGroup.Label>
        <div className={radioGroupStyles({ orientation })}>{children}</div>
        {showBottomText && (
          <HelperText {...helpTextProps} disabled={disabled}>
            {bottomText}
          </HelperText>
        )}
      </ArkRadioGroup.Root>
    </RadioGroupContext.Provider>
  );
}

const radioGroupRootStyles = css({
  display: "flex",
  flexDirection: "column",
});

const radioGroupStyles = cva({
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

export interface RadioGroupItemProps {
  /** 옵션 값 */
  value: string;

  /** 자식 요소 */
  children?: ReactNode;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 입력 요소 참조 */
  ref?: React.Ref<HTMLInputElement>;
}

export function RadioGroupItem({
  value,
  children,
  disabled,
  ref,
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error(
      "RadioGroup.Item 컴포넌트는 RadioGroup 내부에서만 사용해야 합니다.",
    );
  }

  const { tone, disabled: groupDisabled, invalid, required } = context;
  const isDisabled = disabled || groupDisabled;
  const showInvalid = !isDisabled && invalid;

  return (
    <ArkRadioGroup.Item
      value={value}
      disabled={isDisabled}
      invalid={invalid}
      className={flex({
        alignItems: "center",
        gap: "8",
        padding: "4",
        cursor: isDisabled ? "not-allowed" : "pointer",
      })}
    >
      <ArkRadioGroup.ItemControl className={radioWrapperStyles}>
        <div
          className={radioCircleStyles({
            tone,
            disabled: isDisabled,
            invalid: showInvalid,
          })}
          role="presentation"
        />
        <ArkRadioGroup.Indicator
          className={radioDotStyles({
            tone,
            disabled: isDisabled,
            invalid: showInvalid,
          })}
        />
        <div
          className={radioHoverStyles({
            tone,
            disabled: isDisabled,
            invalid: showInvalid,
          })}
        />
        <ArkRadioGroup.ItemHiddenInput
          ref={ref}
          aria-invalid={invalid}
          aria-required={required}
        />
      </ArkRadioGroup.ItemControl>
      {children && (
        <ArkRadioGroup.ItemText
          className={labelTextStyles({
            disabled: isDisabled,
          })}
        >
          {children}
        </ArkRadioGroup.ItemText>
      )}
    </ArkRadioGroup.Item>
  );
}

const radioWrapperStyles = css({
  position: "relative",
  width: "4",
  height: "4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const radioCircleStyles = cva({
  base: {
    backgroundColor: "bg.neutral",
    width: "4",
    height: "4",
    border: "neutral",
    borderWidth: "md",
    borderRadius: "full",
    position: "absolute",
    pointerEvents: "none",
    borderColor: "slate.9",
    "[data-focus-visible] &, [data-active] &": {
      outline: "solid",
      outlineWidth: "md",
      outlineOffset: "2",
    },
  },
  variants: {
    tone: {
      neutral: {
        "[data-state='checked'] &": {
          borderColor: "slate.9",
        },
        "[data-focus-visible] &, [data-active] &": {
          outlineColor: "slate.9",
        },
      },
      brand: {
        "[data-state='checked'] &": {
          borderColor: "fg.brand",
        },
        "[data-focus-visible] &, [data-active] &": {
          outlineColor: "border.brand.focus",
        },
      },
    },
    disabled: {
      true: {
        borderColor: "fg.neutral.disabled!",
        backgroundColor: "bg.neutral.disabled!",
      },
    },
    invalid: {
      true: {
        borderColor: "fg.danger!",
        "[data-focus-visible] &, [data-active] &": {
          outlineColor: "border.danger!",
        },
      },
    },
  },
});

const radioHoverStyles = cva({
  base: {
    position: "absolute",
    width: "6",
    height: "6",
    borderRadius: "full",
    opacity: 0,
    "[data-scope='radio-group'][data-part='item']:hover &": {
      opacity: 0.2,
    },
  },
  variants: {
    tone: {
      neutral: { backgroundColor: "fg.neutral" },
      brand: { backgroundColor: "fg.brand" },
    },
    disabled: {
      true: {
        display: "none",
      },
    },
    invalid: {
      true: {
        backgroundColor: "fg.danger!",
      },
    },
  },
});

const labelTextStyles = cva({
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

const radioDotStyles = cva({
  base: {
    position: "absolute",
    top: "50%!",
    left: "50%!",
    transform: "translate(-50%, -50%)!",
    width: "2",
    height: "2",
    borderRadius: "full",
    pointerEvents: "none",
    opacity: 0,
    "[data-scope='radio-group'][data-part='item'][data-state='checked'] &": {
      opacity: 1,
    },
  },
  variants: {
    tone: {
      neutral: { backgroundColor: "slate.9" },
      brand: { backgroundColor: "fg.brand" },
    },
    disabled: {
      true: {
        backgroundColor: "fg.neutral.disabled!",
      },
    },
    invalid: {
      true: {
        backgroundColor: "fg.danger",
      },
    },
  },
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  /**
   * RadioGroup의 개별 라디오 항목입니다.
   * RadioGroup 내부에서만 사용 가능하며, 그룹의 tone과 disabled 상태를 자동으로 상속받습니다.
   */
  Item: RadioGroupItem,
});
