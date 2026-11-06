import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type Ref,
  useId,
  useState,
} from "react";
import { css, cva, cx } from "../../../styled-system/css";
import type { FieldProps } from "../shared/types";
import { HelperText } from "../shared/HelperText";
import { useField } from "../shared/useField";
import { Label } from "../Label/Label";

export interface TextareaProps
  extends
    Omit<
      ComponentPropsWithoutRef<"textarea">,
      | "value"
      | "defaultValue"
      | "onChange"
      | "disabled"
      | "required"
      | "readOnly"
    >,
    FieldProps {
  /** 크기 */
  size?: "sm" | "lg";
  /** 표시할 줄 수 */
  rows?: number;
  /** 최대 글자 수 */
  maxLength?: number;
  /** 글자 수 카운터 표시 여부 */
  showCount?: boolean;
  /** 세로 크기 조절 가능 여부 */
  resizable?: boolean;

  /** 제어 모드 입력 값 */
  value?: string;
  /** 비제어 모드 초기 입력값 */
  defaultValue?: string;
  /** 변경 이벤트 핸들러 */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  /** 입력 요소 참조 */
  ref?: Ref<HTMLTextAreaElement>;
}

/**
 * 텍스트 에어리어는 의견, 설명, 서술형 답변처럼 여러 줄의 텍스트를 입력할 수 있도록 제공되는 입력 컴포넌트입니다.
 *
 * ### 접근성(Accessibility) 안내
 * - `label`을 넘기면 레이블이 렌더링되고 입력 요소와 연결됩니다.
 * - 화면에 이미 레이블 역할을 하는 제목이 있다면 `label` 대신 `aria-labelledby`로 그 요소의 id를 연결하세요.
 * - `helperText`와 `errorMessage`는 `aria-describedby`로 입력 요소와 연결됩니다.
 */
export function Textarea({
  size = "sm",
  rows = 3,
  maxLength,
  showCount = false,
  resizable = true,
  invalid = false,
  required = false,
  disabled = false,
  readOnly = false,
  className,
  value,
  defaultValue,
  onChange,
  ref,
  label,
  helperText,
  errorMessage,
  id: idProp,
  "aria-describedby": ariaDescribedByProp,
  ...rest
}: TextareaProps) {
  const reactId = useId();
  const textareaId = idProp ?? reactId;
  const {
    fieldProps,
    helpTextProps,
    bottomText,
    showBottomText,
    isReadOnly,
    isDisabled,
  } = useField({
    helperText,
    errorMessage,
    invalid,
    disabled,
    readOnly,
    required,
    externalAriaDescribedBy: ariaDescribedByProp,
  });

  // 비제어 모드에서도 카운터가 갱신되도록 길이만 따로 추적함
  const isControlled = value !== undefined;
  const [uncontrolledLength, setUncontrolledLength] = useState(
    defaultValue?.length ?? 0,
  );
  const count = isControlled ? value.length : uncontrolledLength;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setUncontrolledLength(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className={css({ width: "100%" })}>
      {label && (
        <div className={css({ marginBottom: "8" })}>
          <Label
            labelText={label}
            htmlFor={textareaId}
            required={required}
            disabled={isDisabled}
          />
        </div>
      )}
      <textarea
        id={textareaId}
        className={cx(textareaStyles({ size, invalid, resizable }), className)}
        ref={ref}
        rows={rows}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...rest}
        {...fieldProps}
      />
      {(showBottomText || showCount) && (
        <div className={bottomRowStyles}>
          {showBottomText && (
            <HelperText {...helpTextProps} disabled={isDisabled}>
              {bottomText}
            </HelperText>
          )}
          {showCount && (
            <div className={counterStyles}>
              {maxLength !== undefined ? `${count} / ${maxLength}` : count}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const textareaStyles = cva({
  base: {
    display: "block",
    width: "100%",
    padding: "12",
    color: "fg.neutral",
    fontFamily: "inherit",
    lineHeight: "balanced",
    border: "neutral",
    borderWidth: "md",
    borderRadius: "sm",
    backgroundColor: "appBg",
    // all로 두면 리사이즈로 바뀌는 높이에도 트랜지션이 걸려 드래그가 늦게 따라옴
    transition: "border-color 0.2s ease-in-out, border-radius 0.2s ease-in-out",

    "&::placeholder": {
      color: "fg.neutral.placeholder",
    },

    "&:focus-visible": {
      outlineStyle: "solid",
      outlineWidth: "lg",
      outlineOffset: "2px",
      borderRadius: "md",
      outlineColor: "border.brand.focus",
    },

    "&:disabled": {
      cursor: "not-allowed",
      color: "fg.neutral.disabled",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },

    "&[readonly]": {
      cursor: "default",
      "&:hover": { borderColor: "border.neutral" },
      "&:active": { borderColor: "border.neutral" },
    },
  },
  variants: {
    size: {
      sm: { fontSize: "md" },
      lg: { fontSize: "lg" },
    },
    invalid: {
      true: {
        border: "danger",
      },
      false: {
        "&:hover:not(:disabled)": {
          borderColor: "border.neutral.hover",
        },
        "&:active:not(:disabled)": {
          borderColor: "border.neutral.active",
        },
      },
    },
    resizable: {
      true: { resize: "vertical" },
      false: { resize: "none" },
    },
  },
});

// HelperText의 상단 여백과 기준선을 맞춰 카운터를 오른쪽에 붙임
const bottomRowStyles = css({
  display: "flex",
  alignItems: "baseline",
  gap: "16",
});

const counterStyles = css({
  marginTop: "4",
  marginLeft: "auto",
  flexShrink: 0,
  textStyle: "body.sm",
  color: "fg.neutral.placeholder",
  whiteSpace: "nowrap",
});
