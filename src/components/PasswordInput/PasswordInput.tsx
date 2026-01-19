import { type ComponentPropsWithoutRef, type Ref, useState } from "react";
import { cva } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";

export interface PasswordInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "size" | "type"
> {
  /** 플레이스홀더 */
  placeholder?: string;
  /** 오류 상태 여부 (true면 위험 톤 적용 및 aria-invalid=true) */
  invalid?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** DOM 요소 참조 */
  ref?: Ref<HTMLInputElement>;
}

/**
 * - 패스워드 입력 컴포넌트입니다. 우측 아이콘으로 비밀번호 가시성을 토글할 수 있습니다.
 * - `invalid`, `disabled` prop으로 상태를 제어할 수 있습니다.
 * - 토글 버튼은 키보드 접근성과 스크린 리더를 지원합니다.
 */
export function PasswordInput({
  invalid = false,
  required = false,
  disabled = false,
  placeholder = "패스워드를 입력해주세요.",
  ref,
  ...rest
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (!disabled) {
      setIsVisible(!isVisible);
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
