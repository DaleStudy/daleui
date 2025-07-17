import {
  cloneElement,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { cva, cx } from "../../../styled-system/css";
import type { IconProps } from "../Icon/Icon";
import type { Tone } from "../../tokens/colors";

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
      boxShadow: "0 0 0 3px token(colors.bg.brand)",
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

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  size?: "sm" | "md" | "lg";
  state?: "error";
  leadingIcon?: ReactElement<IconProps>;
  trailingIcon?: ReactElement<IconProps>;
}

// TextInput의 state를 Icon의 tone으로 매핑하는 객체
const stateToToneMap: Record<NonNullable<TextInputProps["state"]>, Tone> = {
  error: "danger",
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { size, state, className, leadingIcon, trailingIcon, disabled, ...rest },
    ref,
  ) => {
    const renderIcon = (icon: ReactElement<IconProps>) => {
      const newProps: Partial<IconProps> = {};

      if (disabled) {
        newProps.muted = true;
      } else if (state) {
        newProps.tone = stateToToneMap[state];
      }

      return cloneElement(icon, {
        ...icon.props,
        ...newProps,
      });
    };

    return (
      <div
        className={cx(wrapperStyles({ size, state }), className)}
        data-disabled={disabled ? "" : undefined}
      >
        {leadingIcon && renderIcon(leadingIcon)}
        <input
          className={inputStyles()}
          ref={ref}
          disabled={disabled}
          aria-invalid={state === "error" ? true : undefined}
          {...rest}
        />
        {trailingIcon && renderIcon(trailingIcon)}
      </div>
    );
  },
);
