import { useId } from "react";

interface UseHelperTextOptions {
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  externalAriaDescribedBy?: string;
}

export interface UseHelperTextResult {
  helperTextId: string;
  bottomText: string | undefined;
  showBottomText: boolean;
  /** 외부 aria-describedby와 helperTextId를 병합한 값 */
  ariaDescribedBy: string | undefined;
  /** invalid이면서 errorMessage가 있을 때 true — HelperText의 invalid prop으로 전달한다 */
  isError: boolean;
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

  return { helperTextId, bottomText, showBottomText, ariaDescribedBy, isError };
}
