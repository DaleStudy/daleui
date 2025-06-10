import { type AnchorHTMLAttributes } from "react";
import type { Tone } from "../../tokens/colors";
import { css, cva } from "../../../styled-system/css";
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
 * - `size` 속성을 통해서 텍스트 크기를 변경할 수 있습니다. 기본값으로 `md`를 사용합니다.
 * - `weight` 속성을 통해서 텍스트 굵기를 변경할 수 있습니다. 기본값으로 `normal`을 사용합니다.
 * - `muted` 속성을 주시면 글자색이 옅어집니다. 명암비가 낮아지므로 접근성 측면에서 주의해서 사용하세요. 기본값은 `false`입니다.
 */
export function Link({
  children,
  href,
  tone = "neutral",
  size = "md",
  weight = "normal",
  muted = false,
  underline = true,
  target,
  rel,
  ...props
}: LinkProps) {
  const computedRel = target === "_blank" ? "noopener noreferrer" : rel;
  return (
    <a
      className={css(
        style.raw({ tone, muted, underline, weight, size }),
        css.raw({
          fontSize: size,
          fontWeight: weight,
        }),
      )}
      href={href}
      target={target}
      rel={computedRel}
      {...props}
    >
      {children}
    </a>
  );
}

const style = cva({
  base: {
    transition: "colors 1s",
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
    weight: {
      thin: {},
      light: {},
      normal: {},
      medium: {},
      bold: {},
    },
    size: {
      "2xs": {},
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      "2xl": {},
      "3xl": {},
      "4xl": {},
      "5xl": {},
      "6xl": {},
      "7xl": {},
      "8xl": {},
      "9xl": {},
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
        textDecorationColor: "currentColor",
      },
    },
    {
      underline: false,
      css: {
        textDecoration: "none",
      },
    },
    {
      underline: true,
      size: "2xs",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "1.5px" },
    },
    {
      underline: true,
      size: "2xs",
      weight: "light",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "1.5px" },
    },
    {
      underline: true,
      size: "2xs",
      weight: "normal",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2px" },
    },
    {
      underline: true,
      size: "2xs",
      weight: "medium",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2px" },
    },
    {
      underline: true,
      size: "2xs",
      weight: "bold",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2.5px" },
    },
    {
      underline: true,
      size: "xs",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2px" },
    },
    {
      underline: true,
      size: "xs",
      weight: "light",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2px" },
    },
    {
      underline: true,
      size: "xs",
      weight: "normal",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2.5px" },
    },
    {
      underline: true,
      size: "xs",
      weight: "medium",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2.5px" },
    },
    {
      underline: true,
      size: "xs",
      weight: "bold",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "3px" },
    },
    {
      underline: true,
      size: "sm",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2px" },
    },
    {
      underline: true,
      size: "sm",
      weight: "light",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2.5px" },
    },
    {
      underline: true,
      size: "sm",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "2.5px" },
    },
    {
      underline: true,
      size: "sm",
      weight: "medium",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "3px" },
    },
    {
      underline: true,
      size: "sm",
      weight: "bold",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "3px" },
    },
    {
      underline: true,
      size: "md",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "2.5px" },
    },
    {
      underline: true,
      size: "md",
      weight: "light",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "3px" },
    },
    {
      underline: true,
      size: "md",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "3px" },
    },
    {
      underline: true,
      size: "md",
      weight: "medium",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "3.5px" },
    },
    {
      underline: true,
      size: "md",
      weight: "bold",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4px" },
    },
    {
      underline: true,
      size: "lg",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "3px" },
    },
    {
      underline: true,
      size: "lg",
      weight: "light",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "3.5px" },
    },
    {
      underline: true,
      size: "lg",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4px" },
    },
    {
      underline: true,
      size: "lg",
      weight: "medium",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4px" },
    },
    {
      underline: true,
      size: "lg",
      weight: "bold",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4.5px" },
    },
    {
      underline: true,
      size: "xl",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "3.5px" },
    },
    {
      underline: true,
      size: "xl",
      weight: "light",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4px" },
    },
    {
      underline: true,
      size: "xl",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4.5px" },
    },
    {
      underline: true,
      size: "xl",
      weight: "medium",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "5px" },
    },
    {
      underline: true,
      size: "xl",
      weight: "bold",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "5.5px" },
    },
    {
      underline: true,
      size: "2xl",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "4px" },
    },
    {
      underline: true,
      size: "2xl",
      weight: "light",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "4.5px" },
    },
    {
      underline: true,
      size: "2xl",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "5px" },
    },
    {
      underline: true,
      size: "2xl",
      weight: "medium",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "5.5px" },
    },
    {
      underline: true,
      size: "2xl",
      weight: "bold",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "6px" },
    },
    {
      underline: true,
      size: "3xl",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "5px" },
    },
    {
      underline: true,
      size: "3xl",
      weight: "light",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "5.5px" },
    },
    {
      underline: true,
      size: "3xl",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "6px" },
    },
    {
      underline: true,
      size: "3xl",
      weight: "medium",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "6.5px" },
    },
    {
      underline: true,
      size: "3xl",
      weight: "bold",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "7px" },
    },
    {
      underline: true,
      size: "4xl",
      weight: "thin",
      css: { textDecorationThickness: "1px", textUnderlineOffset: "6px" },
    },
    {
      underline: true,
      size: "4xl",
      weight: "light",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "6.5px" },
    },
    {
      underline: true,
      size: "4xl",
      weight: "normal",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "7px" },
    },
    {
      underline: true,
      size: "4xl",
      weight: "medium",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "7.5px" },
    },
    {
      underline: true,
      size: "4xl",
      weight: "bold",
      css: { textDecorationThickness: "6px", textUnderlineOffset: "8px" },
    },
    {
      underline: true,
      size: "5xl",
      weight: "thin",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "7px" },
    },
    {
      underline: true,
      size: "5xl",
      weight: "light",
      css: { textDecorationThickness: "2px", textUnderlineOffset: "7.5px" },
    },
    {
      underline: true,
      size: "5xl",
      weight: "normal",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "8px" },
    },
    {
      underline: true,
      size: "5xl",
      weight: "medium",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "8.5px" },
    },
    {
      underline: true,
      size: "5xl",
      weight: "bold",
      css: { textDecorationThickness: "6px", textUnderlineOffset: "9px" },
    },
    {
      underline: true,
      size: "6xl",
      weight: "thin",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "8px" },
    },
    {
      underline: true,
      size: "6xl",
      weight: "light",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "8.5px" },
    },
    {
      underline: true,
      size: "6xl",
      weight: "normal",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "9px" },
    },
    {
      underline: true,
      size: "6xl",
      weight: "medium",
      css: { textDecorationThickness: "8px", textUnderlineOffset: "9.5px" },
    },
    {
      underline: true,
      size: "6xl",
      weight: "bold",
      css: { textDecorationThickness: "8px", textUnderlineOffset: "10px" },
    },
    {
      underline: true,
      size: "7xl",
      weight: "thin",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "9px" },
    },
    {
      underline: true,
      size: "7xl",
      weight: "light",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "9.5px" },
    },
    {
      underline: true,
      size: "7xl",
      weight: "normal",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "10px" },
    },
    {
      underline: true,
      size: "7xl",
      weight: "medium",
      css: { textDecorationThickness: "8px", textUnderlineOffset: "11px" },
    },
    {
      underline: true,
      size: "7xl",
      weight: "bold",
      css: { textDecorationThickness: "8px", textUnderlineOffset: "11px" },
    },
    {
      underline: true,
      size: "8xl",
      weight: "thin",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "10px" },
    },
    {
      underline: true,
      size: "8xl",
      weight: "light",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "11px" },
    },
    {
      underline: true,
      size: "8xl",
      weight: "normal",
      css: { textDecorationThickness: "6px", textUnderlineOffset: "11px" },
    },
    {
      underline: true,
      size: "8xl",
      weight: "medium",
      css: { textDecorationThickness: "8px", textUnderlineOffset: "11.5px" },
    },
    {
      underline: true,
      size: "8xl",
      weight: "bold",
      css: { textDecorationThickness: "12px", textUnderlineOffset: "12px" },
    },
    {
      underline: true,
      size: "9xl",
      weight: "thin",
      css: { textDecorationThickness: "4px", textUnderlineOffset: "11px" },
    },
    {
      underline: true,
      size: "9xl",
      weight: "light",
      css: { textDecorationThickness: "8px", textUnderlineOffset: "11.5px" },
    },
    {
      underline: true,
      size: "9xl",
      weight: "normal",
      css: { textDecorationThickness: "12px", textUnderlineOffset: "12px" },
    },
    {
      underline: true,
      size: "9xl",
      weight: "medium",
      css: { textDecorationThickness: "12px", textUnderlineOffset: "12.5px" },
    },
    {
      underline: true,
      size: "9xl",
      weight: "bold",
      css: { textDecorationThickness: "16px", textUnderlineOffset: "13px" },
    },
  ],
  defaultVariants: {
    tone: "neutral",
    muted: false,
    underline: true,
    size: "md",
  },
});
