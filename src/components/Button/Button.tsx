import { type HTMLAttributes, type Ref } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";
import { hstack } from "../../../styled-system/patterns";

type size = "sm" | "md" | "lg";

/** 공통 버튼 속성 */
export interface ButtonProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "style"
> {
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 전체 너비 여부 */
  fullWidth?: boolean;
  /** 로딩 표시 여부 */
  loading?: boolean;
  /** 크기 */
  size?: size;
  /** 색조 */
  tone?: "brand" | "neutral" | "danger";
  /** 네이티브 button 타입 */
  type?: "button" | "submit" | "reset";
  /** 스타일 변형 */
  variant?: "solid" | "outline" | "ghost";
  /** 요소 참조 */
  ref?: Ref<HTMLButtonElement>;
}

/**
 * 버튼은 사용자의 명확한 작업 실행을 위해 사용되는 컴포넌트로, 완료, 저장, 제출과 같은 액션에 사용합니다.
 */
export const Button = ({
  ref,
  className,
  children,
  variant = "solid",
  fullWidth,
  loading,
  size = "md",
  tone = "brand",
  type = "button",
  ...rest
}: ButtonProps) => {
  const defaultTone = tone ?? (variant === "ghost" ? "neutral" : "brand");

  return (
    <button
      ref={ref}
      type={type}
      {...rest}
      className={cx(
        styles({
          tone: defaultTone,
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
    >
      <div
        className={cx(
          hstack({ gap: "4" }),
          css({
            visibility: loading ? "hidden" : "visible",
            whiteSpace: "normal",
            wordBreak: "keep-all",
            overflowWrap: "anywhere",
          }),
        )}
      >
        {children}
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
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "0.2s",
    lineHeight: "1",
    outline: "0",
    position: "relative",
    boxSizing: "border-box",
    "&:disabled, &:disabled:hover": {
      cursor: "not-allowed",
      bg: "bg.neutral.disabled",
      color: "fg.neutral.disabled",
      border: "none",
    },
    "&:focus-visible": {
      outlineStyle: "solid",
      outlineWidth: "sm",
      outlineOffset: "3px",
    },
    // 버튼 내부의 아이콘이 텍스트보다 클 때 아이콘이 텍스트를 침범하는 것을 방지
    "& > svg": {
      maxBlockSize: "100%",
      flexShrink: 0,
    },
  },
  variants: {
    size: {
      sm: {
        px: "12",
        py: "8",
        lineHeight: "1rem",
        fontSize: "sm",
      },
      md: {
        px: "12",
        py: "0.625rem",
        lineHeight: "1.25rem",
        fontSize: "md",
      },
      lg: {
        px: "20",
        py: "12",
        lineHeight: "1.5rem",
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
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {},
    },
  },
  compoundVariants: [
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
    {
      variant: "outline",
      tone: "brand",
      css: {
        border: "brand",
        borderWidth: "sm",
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
    {
      variant: "outline",
      tone: "neutral",
      css: {
        border: "neutral",
        borderWidth: "sm",
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
    {
      variant: "outline",
      tone: "danger",
      css: {
        border: "danger",
        borderWidth: "sm",
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
        px: "calc(0.75rem - 1px)",
        py: "calc(0.5rem - 1px)",
      },
    },
    {
      variant: "outline",
      size: "md",
      css: {
        px: "calc(1rem - 1px)",
        py: "calc(0.625rem - 1px)",
      },
    },
    {
      variant: "outline",
      size: "lg",
      css: {
        px: "calc(1.25rem - 1px)",
        py: "calc(0.75rem - 1px)",
      },
    },
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
          outlineColor: "border.danger",
        },
      },
    },
  ],
});
