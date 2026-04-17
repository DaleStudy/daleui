import { cva } from "../../../styled-system/css";

interface HelperTextProps {
  id: string;
  children?: string;
  /** true이면 위험 색조(danger)로 표시 */
  invalid?: boolean;
  disabled?: boolean;
}

export function HelperText({
  id,
  children,
  invalid = false,
  disabled = false,
}: HelperTextProps) {
  return (
    <div id={id} className={helperTextStyles({ invalid, disabled })}>
      {children}
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
