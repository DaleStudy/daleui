import * as Ariakit from "@ariakit/react";
import { type ReactNode, createContext, useContext } from "react";
import { css, cva } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import type { Tone } from "../../tokens/colors";

const RadioGroupContext = createContext<{
  tone: Tone;
  name: string;
  required?: boolean;
  disabled?: boolean;
} | null>(null);

interface RadioGroupProps {
  /**
   * RadioGroup의 자식 요소로 Radio 컴포넌트만 허용됩니다.
   */
  children: ReactNode;

  /**
   * 동일 그룹의 라디오 버튼들이 공유하는 이름입니다.
   */
  name: string;

  /**
   * 라디오 그룹을 설명하는 텍스트입니다.
   */
  label: string;

  /**
   * 컴포넌트가 처음 렌더링될 때 선택되는 값입니다.
   * @default undefined
   */
  defaultValue?: string;

  /**
   * 외부에서 선택 값을 직접 제어할 때 사용합니다.
   * @default undefined
   */
  value?: string;

  /**
   * 사용자가 선택을 변경할 때 호출되는 콜백입니다.
   * @default undefined
   */
  onChange?: (value: string) => void;

  /**
   * true이면 모든 라디오 버튼이 비활성화되어 상호작용이 불가합니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * true이면 반드시 하나의 옵션을 선택해야 합니다.
   * @default undefined
   */
  required?: boolean;

  /**
   * 라디오 버튼의 배치 방향입니다. 'horizontal'은 가로, 'vertical'은 세로입니다.
   * @default undefined
   */
  orientation?: "horizontal" | "vertical";

  /**
   * 색상 강조를 지정합니다.
   * @default "neutral"
   */
  tone?: Tone;
}

/**
 * 라디오 버튼 그룹 컴포넌트입니다.
 *
 * 사용자가 제한된 선택지 중 하나만 선택해야 할 때 사용합니다.
 * 특히 선택지가 2-5개로 적고 모든 옵션을 한눈에 보여주어야 할 때 적합합니다.
 *
 * 선택지가 많은 경우(6개 이상)에는 대신 `<Select/>` 컴포넌트 사용을 권장합니다.
 *
 * @example
 * <RadioGroup name="fruits" label="좋아하는 과일을 선택하세요">
 *   <Radio value="apple">사과</Radio>
 *   <Radio value="banana">바나나</Radio>
 *   <Radio value="orange">오렌지</Radio>
 * </RadioGroup>
 */
export function RadioGroup({
  children,
  name,
  label,
  defaultValue,
  value,
  onChange,
  disabled,
  required,
  orientation,
  tone = "neutral",
}: RadioGroupProps) {
  return (
    <div>
      <div
        id={`${name}-label`}
        className={css({
          fontWeight: "medium",
          marginBottom: "8",
        })}
      >
        {label}
      </div>
      <RadioGroupContext.Provider value={{ tone, required, name, disabled }}>
        <Ariakit.RadioProvider value={value || defaultValue}>
          <Ariakit.RadioGroup
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              onChange?.(target.value);
            }}
            disabled={disabled}
            aria-required={required}
            aria-labelledby={`${name}-label`}
            className={radioGroupStyles({ orientation })}
            focusable
          >
            {children}
          </Ariakit.RadioGroup>
        </Ariakit.RadioProvider>
      </RadioGroupContext.Provider>
    </div>
  );
}

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

interface RadioProps {
  /**
   * 라디오 버튼의 값입니다.
   */
  value: string;

  /**
   * 라벨 등 자식 요소를 표시합니다.
   */
  children?: ReactNode;

  /**
   * true이면 이 라디오 버튼이 비활성화됩니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * DOM 요소에 대한 ref입니다.
   */
  ref?: React.Ref<HTMLInputElement>;
}

export function Radio({ value, children, disabled, ref }: RadioProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("Radio 컴포넌트는 RadioGroup 내부에서만 사용해야 합니다.");
  }

  const { tone, required, name, disabled: groupDisabled } = context;
  const isDisabled = groupDisabled || disabled;

  return (
    <label
      className={flex({
        alignItems: "center",
        gap: "8",
        cursor: isDisabled ? "not-allowed" : "pointer",
      })}
    >
      <Ariakit.Radio
        ref={ref}
        value={value}
        disabled={isDisabled}
        className={radioStyles({ tone, disabled: isDisabled })}
        id={`radio-${value}`}
        name={name}
        required={required}
      />
      {children && (
        <span className={labelTextStyles({ disabled: isDisabled })}>
          {children}
        </span>
      )}
    </label>
  );
}

const radioStyles = cva({
  base: {
    appearance: "none",
    width: "5",
    height: "5",
    border: "neutral",
    borderWidth: "lg",
    borderRadius: "full",
    transition: "0.2s",
    position: "relative",

    "&:hover": {
      backgroundColor: "bg.neutral.hover",
    },

    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "lg",
      outlineColor: "rgba(0, 0, 0, 0.2)",
      outlineOffset: "2",
    },

    "&:checked::after": {
      content: '""',
      display: "block",
      width: "2.5",
      height: "2.5",
      borderRadius: "full",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  variants: {
    tone: {
      neutral: {
        borderColor: "border.neutral",
        "&:checked": {
          borderColor: "border.neutral.active",
        },
        "&:checked::after": {
          backgroundColor: "fg.neutral",
        },
        "&:checked:focus-visible": {
          outlineColor: "border.neutral.focus",
        },
      },
      brand: {
        borderColor: "border.brand",
        "&:checked": {
          borderColor: "border.brand.active",
        },
        "&:checked::after": {
          backgroundColor: "fg.brand",
        },
        "&:checked:focus-visible": {
          outlineColor: "border.brand.focus",
        },
      },
      danger: {
        borderColor: "border.danger",
        "&:checked": {
          borderColor: "border.danger.active",
        },
        "&:checked::after": {
          backgroundColor: "fg.danger",
        },
        "&:checked:focus-visible": {
          outlineColor: "border.danger",
        },
      },
      warning: {
        borderColor: "border.warning",
        "&:checked": {
          borderColor: "border.warning.active",
        },
        "&:checked::after": {
          backgroundColor: "fg.warning",
        },
        "&:checked:focus-visible": {
          outlineColor: "border.warning",
        },
      },
      success: {
        borderColor: "border.success",
        "&:checked": {
          borderColor: "border.success.active",
        },
        "&:checked::after": {
          backgroundColor: "fg.success",
        },
        "&:checked:focus-visible": {
          outlineColor: "border.success",
        },
      },
      info: {
        borderColor: "border.info",
        "&:checked": {
          borderColor: "border.info.active",
        },
        "&:checked::after": {
          backgroundColor: "fg.info",
        },
        "&:checked:focus-visible": {
          outlineColor: "border.info",
        },
      },
    },
    disabled: {
      true: {
        borderColor: "border.neutral.disabled",
        opacity: 0.5,
      },
    },
  },
});

const labelTextStyles = cva({
  base: {},
  variants: {
    disabled: {
      true: {
        color: "fg.neutral.disabled",
      },
    },
  },
});
