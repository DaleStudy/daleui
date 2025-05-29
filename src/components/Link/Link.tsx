import { type AnchorHTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import type { FontSize, FontWeight } from "../../tokens/typography";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 링크 URL (필수) */
  href: string;
  /** 링크 내용 (필수) */
  children: React.ReactNode;
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
  href,
  tone = "neutral",
  size,
  weight,
  muted = false,
  underline = true,
  target,
  rel,
  ...props
}: LinkProps) {
  return (
    <a
      className={css(
        styles.raw({ tone, muted, underline }),
        css.raw({
          fontSize: size,
          fontWeight: weight,
        }),
      )}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : rel}
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
        color: "foreground.default.tertiary",
        "&:active, &:hover": {
          color: "foreground.default.secondary",
        },
      },
    },
    {
      tone: "accent",
      muted: false,
      css: {
        color: "accent.brand",
        "&:active, &:hover": {
          color: "accent.brand",
        },
      },
    },
    {
      tone: "danger",
      muted: false,
      css: {
        color: "system.danger",
        "&:active, &:hover": {
          color: "system.danger",
        },
      },
    },
    {
      tone: "warning",
      muted: false,
      css: {
        color: "system.warning",
        "&:active, &:hover": {
          color: "system.warning",
        },
      },
    },
    {
      tone: "neutral",
      muted: true,
      css: {
        color: "foreground.default.disabled",
        "&:active, &:hover": {
          color: "foreground.default.tertiary",
        },
      },
    },
    {
      tone: "accent",
      muted: true,
      css: {
        color: "foreground.default.disabled",
        "&:active, &:hover": {
          color: "accent.brand",
        },
      },
    },
    {
      tone: "danger",
      muted: true,
      css: {
        color: "foreground.default.disabled",
        "&:active, &:hover": {
          color: "system.danger",
        },
      },
    },
    {
      tone: "warning",
      muted: true,
      css: {
        color: "foreground.default.disabled",
        "&:active, &:hover": {
          color: "system.warning",
        },
      },
    },
    {
      underline: true,
      css: {
        textDecoration: "underline",
        color: "foreground.default.tertiary",
      },
    },
    {
      underline: false,
      css: {
        textDecoration: "none",
        color: "foreground.default.tertiary",
      },
    },
  ],
  defaultVariants: {
    tone: "neutral",
    muted: false,
    underline: true,
  },
});
