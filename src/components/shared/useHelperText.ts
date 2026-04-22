import { useId } from "react";

interface UseHelperTextOptions {
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  externalAriaDescribedBy?: string;
}

/** 인풋·셀렉트·필드 그룹 루트 등에 spread */
export interface UseHelperTextFieldProps {
  "aria-describedby"?: string;
}

/** HelperText에 spread */
export interface UseHelperTextHelpTextProps {
  id: string;
  invalid: boolean;
}

export interface UseHelperTextResult {
  fieldProps: UseHelperTextFieldProps;
  helpTextProps: UseHelperTextHelpTextProps;
  bottomText: string | undefined;
  showBottomText: boolean;
}

export function useHelperText({
  helperText,
  errorMessage,
  invalid = false,
  externalAriaDescribedBy,
}: UseHelperTextOptions): UseHelperTextResult {
  const id = useId();
  const helperTextId = `${id}-help-text`;
  const showError = invalid && !!errorMessage;
  const bottomText = showError ? errorMessage : helperText;
  const showBottomText = !!bottomText;
  const isError = showError;

  const ariaDescribedBy =
    [externalAriaDescribedBy, showBottomText ? helperTextId : undefined]
      .filter((s): s is string => Boolean(s))
      .join(" ") || undefined;

  const fieldProps: UseHelperTextFieldProps =
    ariaDescribedBy !== undefined
      ? { "aria-describedby": ariaDescribedBy }
      : {};

  const helpTextProps: UseHelperTextHelpTextProps = {
    id: helperTextId,
    invalid: isError,
  };

  return { fieldProps, helpTextProps, bottomText, showBottomText };
}
