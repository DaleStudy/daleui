import { type ComponentPropsWithoutRef, type Ref, useState } from "react";
import { cva } from "../../../styled-system/css";
import type { FieldProps } from "../shared/types";
import { Icon } from "../Icon/Icon";

export interface PasswordInputProps
  extends
    Omit<
      ComponentPropsWithoutRef<"input">,
      | "size"
      | "type"
      | "value"
      | "defaultValue"
      | "onChange"
      | "disabled"
      | "required"
      // TODO: readOnly도 Omit 대상 (#935)
    >,
    FieldProps {
  /** 플레이스홀더 */
  placeholder?: string;

  /** 제어 모드 입력 값 */
  value?: string;
  /** 비제어 모드 초기 입력값 */
  defaultValue?: string;
  /** 변경 이벤트 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 입력 요소 참조 */
  ref?: Ref<HTMLInputElement>;
}

/**
 * 패스워드 인풋은 로그인이나 계정 인증 과정에서 사용자의 비밀번호를 안전하게 입력하도록 지원하는 보안 입력 필드입니다.
 *
 * - 토글 버튼은 키보드 및 스크린 리더를 지원합니다.
 */
export function PasswordInput({
  invalid = false,
  required = false,
  disabled = false,
  placeholder = "패스워드를 입력해주세요.",
  value,
  defaultValue,
  onChange,
  ref,
  ...rest
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (!disabled) {
      setIsVisible((prev) => !prev);
    }
  };

  return (
    <div
      className={containerStyles({
        state: invalid ? "error" : undefined,
      })}
    >
      <input
        ref={ref}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        className={inputStyles()}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        aria-label="패스워드"
        aria-invalid={invalid}
        aria-required={required}
        {...rest}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={disabled}
        className={iconButtonStyles({ disabled })}
        aria-pressed={isVisible}
        aria-label={isVisible ? "패스워드 숨기기" : "패스워드 보기"}
      >
        <Icon name={isVisible ? "eye" : "eyeOff"} size="md" tone="neutral" />
      </button>
    </div>
  );
}

const containerStyles = cva({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "12",
    paddingX: "12",
    gap: "8",
    borderWidth: "md",
    borderStyle: "solid",
    borderRadius: "sm",
    backgroundColor: "appBg",
    borderColor: "border.neutral",
    "&:hover": {
      borderColor: "border.neutral.hover",
    },
    "&:active": {
      borderColor: "border.neutral.active",
    },
    "&:focus-within": {
      borderColor: "border.neutral",
      outlineStyle: "solid",
      outlineWidth: "lg",
      outlineColor: "border.brand.focus",
      outlineOffset: "2px",
    },
    "&:has(input:disabled)": {
      cursor: "not-allowed",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
      borderTopWidth: "md",
      borderTopColor: "border.neutral.disabled",
      color: "fg.neutral.disabled",
    },
  },
  variants: {
    state: {
      error: {
        borderColor: "border.danger",
        "&:focus-within": {
          borderColor: "border.danger",
        },
        "&:hover": {
          borderColor: "border.danger",
        },
        "&:active": {
          borderColor: "border.danger",
        },
      },
    },
  },
});

const inputStyles = cva({
  base: {
    flex: "1",
    minWidth: 0,
    border: "none",
    outline: "none",
    color: "fg.neutral.default",
    fontSize: "md",
    fontWeight: "medium",
    lineHeight: "tight",
    letterSpacing: "balanced",

    "&::placeholder": {
      color: "fg.neutral.placeholder",
    },
    "&:disabled": {
      cursor: "not-allowed",
      color: "fg.neutral.disabled",
      "&::placeholder": {
        color: "fg.neutral.disabled",
      },
    },
  },
});

const iconButtonStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "bg.neutral.hover",
    },
    "&:active": {
      backgroundColor: "bg.neutral.active",
    },
  },
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  },
});
