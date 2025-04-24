import { type AnchorHTMLAttributes, type PropsWithChildren } from "react";
import type { Tone } from "../../tokens/colors";
import { css, cva } from "../../../styled-system/css";
import type { FontSize, FontWeight } from "../../tokens/typography";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: FontSize;
  /** 굵기 */
  weight?: FontWeight;
  /** 명암비 낮출지 */
  muted?: boolean;
  /** 링크에 밑줄 표시 여부 */
  underline?: boolean;
}

/**
 * - `underline` 속성으로 밑줄 표시 여부를 설정할 수 있습니다. 기본값은 `true`입니다.
 * - `target="_blank"`를 사용할 때는 자동으로 보안 속성이 추가됩니다.
 * - `tone` 속성을 통해서 링크의 색상을 변경할 수 있습니다. 기본값은 `neutral`입니다.
 * - `size` 속성과 `weight` 속성을 통해서 텍스트 스타일을 변경할 수 있습니다.
 * - `muted` 속성을 주시면 글자색이 옅어집니다. 명암비가 낮아지므로 접근성 측면에서 주의해서 사용하세요. 기본값은 `false`입니다.
 */
export function Link({
  children,
  tone = "neutral",
  size,
  weight,
  muted = false,
  underline = true,
  target,
  rel,
  onClick,
  ...props
}: PropsWithChildren<LinkProps>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" && props.href) {
      if (onClick) {
        onClick({} as React.MouseEvent<HTMLAnchorElement>);
      } else {
        window.location.href = props.href;
      }
    }
  };

  return (
    <a
      className={css(
        styles.raw({ tone, muted, underline }),
        css.raw({
          fontSize: size,
          fontWeight: weight,
        })
      )}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : rel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </a>
  );
}

const styles = cva({
  base: {
    transition: "colors 0.2s",
  },
  variants: {
    tone: {
      neutral: {},
      accent: {},
      danger: {},
      warning: {},
    },
    muted: {
      true: {},
      false: {},
    },
    underline: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      tone: "neutral",
      muted: false,
      css: {
        color: "text",
        "&:active, &:hover": {
          color: "text.muted",
        },
      },
    },
    {
      tone: "accent",
      muted: false,
      css: {
        color: "text.accent",
        "&:active, &:hover": {
          color: "text.muted.accent",
        },
      },
    },
    {
      tone: "danger",
      muted: false,
      css: {
        color: "text.danger",
        "&:active, &:hover": {
          color: "text.muted.danger",
        },
      },
    },
    {
      tone: "warning",
      muted: false,
      css: {
        color: "text.warning",
        "&:active, &:hover": {
          color: "text.muted.warning",
        },
      },
    },
    {
      tone: "neutral",
      muted: true,
      css: {
        color: "text.muted",
        "&:active, &:hover": {
          color: "text",
        },
      },
    },
    {
      tone: "accent",
      muted: true,
      css: {
        color: "text.muted.accent",
        "&:active, &:hover": {
          color: "text.accent",
        },
      },
    },
    {
      tone: "danger",
      muted: true,
      css: {
        color: "text.muted.danger",
        "&:active, &:hover": {
          color: "text.danger",
        },
      },
    },
    {
      tone: "warning",
      muted: true,
      css: {
        color: "text.muted.warning",
        "&:active, &:hover": {
          color: "text.warning",
        },
      },
    },
    {
      underline: true,
      css: {
        textDecoration: "underline",
      },
    },
    {
      underline: false,
      css: {
        textDecoration: "none",
      },
    },
  ],
  defaultVariants: {
    tone: "neutral",
    muted: false,
    underline: true,
  },
});
