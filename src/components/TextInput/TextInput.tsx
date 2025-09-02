import { type ComponentPropsWithoutRef, type Ref } from "react";
import { cva, cx } from "../../../styled-system/css";
import { Icon, type IconProps } from "../Icon/Icon";
export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 오류 상태 여부 (true일 경우 danger 색상으로 표시됩니다) */
  invalid?: boolean;
  /** 앞쪽 아이콘 이름 (아이콘 컴포넌트의 name 속성에 해당) */
  leadingIcon?: IconProps["name"];
  /** 뒤쪽 아이콘 이름 (아이콘 컴포넌트의 name 속성에 해당) */
  trailingIcon?: IconProps["name"];
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  id?: string;
  /** DOM 요소 참조 */
  ref?: Ref<HTMLInputElement>;
}

/**
 * - 사용자가 텍스트를 입력할 수 있는 기본적인 입력 필드 컴포넌트입니다.
 * - `leadingIcon`과 `trailingIcon` prop을 통해 아이콘을 앞뒤에 추가할 수 있습니다.
 * - `disabled` prop으로 비활성화 상태를 제어할 수 있으며, `state` prop을 통해 'error'와 같은 특정 상태를 표현할 수 있습니다.
 */
export function TextInput({
  size,
  invalid,
  className,
  leadingIcon,
  trailingIcon,
  disabled,
  ref,
  ...rest
}: TextInputProps) {
  const renderIcon = (name: IconProps["name"]) => {
    let tone: IconProps["tone"];

    if (disabled) {
      tone = "neutral";
    } else if (invalid) {
      tone = "danger";
    }

    return (
      <Icon name={name} size={size} tone={tone} data-testid={`icon-${name}`} />
    );
  };

  return (
    <div
      className={cx(wrapperStyles({ size, invalid }), className)}
      data-disabled={disabled ? "" : undefined}
    >
      {leadingIcon && renderIcon(leadingIcon)}
      <input
        className={inputStyles()}
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid ? true : undefined}
        {...rest}
      />
      {trailingIcon && renderIcon(trailingIcon)}
    </div>
  );
}

const wrapperStyles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8",
    width: "100%",
    position: "relative",
    border: "neutral",
    borderWidth: "md",
    borderRadius: "sm",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "appBg",

    "&:has(input:disabled)": {
      cursor: "not-allowed",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },
  },
  variants: {
    size: {
      sm: { h: "40px", px: "16", fontSize: "sm" },
      md: { h: "48px", px: "12", fontSize: "md" },
      lg: { h: "56px", px: "24", fontSize: "lg" },
    },
    invalid: {
      true: {
        border: "danger",
        "&:focus-within": { borderColor: "border.danger", boxShadow: "none" },
      },
      false: {
        "&:hover": {
          borderColor: "border.neutral.hover",
        },
        "&:active": {
          borderColor: "border.neutral.active",
        },
        "&:focus-within": {
          borderColor: "border.brand.focus",
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
