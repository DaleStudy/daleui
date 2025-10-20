import { type HTMLAttributes } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";
import { hstack } from "../../../styled-system/patterns";
import { type IconName } from "../../tokens/iconography";

type size = "sm" | "md" | "lg";

/** 공통 버튼 속성 */
interface BaseButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "style"> {
  /** 텍스트 */
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

/** Solid 버튼 속성 (brand tone만 지원) */
type SolidButtonProps = BaseButtonProps & {
  variant?: "solid";
  tone?: "brand";
};

/** Outline 버튼 속성 (brand tone만 지원) */
type OutlineButtonProps = BaseButtonProps & {
  variant: "outline";
  tone?: "brand";
};

/** Ghost 버튼 속성 (neutral, danger tone 지원) */
type GhostButtonProps = BaseButtonProps & {
  variant: "ghost";
  tone?: "neutral" | "danger";
};

export type ButtonProps =
  | SolidButtonProps
  | OutlineButtonProps
  | GhostButtonProps;

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
  tone,
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
          hstack({ gap: "8" }),
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
    borderRadius: "md",
    cursor: "pointer",
    transition: "0.2s",
    lineHeight: "1",
    outline: "0",
    position: "relative",
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
        px: "24",
        py: "8",
        fontSize: "sm",
      },
      md: {
        px: "32",
        py: "12",
        fontSize: "md",
      },
      lg: {
        px: "40",
        py: "16",
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
    // solid (brand만 지원)
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
    // outline (brand만 지원)
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "brand",
        borderWidth: "lg",
        color: "fg.brand",
        "&:hover": {
          color: "fg.brand.hover",
        },
        "&:active": {
          color: "fg.brand.active",
          borderColor: "border.brand.active",
        },
      },
    },
    // ghost (neutral, danger만 지원)
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
