import React, { ReactNode, HTMLAttributes, forwardRef } from "react";
import { css, cva } from "../../../styled-system/css";
import ClipLoader from "react-spinners/ClipLoader";
import { SystemStyleObject } from "@pandacss/types";

type ButtonVariant =
  | "solid"
  | "outline"
  | "outlineGradient"
  | "default"
  | "accent"
  | "danger"
  | "warning";

type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "style"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  customStyle?: SystemStyleObject;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "medium",
      disabled = false,
      icon,
      loading = false,
      onClick,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={css(
          {
            cursor: "pointer",
            borderRadius: "md",
            fontWeight: "semibold",
            whiteSpace: "nowrap",
            transition:
              "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out",
            fontFamily: "body",
          },
          styles.raw({ variant, size }), // Apply styles here
          css.raw({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          })
        )}
        disabled={disabled || loading}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      >
        {loading ? <ClipLoader size="sm" /> : null}
        {icon && !loading ? icon : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

const styles = cva({
  variants: {
    variant: {
      default: {
        backgroundColor: "bg.DEFAULT",
        color: "text.DEFAULT",
        "&:hover": {
          backgroundColor: "bg.hover",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          backgroundColor: "bg.active",
        },
        "&:disabled": {
          backgroundColor: "bg.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
        },
      },
      solid: {
        backgroundColor: "solid.DEFAULT",
        color: "text.contrast",
        "&:hover": {
          backgroundColor: "solid.hover",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          backgroundColor: "solid.DEFAULT",
        },
        "&:disabled": {
          backgroundColor: "bg.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
        },
      },
      outline: {
        backgroundColor: "transparent",
        border: "2px solid",
        borderColor: "border.DEFAULT",
        color: "text.DEFAULT",
        "&:hover": {
          backgroundColor: "bg.hover",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          backgroundColor: "bg.active",
        },
        "&:disabled": {
          borderColor: "border.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
        },
      },
      outlineGradient: {
        backgroundColor: "transparent",
        border: "2px solid",
        borderColor: "teal.7", // Using the teal color for now because no specific gradient color defined in tokens for border yet.
        color: "teal.7",
        background: "linear-gradient(to right, teal.7, teal.9)",
        backgroundClip: "text",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "&:hover": {
          borderColor: "teal.9",
          color: "teal.9",
          background: "linear-gradient(to right, teal.9, teal.7)",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          background: "linear-gradient(to right, teal.7, teal.9)",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        "&:disabled": {
          borderColor: "border.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
          background: "none",
          "-webkit-text-fill-color": "text.disabled",
        },
      },
      accent: {
        backgroundColor: "bg.accent",
        color: "text.contrast",
        "&:hover": {
          backgroundColor: "bg.hover.accent",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          backgroundColor: "bg.active.accent",
        },
        "&:disabled": {
          backgroundColor: "bg.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
        },
      },
      danger: {
        backgroundColor: "bg.danger",
        color: "text.contrast",
        "&:hover": {
          backgroundColor: "bg.hover.danger",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          backgroundColor: "bg.active.danger",
        },
        "&:disabled": {
          backgroundColor: "bg.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
        },
      },
      warning: {
        backgroundColor: "bg.warning",
        color: "text.contrast",
        "&:hover": {
          backgroundColor: "bg.hover.warning",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "focus",
          outlineOffset: "2px",
        },
        "&:active": {
          backgroundColor: "bg.active.warning",
        },
        "&:disabled": {
          backgroundColor: "bg.disabled",
          color: "text.disabled",
          cursor: "not-allowed",
        },
      },
    },
    size: {
      small: {
        fontSize: "sm",
        padding: "0.5rem 1rem",
      },
      medium: {
        fontSize: "md",
        padding: "0.75rem 1.5rem",
      },
      large: {
        fontSize: "lg",
        padding: "1rem 2rem",
      },
    },
  },
});
