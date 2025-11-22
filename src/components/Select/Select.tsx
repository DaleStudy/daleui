import {
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cva } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  /** 선택된 값 */
  value?: string;
  /** 값이 변경될 때 호출되는 함수 */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** 비활성화 상태를 나타냅니다 */
  disabled?: boolean;
  /** 필수 입력 여부를 나타냅니다 */
  required?: boolean;
  /** 오류 상태를 나타냅니다 */
  invalid?: boolean;
  /** 지우기 버튼의 aria-label 텍스트입니다. 제공되면 지우기 버튼이 표시됩니다 */
  clearButtonName?: string;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 역할을 설명하는 레이블 */
  "aria-label"?: string;
  /** DOM 요소 참조 */
  ref?: Ref<HTMLSelectElement>;
  /** 이름 */
  name?: string;
}

/**
 * - 네이티브 select 태그를 사용하는 Select 컴포넌트입니다.
 * - `children`으로 `<option>` 요소를 직접 전달할 수 있습니다.
 * - `disabled` 속성으로 비활성화 상태를 제어할 수 있으며, `invalid` 속성을 통해 오류 상태를 표현할 수 있습니다.
 * - `clearButtonName` 속성을 통해 선택된 값을 지울 수 있는 버튼을 표시할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - label을 사용하거나 aria-label 속성을 설정하여 Select 컴포넌트의 역할을 명시적으로 설명해주세요.
 */
export function Select({
  value,
  defaultValue,
  disabled,
  required,
  invalid,
  clearButtonName,
  placeholder,
  children,
  onChange,
  ref,
  ...rest
}: SelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasValue, setHasValue] = useState<boolean>(!!(value || defaultValue));
  const [overflowed, setOverflowed] = useState<boolean>(false);
  const [titleText, setTitleText] = useState<string>("");

  const setRef = (node: HTMLSelectElement | null) => {
    selectRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
    setHasValue(!!e.target.value && e.target.value !== "");
    checkOverflow();
  };

  const checkOverflow = useCallback(() => {
    const selectElement = selectRef.current;
    if (!selectElement) return;

    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const optionText = selectedOption ? selectedOption.text : "";

    const computedStyle = window.getComputedStyle(selectElement);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const availableWidth =
      selectElement.clientWidth - paddingLeft - paddingRight;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    const textWidth = context.measureText(optionText).width;

    const overflow = textWidth > availableWidth;
    setOverflowed(overflow);
    setTitleText(overflow ? optionText : "");
  }, []);

  const handleClear = () => {
    const selectElement = selectRef.current;
    if (disabled || !selectElement) return;

    selectElement.value = "";
    setHasValue(false);
    if (onChange) {
      const syntheticEvent = {
        target: {
          ...selectElement,
          value: "",
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
    requestAnimationFrame(() => {
      checkOverflow();
    });
  };

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      checkOverflow();
    });

    const handleResize = () => {
      checkOverflow();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkOverflow]);

  const showClearButton = Boolean(clearButtonName && !disabled && hasValue);

  return (
    <div
      data-tooltip={overflowed ? titleText : undefined}
      className={wrapperStyles({ overflowed })}
    >
      <select
        ref={setRef}
        value={value}
        defaultValue={value !== undefined ? undefined : defaultValue || ""}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-invalid={invalid ? true : undefined}
        aria-required={required ? true : undefined}
        className={selectStyles({ invalid, showClearButton })}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>

      {showClearButton && (
        <button
          type="button"
          aria-label={clearButtonName}
          onClick={handleClear}
          className={clearButtonStyles()}
        >
          <Icon name="x" size="md" tone="neutral" />
        </button>
      )}
      <div className={chevronDownIconStyles()}>
        <Icon name="chevronDown" size="md" tone="neutral" />
      </div>
    </div>
  );
}

const wrapperStyles = cva({
  base: {
    position: "relative",
    width: "100%",
  },
  variants: {
    overflowed: {
      true: {
        "&:hover::after": {
          content: "attr(data-tooltip)",
          position: "absolute",
          bottom: "100%",
          left: "0",
          marginBottom: "4",
          paddingX: "8",
          paddingY: "4",
          backgroundColor: "bg.neutral.hover",
          color: "fg.neutral",
          fontStyle: "label.sm",
          borderRadius: "xs",
          whiteSpace: "nowrap",
          zIndex: "1000",
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    overflowed: false,
  },
});

const selectStyles = cva({
  base: {
    appearance: "none",
    display: "flex",
    alignItems: "center",
    paddingY: "12",
    paddingLeft: "12",
    width: "100%",
    height: "12",
    fontSize: "md",
    borderWidth: "md",
    borderRadius: "sm",
    fontStyle: "label.md",
    cursor: "pointer",
    backgroundColor: "appBg",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:disabled": {
      color: "fg.neutral.disabled",
      cursor: "not-allowed",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },
    "&:focus": {
      outlineStyle: "solid",
      outlineWidth: "lg",
      outlineOffset: "2",
      outlineColor: "border.brand.focus",
    },
  },
  variants: {
    invalid: {
      true: {
        borderColor: "border.danger",
      },
      false: {
        borderColor: "border.neutral",
        "&:hover:not(:disabled)": {
          borderColor: "border.neutral.hover",
        },
        "&:active:not(:disabled)": {
          borderColor: "border.brand.active",
        },
      },
    },
    showClearButton: {
      true: {
        paddingRight: "3.625rem", // 58px
      },
      false: {
        paddingRight: "2.375rem", // 38px
      },
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

const positionStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
};

const clearButtonStyles = cva({
  base: {
    ...positionStyles,
    right: "2.375rem", // 38px
    cursor: "pointer",
    borderRadius: "xs",
    "&:hover": {
      backgroundColor: "bg.neutral.hover",
    },
    "&:active": {
      backgroundColor: "bg.neutral.active",
    },
  },
});

const chevronDownIconStyles = cva({
  base: {
    ...positionStyles,
    right: "0.75rem", // 12px
    pointerEvents: "none",
  },
});
