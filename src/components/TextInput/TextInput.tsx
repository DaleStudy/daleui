import { type ComponentPropsWithoutRef, type Ref } from "react";
import { cva, cx } from "../../../styled-system/css";
import type { FieldProps } from "../shared/types";
import { Icon, type IconProps } from "../Icon/Icon";
export interface TextInputProps
  extends
    Omit<
      ComponentPropsWithoutRef<"input">,
      "size" | "value" | "defaultValue" | "onChange" | "disabled" | "required"
      // TODO: readOnly도 Omit 대상 (#935)
    >,
    FieldProps {
  /** 선행 아이콘 이름 (Icon.name) */
  leadingIcon?: IconProps["name"];
  /** 후행 아이콘 이름 (Icon.name) */
  trailingIcon?: IconProps["name"];
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
 * 텍스트 인풋은 사용자가 이름, 이메일, 검색어 등 텍스트 정보를 직접 입력할 수 있도록 제공되는 입력 컴포넌트입니다.
 */
export function TextInput({
  invalid = false,
  required = false,
  disabled = false,
  className,
  leadingIcon,
  trailingIcon,
  value,
  defaultValue,
  onChange,
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
      <Icon name={name} size="md" tone={tone} data-testid={`icon-${name}`} />
    );
  };

  return (
    <div
      className={cx(wrapperStyles({ invalid }), className)}
      data-disabled={disabled ? "" : undefined}
    >
      {leadingIcon && renderIcon(leadingIcon)}
      <input
        className={inputStyles()}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={invalid}
        aria-required={required}
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
    height: "12",
    paddingX: "12",
    fontSize: "md",
    position: "relative",
    border: "neutral",
    borderWidth: "md",
    borderRadius: "sm",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "appBg",

    "&:focus-within": {
      outlineStyle: "solid",
      outlineWidth: "lg",
      outlineOffset: "2px",
      borderRadius: "md",
      outlineColor: "border.brand.focus",
    },

    "&:has(input:disabled)": {
      cursor: "not-allowed",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },
  },
  variants: {
    invalid: {
      true: {
        border: "danger",
      },
      false: {
        "&:hover": {
          borderColor: "border.neutral.hover",
        },
        "&:active": {
          borderColor: "border.neutral.active",
        },
      },
    },
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
