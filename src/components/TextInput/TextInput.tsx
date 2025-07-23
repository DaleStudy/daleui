import {
  cloneElement,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { cva, cx } from "../../../styled-system/css";
import type { IconProps } from "../Icon/Icon";

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 오류 상태 여부 (true일 경우 danger 색상으로 표시됩니다) */
  isInvalid?: boolean;
  /** 앞쪽 아이콘 */
  leadingIcon?: ReactElement<IconProps>;
  /** 뒤쪽 아이콘 */
  trailingIcon?: ReactElement<IconProps>;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
}

/**
 * - 사용자가 텍스트를 입력할 수 있는 기본적인 입력 필드 컴포넌트입니다.
 * - `leadingIcon`과 `trailingIcon` prop을 통해 아이콘을 앞뒤에 추가할 수 있습니다.
 * - `disabled` prop으로 비활성화 상태를 제어할 수 있으며, `state` prop을 통해 'error'와 같은 특정 상태를 표현할 수 있습니다.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size,
      isInvalid,
      className,
      leadingIcon,
      trailingIcon,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const renderIcon = (icon: ReactElement<IconProps>) => {
      const newProps: Partial<IconProps> = {
        size,
      };

      if (disabled) {
        newProps.tone = "neutral";
      } else if (isInvalid) {
        newProps.tone = "danger";
      }

      return cloneElement(icon, {
        ...icon.props,
        ...newProps,
      });
    };

    return (
      <div
        className={cx(
          wrapperStyles({ size, state: isInvalid ? "error" : undefined }),
          className,
        )}
        data-disabled={disabled ? "" : undefined}
      >
        {leadingIcon && renderIcon(leadingIcon)}
        <input
          className={inputStyles()}
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          {...rest}
        />
        {trailingIcon && renderIcon(trailingIcon)}
      </div>
    );
  },
);

const wrapperStyles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8",
    width: "100%",
    position: "relative",
    border: "neutral",
    borderRadius: "md",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "appBg",

    "&:hover": {
      borderColor: "border.neutral.hover",
    },
    "&:active": {
      borderColor: "border.neutral.active",
    },
    "&:focus-within": {
      borderColor: "border.brand.focus",
    },
    "&:has(input:disabled)": {
      cursor: "not-allowed",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },
  },
  variants: {
    size: {
      sm: { h: "40px", px: "16", fontSize: "sm" },
      md: { h: "48px", px: "20", fontSize: "md" },
      lg: { h: "56px", px: "24", fontSize: "lg" },
    },
    state: {
      error: {
        border: "danger",
        "&:focus-within": { borderColor: "border.danger", boxShadow: "none" },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const inputStyles = cva({
  base: {
    width: "100%",
    height: "100%",
    flex: "1",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: "fg.neutral",
    fontFamily: "inherit",
    "&::placeholder": {
      color: "fg.neutral.placeholder",
    },
    "&[disabled]": {
      color: "fg.neutral.disabled",
      cursor: "not-allowed",
    },
  },
});
