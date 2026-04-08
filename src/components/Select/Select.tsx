import {
  type HTMLAttributes,
  type Ref,
  useCallback,
  useRef,
  useState,
} from "react";
import { cva } from "../../../styled-system/css";
import type { FieldProps } from "../shared/types";
import { Icon } from "../Icon/Icon";

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLSelectElement>, "onChange">, FieldProps {
  /** 지우기 버튼 접근성 이름 (aria-label) */
  clearButtonName?: string;
  /** 플레이스홀더 */
  placeholder?: string;

  /** 제어 모드 선택 값 */
  value?: string;
  /** 비제어 모드 초기 선택 값 */
  defaultValue?: string;
  /** 변경 이벤트 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** 접근성 레이블 (aria-label) */
  "aria-label"?: string;
  /** select 요소 참조 */
  ref?: Ref<HTMLSelectElement>;
  /** 폼 name */
  name?: string;
}

/**
 * 셀렉트는 미리 정의된 여러 옵션 중 하나를 사용자가 선택하도록 하기 위한 컴포넌트입니다.
 * - 네이티브 select 태그를 사용하는 Select 컴포넌트입니다.
 * - 여러 선택지 중 하나를 고를 때 사용하며, 화면 공간을 절약하고 옵션 목록을 펼쳤을 때만 표시하고 싶을 때 적합합니다.
 * - 선택지가 적은 경우(5개 이하)에는 [RadioGroup](?path=/docs/components-radiogroup--docs) 컴포넌트 사용을 권장합니다.
 * - `children`으로 `<option>` 요소를 직접 전달합니다.
 *
 * ### 접근성(Accessibility) 안내
 * - `Label` 컴포넌트를 연결하거나 `aria-label`을 설정하여 역할을 명시적으로 설명해주세요.
 * - `invalid`를 true로 설정하면 `aria-invalid`, `required`를 true로 설정하면 `aria-required`가 자동으로 추가됩니다.
 */
export function Select({
  value,
  defaultValue,
  disabled,
  required = false,
  invalid = false,
  clearButtonName,
  placeholder,
  children,
  onChange,
  ref,
  ...rest
}: SelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [internalHasValue, setInternalHasValue] =
    useState<boolean>(!!defaultValue);
  const [titleText, setTitleText] = useState<string>("");
  const isUncontrolled = value === undefined;
  const hasValue = isUncontrolled ? internalHasValue : !!value;
  const overflowed = titleText !== "";

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

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    const textWidth = context.measureText(optionText).width;

    setTitleText(textWidth > availableWidth ? optionText : "");
  }, []);

  /**
   * 내부 ref(overflowed 상태를 확인)와 외부에서 ref를 주입할 경우 덮어쓰기 방지를 위한 함수입니다.
   */
  const setRef = useCallback(
    (node: HTMLSelectElement) => {
      let cleanup: () => void = () => {};
      selectRef.current = node;
      const observer = new ResizeObserver(() => {
        checkOverflow();
      });
      observer.observe(node);
      if (typeof ref === "function") {
        // React 19+ cleanup support
        cleanup = ref(node) ?? (() => {});
      } else if (ref) {
        ref.current = node;
      }
      return () => {
        cleanup();
        observer.disconnect();
      };
    },
    [ref, checkOverflow],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
    setInternalHasValue(!!e.target.value);
    checkOverflow();
  };

  const handleClear = () => {
    const selectElement = selectRef.current;
    if (disabled || !selectElement) return;

    selectElement.value = "";
    setInternalHasValue(false);
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

  const showClearButton = !!(clearButtonName && !disabled && hasValue);
  const defaultValueStr = defaultValue || "";

  return (
    <div
      data-tooltip={overflowed ? titleText : undefined}
      className={wrapperStyles({ overflowed })}
    >
      <select
        ref={setRef}
        value={value}
        defaultValue={isUncontrolled ? defaultValueStr : undefined}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-invalid={invalid}
        aria-required={required}
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
