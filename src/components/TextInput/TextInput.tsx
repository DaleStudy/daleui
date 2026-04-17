import { type ComponentPropsWithoutRef, type Ref, useId } from "react";
import { css, cva, cx } from "../../../styled-system/css";
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
  /** 필드 하단 도움말·검증 메시지 */
  helperText?: string;
  /** 오류 메시지 (helperText보다 우선 표시되며 항상 위험 색조 스타일을 사용한다) */
  errorMessage?: string;
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
  helperText,
  errorMessage,
  id: idProp,
  "aria-describedby": ariaDescribedByProp,
  ...rest
}: TextInputProps) {
  const reactId = useId();
  const inputId = idProp ?? reactId;
  const helperTextId = `${reactId}-help-text`;
  const bottomText = errorMessage || helperText;
  const showBottomText = !!bottomText;

  const ariaDescribedBy = [
    ariaDescribedByProp,
    showBottomText ? helperTextId : undefined,
  ]
    .filter((segment): segment is string => Boolean(segment))
    .join(" ");

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
    <div className={css({ width: "100%" })}>
      <div
        className={cx(fieldStyles({ invalid }), className)}
        data-disabled={disabled ? "" : undefined}
      >
        {leadingIcon && renderIcon(leadingIcon)}
        <input
          id={inputId}
          className={inputStyles()}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={invalid}
          aria-required={required}
          aria-describedby={ariaDescribedBy || undefined}
          {...rest}
        />
        {trailingIcon && renderIcon(trailingIcon)}
      </div>
      {showBottomText && (
        <div
          id={helperTextId}
          className={helperTextStyles({
            invalid: invalid && !!errorMessage,
            disabled,
          })}
        >
          {bottomText}
        </div>
      )}
    </div>
  );
}

const helperTextStyles = cva({
  base: {
    marginTop: "6px",
    textStyle: "body.sm",
  },
  variants: {
    invalid: {
      true: {
        color: "fg.danger",
      },
      false: {
        color: "fg.neutral",
      },
    },
    disabled: {
      true: {
        color: "!fg.neutral.disabled",
      },
      false: {},
    },
  },
});

const fieldStyles = cva({
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
