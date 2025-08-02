import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { cva } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";
import type { Tone } from "../../tokens/colors";

type PasswordInputSize = "sm" | "md" | "lg";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  tone?: Tone;
  size?: PasswordInputSize;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
}

export const PasswordInput = ({
  tone = "neutral",
  size = "md",
  disabled = false,
  placeholder = "패스워드를 입력해주세요.",
  ...rest
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (!disabled) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div className={containerStyles({ size, tone, disabled })}>
      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        className={inputStyles({ size })}
        {...rest}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={disabled}
        className={iconButtonStyles({ disabled })}
        aria-label={isVisible ? "패스워드 숨기기" : "패스워드 보기"}
      >
        <Icon name={isVisible ? "eyeOff" : "eye"} size="sm" tone="neutral" />
      </button>
    </div>
  );
};

const containerStyles = cva({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "334px",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderRadius: "sm",
    backgroundColor: "white",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "#788D98",
    },
    "&:active": {
      borderColor: "#5D727D",
    },
    "&:focus-within": {
      borderWidth: "2px",
      borderColor: "#481ACF",
      outline: "2px solid #481ACF",
      outlineOffset: "1px",
    },
  },
  variants: {
    size: {
      sm: { height: "8", paddingX: "3", gap: "2" },
      md: { height: "10", paddingX: "3", gap: "2" },
      lg: { height: "12", paddingX: "4", gap: "3" },
    },
    tone: {
      brand: { borderColor: "border.brand.default" },
      neutral: { borderColor: "#A4B4BC" },
      success: { borderColor: "border.success.default" },
      warning: { borderColor: "border.warning.default" },
      danger: { borderColor: "#E43F44" },
      info: { borderColor: "border.info.default" },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        backgroundColor: "bg.neutral.disabled",
        borderColor: "border.neutral.disabled",
        color: "fg.neutral.disabled",
        "&:hover": {
          borderColor: "border.neutral.hover",
        },
        "&:active": {
          borderColor: "border.neutral.active",
        },
      },
    },
  },
  compoundVariants: [
    {
      tone: "danger",
      disabled: false,
      css: {
        "&:hover": {
          borderColor: "#E43F44",
        },
        "&:active": {
          borderColor: "#E43F44",
        },
      },
    },
    {
      tone: "brand",
      disabled: false,
      css: {
        "&:hover": {
          borderColor: "border.brand.default",
        },
        "&:active": {
          borderColor: "border.brand.default",
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    tone: "neutral",
    disabled: false,
  },
});

const inputStyles = cva({
  base: {
    flex: "1",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "fg.neutral.default",
    fontSize: "sm",
    lineHeight: "tight",
    "&::placeholder": {
      color: "fg.neutral.placeholder",
    },
    "&:disabled": {
      cursor: "not-allowed",
      color: "fg.neutral.disabled",
      "&::placeholder": {
        color: "fg.neutral.disabled",
      },
    },
  },
  variants: {
    size: {
      sm: { fontSize: "xs" },
      md: { fontSize: "sm" },
      lg: { fontSize: "md" },
    },
  },
});

const iconButtonStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: "1",
    borderRadius: "xs",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "bg.neutral.hover",
    },
    "&:active": {
      backgroundColor: "bg.neutral.active",
    },
  },
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  },
}); 