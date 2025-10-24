import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { type ReactNode, createContext, useContext } from "react";
import { css, cva } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import type { Tone } from "../../tokens/colors";

const RadioGroupContext = createContext<{
  tone: Tone;
  disabled?: boolean;
} | null>(null);

export interface RadioGroupProps {
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
  orientation,
  tone = "neutral",
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ tone, disabled }}>
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
      >
        <ArkRadioGroup.Label
          className={css({
            textStyle: "body.lg",
            marginBottom: "8",
          })}
        >
          {label}
        </ArkRadioGroup.Label>
        <div className={radioGroupStyles({ orientation })}>{children}</div>
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

  const { tone, disabled: groupDisabled } = context;
  const isDisabled = disabled || groupDisabled;

  return (
    <ArkRadioGroup.Item
      value={value}
      disabled={isDisabled}
      className={flex({
        alignItems: "center",
        gap: "8",
        cursor: isDisabled ? "not-allowed" : "pointer",
      })}
    >
      <ArkRadioGroup.ItemControl className={radioWrapperStyles}>
        <div
          className={radioCircleStyles({ tone, disabled: isDisabled })}
          role="presentation"
        />
        <ArkRadioGroup.Indicator
          className={radioDotStyles({ tone, disabled: isDisabled })}
        />
        <div className={radioHoverStyles({ tone, disabled: isDisabled })} />
        <ArkRadioGroup.ItemHiddenInput ref={ref} />
      </ArkRadioGroup.ItemControl>
      {children && (
        <ArkRadioGroup.ItemText
          className={labelTextStyles({ disabled: isDisabled })}
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

  "[data-focus-visible] &": {
    "& > div[role='presentation']": {
      outline: "solid",
      outlineWidth: "2px",
      outlineColor: "border.brand.focus",
      outlineOffset: "2px",
      borderRadius: "full",
    },
  },
});

const createRadioCircleToneVariant = (
  borderBase: string,
  borderActive?: string,
) => ({
  borderColor: borderBase,
  "[data-state='checked'] &": {
    borderColor: borderActive || borderBase,
  },
  "[data-state='checked'][data-focus-visible] &": {
    outlineColor: borderActive || borderBase,
  },
});

const radioCircleStyles = cva({
  base: {
    backgroundColor: "bg.neutral",
    width: "4",
    height: "4",
    border: "neutral",
    borderWidth: "lg",
    borderRadius: "full",
    position: "absolute",
    pointerEvents: "none",
    transition: "0.2s",
    "[data-hover] &": {
      backgroundColor: "bg.neutral.hover",
    },
  },
  variants: {
    tone: {
      neutral: createRadioCircleToneVariant(
        "border.neutral",
        "border.neutral.active",
      ),
      brand: createRadioCircleToneVariant(
        "border.brand",
        "border.brand.active",
      ),
      danger: createRadioCircleToneVariant("border.danger"),
      warning: createRadioCircleToneVariant("border.warning"),
      success: createRadioCircleToneVariant("border.success"),
      info: createRadioCircleToneVariant("border.info"),
    },
    disabled: {
      true: {
        borderColor: "slate.3!",
        backgroundColor: "slate.2!",
        "[data-state='checked'] &": {
          borderColor: "slate.3!",
          backgroundColor: "slate.2!",
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
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.2s",
    "[data-hover] &": {
      opacity: 0.1,
    },
  },
  variants: {
    tone: {
      neutral: { backgroundColor: "fg.neutral" },
      brand: { backgroundColor: "fg.brand" },
      danger: { backgroundColor: "fg.danger" },
      warning: { backgroundColor: "fg.warning" },
      success: { backgroundColor: "fg.success" },
      info: { backgroundColor: "fg.info" },
    },
    disabled: {
      true: {
        display: "none",
      },
    },
  },
});

const labelTextStyles = cva({
  base: {
    textStyle: "label.md",
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
    width: "2!",
    height: "2!",
    borderRadius: "full",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.2s",
    "[data-scope='radio-group'][data-part='item'][data-state='checked'] &": {
      opacity: 1,
    },
  },
  variants: {
    tone: {
      neutral: { backgroundColor: "fg.neutral" },
      brand: { backgroundColor: "fg.brand" },
      danger: { backgroundColor: "fg.danger" },
      warning: { backgroundColor: "fg.warning" },
      success: { backgroundColor: "fg.success" },
      info: { backgroundColor: "fg.info" },
    },
    disabled: {
      true: {
        backgroundColor: "slate.3!",
      },
    },
  },
});
