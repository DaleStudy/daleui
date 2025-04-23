import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { type ReactNode, createContext, useContext } from "react";
import { css, cva } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import type { Tone } from "../../tokens/colors";

const RadioGroupContext = createContext<{
  name: string;
  tone: Tone;
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
 * - `children`에는 `Radio` 컴포넌트만 포함해야 합니다.
 * - `name` 속성으로 동일 그룹의 라디오 버튼 이름을 지정할 수 있습니다.
 * - `label` 속성으로 라디오 그룹의 설명을 지정할 수 있습니다.
 * - `defaultValue` 속성으로 초기 선택 값을 지정할 수 있습니다.
 * - `value` 속성으로 선택 값을 제어할 수 있습니다.
 * - `onChange` 속성으로 선택 변경 시 콜백을 지정할 수 있습니다.
 * - `disabled` 속성을 사용하여 모든 라디오 버튼을 비활성화할 수 있습니다.
 * - `required` 속성을 사용하여 반드시 하나를 선택하도록 할 수 있습니다.
 * - `orientation` 속성으로 'horizontal' 또는 'vertical' 방향을 지정할 수 있습니다.
 * - `tone` 속성으로 색상을 지정할 수 있습니다.
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
          marginBottom: "2",
        })}
      >
        {label}
      </div>
      <RadioGroupContext.Provider value={{ name, tone }}>
        <RadixRadioGroup.Root
          name={name}
          defaultValue={defaultValue}
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-labelledby={`${name}-label`}
          className={radioGroupStyles({ orientation })}
        >
          {children}
        </RadixRadioGroup.Root>
      </RadioGroupContext.Provider>
    </div>
  );
}

const radioGroupStyles = cva({
  base: {
    display: "flex",
    gap: "2",
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
   * 이 라디오 버튼의 값입니다.
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
  ref?: React.Ref<HTMLButtonElement>;
}

export function Radio({ value, children, disabled, ref }: RadioProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("Radio 컴포넌트는 RadioGroup 내부에서만 사용해야 합니다.");
  }

  const { tone } = context;

  return (
    <label
      className={flex({
        alignItems: "center",
        gap: "2",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      })}
    >
      <div className={radioWrapperStyles}>
        <RadixRadioGroup.Item
          ref={ref}
          value={value}
          disabled={disabled}
          className={radioInputStyles}
          id={`radio-${value}`}
        >
          <RadixRadioGroup.Indicator className={radioDotStyles({ tone })} />
        </RadixRadioGroup.Item>
        <div className={radioCircleStyles({ tone })} />
      </div>
      {children && <span>{children}</span>}
    </label>
  );
}

const radioWrapperStyles = css({
  position: "relative",
  width: "5",
  height: "5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const radioInputStyles = css({
  all: "unset",
  position: "absolute",
  width: "100%",
  height: "100%",
  margin: 0,
  zIndex: 1,
  cursor: "inherit",

  "&:focus-visible + div": {
    outline: "2px solid",
    outlineColor: "rgba(0, 0, 0, 0.2)",
    outlineOffset: "2px",
  },

  "&:disabled + div": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const radioCircleStyles = cva({
  base: {
    backgroundColor: "bg",
    width: "5",
    height: "5",
    borderRadius: "50%",
    border: "2px solid",
    borderColor: "border",
    position: "absolute",
    pointerEvents: "none",
    transition: "0.2s",

    "input:hover + &": {
      backgroundColor: "bg.hover",
    },
  },
  variants: {
    tone: {
      neutral: {
        "[data-state='checked'] + &": {
          borderColor: "border",
        },
        "[data-state='checked']:focus-visible + &": {
          outlineColor: "border",
        },
      },
      accent: {
        borderColor: "border.accent",
        "[data-state='checked'] + &": {
          borderColor: "border.accent",
        },
        "[data-state='checked']:focus-visible + &": {
          outlineColor: "border.accent",
        },
      },
      danger: {
        borderColor: "border.danger",
        "[data-state='checked'] + &": {
          borderColor: "border.danger",
        },
        "[data-state='checked']:focus-visible + &": {
          outlineColor: "border.danger",
        },
      },
      warning: {
        borderColor: "border.warning",
        "[data-state='checked'] + &": {
          borderColor: "border.warning",
        },
        "[data-state='checked']:focus-visible + &": {
          outlineColor: "border.warning",
        },
      },
    },
  },
});

const radioDotStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    pointerEvents: "none",
    "&::after": {
      content: '""',
      display: "block",
      width: "2.5",
      height: "2.5",
      borderRadius: "50%",
      backgroundColor: "text",
    },
  },
  variants: {
    tone: {
      neutral: {
        "&::after": {
          backgroundColor: "text",
        },
      },
      accent: {
        "&::after": {
          backgroundColor: "text.accent",
        },
      },
      danger: {
        "&::after": {
          backgroundColor: "text.danger",
        },
      },
      warning: {
        "&::after": {
          backgroundColor: "text.warning",
        },
      },
    },
  },
});
