import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { type ReactNode, createContext, useContext } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

const RadioGroupContext = createContext<{
  tone: Tone;
  required: boolean | undefined;
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
      <RadioGroupContext.Provider value={{ tone, required }}>
        <ArkRadioGroup.Root
          name={name}
          defaultValue={defaultValue}
          value={value}
          onValueChange={(details) =>
            details.value && onChange?.(details.value)
          }
          disabled={disabled}
          aria-required={required}
          aria-labelledby={`${name}-label`}
          orientation={orientation}
          className={radioGroupStyles({ orientation })}
        >
          {children}
          <ArkRadioGroup.Indicator
            className={radioIndicatorStyles({ tone, disabled })}
            role="presentation"
          />
        </ArkRadioGroup.Root>
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
  ref?: React.Ref<HTMLLabelElement>;
}

export function Radio({ value, children, disabled, ref }: RadioProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("Radio 컴포넌트는 RadioGroup 내부에서만 사용해야 합니다.");
  }

  const { tone, required } = context;

  return (
    <ArkRadioGroup.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={radioItemStyles}
    >
      <ArkRadioGroup.ItemControl
        className={radioControlStyles({ tone, disabled })}
      />
      {children && (
        <ArkRadioGroup.ItemText className={labelTextStyles({ disabled })}>
          {children}
        </ArkRadioGroup.ItemText>
      )}
      <ArkRadioGroup.ItemHiddenInput required={required} />
    </ArkRadioGroup.Item>
  );
}

const radioItemStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "8",
  cursor: "pointer",
  "&[data-disabled]": {
    cursor: "not-allowed",
  },
  "&[data-focus-visible]": {
    borderRadius: "md",
    outline: "2px solid",
    outlineColor: "border.brand.focus",
    outlineOffset: "2px",
  },
});

const radioControlStyles = cva({
  base: {
    position: "relative",
    width: "5",
    height: "5",
    backgroundColor: "bg.neutral",
    border: "neutral",
    borderWidth: "lg",
    borderRadius: "full",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "bg.neutral.hover",
    },
    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "lg",
      outlineColor: "rgba(0, 0, 0, 0.2)",
      outlineOffset: "2",
    },
  },
  variants: {
    tone: {
      neutral: {
        borderColor: "border.neutral",
        "&[data-state='checked']": {
          borderColor: "border.neutral.active",
        },
        "&[data-state='checked']:focus-visible": {
          outlineColor: "border.neutral.focus",
        },
      },
      brand: {
        borderColor: "border.brand",
        "&[data-state='checked']": {
          borderColor: "border.brand.active",
        },
        "&[data-state='checked']:focus-visible": {
          outlineColor: "border.brand.focus",
        },
      },
      danger: {
        borderColor: "border.danger",
        "&[data-state='checked']": {
          borderColor: "border.danger",
        },
        "&[data-state='checked']:focus-visible": {
          outlineColor: "border.danger",
        },
      },
      warning: {
        borderColor: "border.warning",
        "&[data-state='checked']": {
          borderColor: "border.warning",
        },
        "&[data-state='checked']:focus-visible": {
          outlineColor: "border.warning",
        },
      },
      success: {
        borderColor: "border.success",
        "&[data-state='checked']": {
          borderColor: "border.success",
        },
        "&[data-state='checked']:focus-visible": {
          outlineColor: "border.success",
        },
      },
      info: {
        borderColor: "border.info",
        "&[data-state='checked']": {
          borderColor: "border.info",
        },
        "&[data-state='checked']:focus-visible": {
          outlineColor: "border.info",
        },
      },
    },
    disabled: {
      true: {
        borderColor: "fg.neutral.disabled",
        opacity: 0.5,
        cursor: "not-allowed",
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

const radioIndicatorStyles = cva({
  base: {
    width: "2.5",
    height: "2.5",
    borderRadius: "full",
    backgroundColor: "fg.neutral",
    marginLeft: "0.3rem",
    marginTop: "0.45rem",
  },
  variants: {
    tone: {
      neutral: {
        backgroundColor: "fg.neutral",
      },
      brand: {
        backgroundColor: "fg.brand",
      },
      danger: {
        backgroundColor: "fg.danger",
      },
      warning: {
        backgroundColor: "fg.warning",
      },
      success: {
        backgroundColor: "fg.success",
      },
      info: {
        backgroundColor: "fg.info",
      },
    },
    disabled: {
      true: {
        backgroundColor: "fg.neutral.disabled",
        opacity: 0.5,
      },
    },
  },
});
