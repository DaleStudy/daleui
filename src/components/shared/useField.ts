import { useId } from "react";

interface UseFieldOptions {
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  externalAriaDescribedBy?: string;
}

/** 단일 필드 요소(input·select·체크박스 hidden input)에 spread */
export interface UseFieldFieldProps {
  "aria-describedby"?: string;
  "aria-invalid": boolean;
  "aria-required": boolean;
}

/** HelperText에 spread */
export interface UseFieldHelpTextProps {
  id: string;
  invalid: boolean;
}

export interface UseFieldResult {
  fieldProps: UseFieldFieldProps;
  helpTextProps: UseFieldHelpTextProps;
  bottomText: string | undefined;
  showBottomText: boolean;
  /** disabled 그대로 */
  isDisabled: boolean;
  /** readOnly && !disabled (disabled 우선) */
  isReadOnly: boolean;
}

export function useField({
  helperText,
  errorMessage,
  invalid = false,
  disabled = false,
  readOnly = false,
  required = false,
  externalAriaDescribedBy,
}: UseFieldOptions): UseFieldResult {
  const id = useId();
  const helperTextId = `${id}-help-text`;
  const showError = invalid && !!errorMessage;
  const bottomText = showError ? errorMessage : helperText;
  const showBottomText = !!bottomText;
  const isError = showError;

  const isDisabled = disabled;
  const isReadOnly = readOnly && !disabled;

  if (import.meta.env.DEV && disabled && readOnly) {
    console.warn(
      "[daleui] `disabled`와 `readOnly`가 동시에 설정되었습니다. `disabled`가 우선 적용됩니다.",
    );
  }

  const ariaDescribedBy =
    [externalAriaDescribedBy, showBottomText ? helperTextId : undefined]
      .filter((s): s is string => Boolean(s))
      .join(" ") || undefined;

  const fieldProps: UseFieldFieldProps = {
    "aria-invalid": invalid,
    "aria-required": required,
    ...(ariaDescribedBy !== undefined
      ? { "aria-describedby": ariaDescribedBy }
      : {}),
  };

  const helpTextProps: UseFieldHelpTextProps = {
    id: helperTextId,
    invalid: isError,
  };

  return {
    fieldProps,
    helpTextProps,
    bottomText,
    showBottomText,
    isDisabled,
    isReadOnly,
  };
}
