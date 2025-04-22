import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { css, cva } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import type { Tone } from "../../tokens/colors";

const RadioGroupContext = createContext<{
  name: string;
  selectedValue?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  tone?: Tone;
  required?: boolean;
}>({
  name: "",
  onChange: () => {},
});

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
  tone,
}: RadioGroupProps) {
  // 내부 상태 관리 (controlled/uncontrolled 모두 지원)
  const [internalValue, setInternalValue] = useState(defaultValue);

  // 현재 선택된 값 (외부 제공값 우선)
  const currentValue = value !== undefined ? value : internalValue;

  // 값 변경 핸들러
  const handleChange = useCallback(
    (newValue: string) => {
      // 내부 상태 업데이트 (uncontrolled 모드인 경우)
      if (value === undefined) {
        setInternalValue(newValue);
      }

      // 외부 onChange 핸들러 호출
      onChange?.(newValue);
    },
    [onChange, value]
  );

  const contextValue = useMemo(
    () => ({
      name,
      selectedValue: currentValue,
      onChange: handleChange,
      disabled,
      tone,
      required,
    }),
    [name, currentValue, handleChange, disabled, tone, required]
  );

  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`}>
      <div
        id={`${name}-label`}
        className={css({
          fontWeight: "medium",
          marginBottom: "0.5rem",
        })}
      >
        {label}
      </div>
      <RadioGroupContext.Provider value={contextValue}>
        <div className={radioGroupStyles({ orientation })}>{children}</div>
      </RadioGroupContext.Provider>
    </div>
  );
}

const radioGroupStyles = cva({
  base: {
    display: "flex",
    gap: "0.5rem",
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
}

export function Radio({ value, children, disabled }: RadioProps) {
  const context = useContext(RadioGroupContext);

  if (!context.name) {
    throw new Error("Radio 컴포넌트는 RadioGroup 내부에서만 사용해야 합니다.");
  }

  const {
    name,
    selectedValue,
    onChange,
    disabled: groupDisabled,
    tone,
    required,
  } = context;

  const isDisabled = disabled || groupDisabled;
  const isChecked = selectedValue === value;

  return (
    <label
      className={flex({
        alignItems: "center",
        gap: "0.5rem",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
      })}
    >
      <div className={radioWrapperStyles}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          onChange={() => onChange(value)}
          disabled={isDisabled}
          required={required}
          aria-required={required}
          className={radioInputStyles}
        />
        <div className={radioCircleStyles({ tone })} />
        {isChecked && <div className={radioDotStyles({ tone })} />}
      </div>
      {children && <span>{children}</span>}
    </label>
  );
}

const radioWrapperStyles = css({
  position: "relative",
  width: "1.25rem",
  height: "1.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const radioInputStyles = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0,
  margin: 0,
  zIndex: 1,
  cursor: "inherit",

  "&:focus-visible + div": {
    outline: "2px solid",
    outlineColor: "rgba(0, 0, 0, 0.2)",
    outlineOffset: "2px",
  },

  "&:checked + div": {
    borderColor: "border",
  },

  "&:disabled + div": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const radioCircleStyles = cva({
  base: {
    backgroundColor: "bg",
    width: "1.25rem",
    height: "1.25rem",
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
        borderColor: "border",
        "input:checked + &": {
          borderColor: "border",
        },
        "input:focus-visible + &": {
          outlineColor: "border",
        },
      },
      accent: {
        borderColor: "border.accent",
        "input:checked + &": {
          borderColor: "border.accent",
        },
        "input:focus-visible + &": {
          outlineColor: "border.accent",
        },
      },
      danger: {
        borderColor: "border.danger",
        "input:checked + &": {
          borderColor: "border.danger",
        },
        "input:focus-visible + &": {
          outlineColor: "border.danger",
        },
      },
      warning: {
        borderColor: "border.warning",
        "input:checked + &": {
          borderColor: "border.warning",
        },
        "input:focus-visible + &": {
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
      width: "0.625rem",
      height: "0.625rem",
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
