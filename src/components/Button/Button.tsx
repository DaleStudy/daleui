import { type HTMLAttributes } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";
import { hstack } from "../../../styled-system/patterns";
import { type IconName } from "../../tokens/iconography";

type size = "sm" | "md" | "lg";

/** 공통 버튼 속성 */
interface BaseButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "style"> {
  /** 버튼 텍스트 */
  children: string;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 버튼 너비 100% */
  fullWidth?: boolean;
  loading?: boolean;
  /** 좌측 아이콘 */
  leftIcon?: IconName;
  /** 우측 아이콘 */
  rightIcon?: IconName;
  /** 클릭 시 실행함수 */
  onClick?: () => void;
  /** 버튼의 크기 */
  size?: size;
  /** 타입 */
  type?: "button" | "submit" | "reset";
}

export type ButtonProps = BaseButtonProps & {
  variant?: "solid" | "outline" | "ghost";
  tone?: "brand" | "neutral" | "danger";
};

/**
 * - `variant` 속성으로 버튼의 스타일 종류를 지정할 수 있습니다.
 * - `tone` 속성으로 버튼의 색상 강조를 지정할 수 있습니다.
 * - `size` 속성으로 버튼의 크기를 지정할 수 있습니다.
 * - `type` 속성으로 버튼의 타입을 지정할 수 있습니다.
 * - `disabled` 속성을 사용하여 버튼을 비활성화할 수 있습니다.
 * - `loading` 속성을 사용하여 버튼을 로딩 상태로 지정할 수 있습니다.
 */
export const Button = ({
  children,
  variant = "solid",
  disabled,
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  onClick,
  size = "md",
  tone = "brand",
  type = "button",
  ...rest
}: ButtonProps) => {
  const defaultTone = tone ?? (variant === "ghost" ? "neutral" : "brand");

  return (
    <button
      className={styles({
        tone: defaultTone,
        variant,
        size,
        disabled,
        fullWidth,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <div
        className={cx(
          hstack({ gap: "4" }),
          css({ visibility: loading ? "hidden" : "visible" }),
        )}
      >
        {leftIcon && (
          <span className={css({ flexShrink: 0 })}>
            <Icon
              data-testid={`icon-${leftIcon}`}
              name={leftIcon}
              size={size}
            />
          </span>
        )}
        <span
          className={css({
            whiteSpace: "normal",
            wordBreak: "keep-all",
            overflowWrap: "anywhere",
          })}
        >
          {children}
        </span>
        {rightIcon && (
          <span className={css({ flexShrink: 0 })}>
            <Icon
              data-testid={`icon-${rightIcon}`}
              name={rightIcon}
              size={size}
            />
          </span>
        )}
      </div>
      {loading && (
        <div
          className={css({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          })}
        >
          <Icon
            name="loaderCircle"
            size={size}
            data-testid="button-loader"
            className={css({
              animation: "spin 1s linear infinite",
            })}
          />
        </div>
      )}
    </button>
  );
};

const styles = cva({
  base: {
    appearance: "none",
    margin: "0",
    fontWeight: 500,
    textAlign: "center",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    borderRadius: "sm",
    cursor: "pointer",
    transition: "0.2s",
    lineHeight: "1",
    outline: "0",
    position: "relative",
    boxSizing: "border-box",
    "&:disabled": {
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outlineStyle: "solid",
      outlineWidth: "lg",
      outlineOffset: "3px",
    },
  },
  variants: {
    size: {
      sm: {
        px: "8",
        py: "4",
        height: "32px",
        fontSize: "sm",
      },
      md: {
        px: "12",
        py: "4",
        height: "40px",
        fontSize: "md",
      },
      lg: {
        px: "16",
        py: "8",
        height: "48px",
        fontSize: "lg",
      },
    },
    variant: {
      solid: {},
      outline: {},
      ghost: {
        bg: "transparent",
        border: "none",
      },
    },
    tone: {
      brand: {},
      neutral: {},
      danger: {},
    },
    disabled: {
      true: {},
      false: {},
    },
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {},
    },
  },
  compoundVariants: [
    // solid (brand)
    {
      variant: "solid",
      tone: "brand",
      css: {
        bg: "bgSolid.brand",
        color: "fgSolid.brand",
        "&:hover": {
          bg: "bgSolid.brand.hover",
        },
        "&:active": {
          bg: "bgSolid.brand.active",
        },
      },
    },
    // solid(neutral)
    {
      variant: "solid",
      tone: "neutral",
      css: {
        bg: "bgSolid.neutral",
        color: "fgSolid.neutral",
        "&:hover": {
          bg: "bgSolid.neutral.hover",
        },
        "&:active": {
          bg: "bgSolid.neutral.active",
        },
      },
    },
    // solid (danger)
    {
      variant: "solid",
      tone: "danger",
      css: {
        bg: "bgSolid.danger",
        color: "fgSolid.danger",
        "&:hover": {
          bg: "bgSolid.danger.hover",
        },
        "&:active": {
          bg: "bgSolid.danger.active",
        },
      },
    },
    // outline (brand)
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "brand",
        borderWidth: "lg",
        color: "fg.brand",
        "&:hover": {
          color: "fg.brand.hover",
          backgroundColor: "bg.brand.hover",
        },
        "&:active": {
          color: "fg.brand.active",
          backgroundColor: "bg.brand.active",
        },
      },
    },
    // outline (neutral)
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "neutral",
        borderWidth: "lg",
        color: "fg.neutral",
        "&:hover": {
          color: "fg.neutral.hover",
          backgroundColor: "bg.neutral.hover",
        },
        "&:active": {
          color: "fg.neutral.active",
          backgroundColor: "bg.neutral.active",
        },
      },
    },
    // outline (danger)
    {
      variant: "outline",
      tone: "danger",
      css: {
        border: "danger",
        borderWidth: "lg",
        color: "fg.danger",
        "&:hover": {
          color: "fg.danger.hover",
          backgroundColor: "bg.danger.hover",
        },
        "&:active": {
          color: "fg.danger.active",
          backgroundColor: "bg.danger.active",
        },
      },
    },
    {
      variant: "outline",
      size: "sm",
      css: {
        px: "0.4rem",
      },
    },
    {
      variant: "outline",
      size: "md",
      css: {
        px: "0.65rem",
      },
    },
    {
      variant: "outline",
      size: "lg",
      css: {
        px: "0.9rem",
      },
    },
    // ghost
    {
      variant: "ghost",
      tone: "brand",
      css: {
        color: "fg.brand",
        "&:hover": {
          bg: "bg.brand.hover",
          color: "fg.brand.hover",
        },
        "&:active": {
          bg: "bg.brand.active",
          color: "fg.brand.active",
        },
      },
    },
    {
      variant: "ghost",
      tone: "neutral",
      css: {
        color: "fg.neutral",
        "&:hover": {
          bg: "bg.neutral.hover",
          color: "fg.neutral.hover",
        },
        "&:active": {
          bg: "bg.neutral.active",
          color: "fg.neutral.active",
        },
      },
    },
    {
      variant: "ghost",
      tone: "danger",
      css: {
        color: "fg.danger",
        "&:hover": {
          bg: "bg.danger.hover",
          color: "fg.danger.hover",
        },
        "&:active": {
          bg: "bg.danger.active",
          color: "fg.danger.active",
        },
      },
    },
    // disabled
    {
      disabled: true,
      css: {
        bg: "bg.neutral.disabled!",
        color: "fg.neutral.disabled!",
        border: "none!",
      },
    },
    // borders 토큰과 스타일이 달라 별도로 설정
    {
      tone: "brand",
      css: {
        "&:focus-visible": {
          outlineColor: "border.brand.focus",
        },
      },
    },
    {
      tone: "neutral",
      css: {
        "&:focus-visible": {
          outlineColor: "border.neutral.focus",
        },
      },
    },
    {
      tone: "danger",
      css: {
        "&:focus-visible": {
          outlineColor: "border.danger.focus",
        },
      },
    },
  ],
});
