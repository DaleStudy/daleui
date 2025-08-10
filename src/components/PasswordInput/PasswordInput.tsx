import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { cva } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";

/**
 * 패스워드 입력 컨트롤입니다. 우측 아이콘으로 비밀번호 가시성을 토글할 수 있습니다.
 *
 * 접근성 가이드
 * - 토글 버튼은 `aria-label`("패스워드 보기/숨기기")와 `aria-pressed`를 제공합니다.
 */
export interface PasswordInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "type"> {
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 컨트롤 크기 */
  size?: "sm" | "md" | "lg";
  /** 오류 상태 여부 (true면 위험 톤 적용 및 aria-invalid=true) */
  invalid?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      size = "md",
      invalid = false,
      disabled = false,
      placeholder = "패스워드를 입력해주세요.",
      ...rest
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const iconSizeMap = { sm: "sm", md: "md", lg: "lg" } as const;

    const toggleVisibility = () => {
      if (!disabled) {
        setIsVisible(!isVisible);
      }
    };

    return (
      <div>
        <div
          className={containerStyles({
            size,
            state: invalid ? "error" : undefined,
          })}
          data-disabled={disabled ? "" : undefined}
        >
          <input
            ref={ref}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            disabled={disabled}
            className={inputStyles({ size })}
            aria-label="패스워드"
            aria-invalid={invalid ? true : undefined}
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
            <Icon
              name={isVisible ? "eye" : "eyeOff"}
              size={iconSizeMap[size]}
              tone="neutral"
            />
          </button>
        </div>
      </div>
    );
  },
);

const containerStyles = cva({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "334px",
    borderWidth: "md",
    borderStyle: "solid",
    borderRadius: "sm",
    backgroundColor: "white",
    borderColor: "border.neutral",
    padding: "12",
    gap: "8",
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
      borderRadius: "md",
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
    size: {
      sm: { height: "8", paddingX: "12", gap: "8" },
      md: { height: "10", paddingX: "12", gap: "8" },
      lg: { height: "12", paddingX: "12", gap: "8" },
    },
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
  defaultVariants: {
    size: "md",
  },
});

const inputStyles = cva({
  base: {
    flex: "1",
    border: "none",
    outline: "none",
    color: "fg.neutral.default",
    fontSize: "sm",
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
  variants: {
    size: {
      sm: { fontSize: "xs" },
      md: { fontSize: "sm" },
      lg: { fontSize: "md" },
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
