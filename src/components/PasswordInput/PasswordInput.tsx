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
    width: "334px", // Fixed width from design
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "sm",
    backgroundColor: "bg.surface",
    transition: "all 0.2s ease-in-out",
  },
  variants: {
    size: {
      sm: { height: "8", paddingX: "3", gap: "2" },
      md: { height: "10", paddingX: "3", gap: "2" },
      lg: { height: "12", paddingX: "4", gap: "3" },
    },
    tone: {
      brand: { borderColor: "border.brand.default" },
      neutral: { borderColor: "border.neutral.default" },
      success: { borderColor: "border.success.default" },
      warning: { borderColor: "border.warning.default" },
      danger: { borderColor: "border.danger.default" },
      info: { borderColor: "border.info.default" },
    },
    disabled: {
      true: {
        opacity: "0.5",
        cursor: "not-allowed",
        backgroundColor: "bg.disabled",
      },
    },
  },
  defaultVariants: {
    size: "md",
    tone: "neutral",
  },
});

const inputStyles = cva({
  base: {
    flex: "1",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "fg.neutral.placeholder",
    fontSize: "sm",
    lineHeight: "tight",
    "&::placeholder": {
      color: "fg.neutral.placeholder",
    },
    "&:disabled": {
      cursor: "not-allowed",
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