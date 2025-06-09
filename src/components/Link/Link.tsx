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
      brand: {},
      danger: {},
      warning: {},
      success: {},
      info: {},
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
        color: {
          base: "light.fg.neutral.default",
          _dark: "dark.fg.neutral.default",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.neutral.hover",
            _dark: "dark.fg.neutral.hover",
          },
        },
      },
    },
    {
      tone: "brand",
      muted: false,
      css: {
        color: {
          base: "light.fg.brand.default",
          _dark: "dark.fg.brand.default",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.brand.hover",
            _dark: "dark.fg.brand.hover",
          },
        },
      },
    },
    {
      tone: "danger",
      muted: false,
      css: {
        color: {
          base: "light.fg.danger",
          _dark: "dark.fg.danger",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.danger",
            _dark: "dark.fg.danger",
          },
        },
      },
    },
    {
      tone: "warning",
      muted: false,
      css: {
        color: {
          base: "light.fg.warning",
          _dark: "dark.fg.warning",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.warning",
            _dark: "dark.fg.warning",
          },
        },
      },
    },
    {
      tone: "success",
      muted: false,
      css: {
        color: {
          base: "light.fg.success",
          _dark: "dark.fg.success",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.success",
            _dark: "dark.fg.success",
          },
        },
      },
    },
    {
      tone: "info",
      muted: false,
      css: {
        color: {
          base: "light.fg.info",
          _dark: "dark.fg.info",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.info",
            _dark: "dark.fg.info",
          },
        },
      },
    },
    {
      tone: "neutral",
      muted: true,
      css: {
        color: {
          base: "light.fg.neutral.placeholder",
          _dark: "dark.fg.neutral.placeholder",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.neutral.default",
            _dark: "dark.fg.neutral.default",
          },
        },
      },
    },
    {
      tone: "brand",
      muted: true,
      css: {
        color: {
          base: "light.fg.neutral.placeholder",
          _dark: "dark.fg.neutral.placeholder",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.brand.default",
            _dark: "dark.fg.brand.default",
          },
        },
      },
    },
    {
      tone: "danger",
      muted: true,
      css: {
        color: {
          base: "light.fg.neutral.placeholder",
          _dark: "dark.fg.neutral.placeholder",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.danger",
            _dark: "dark.fg.danger",
          },
        },
      },
    },
    {
      tone: "warning",
      muted: true,
      css: {
        color: {
          base: "light.fg.neutral.placeholder",
          _dark: "dark.fg.neutral.placeholder",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.warning",
            _dark: "dark.fg.warning",
          },
        },
      },
    },
    {
      tone: "success",
      muted: true,
      css: {
        color: {
          base: "light.fg.neutral.placeholder",
          _dark: "dark.fg.neutral.placeholder",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.success",
            _dark: "dark.fg.success",
          },
        },
      },
    },
    {
      tone: "info",
      muted: true,
      css: {
        color: {
          base: "light.fg.neutral.placeholder",
          _dark: "dark.fg.neutral.placeholder",
        },
        "&:active, &:hover": {
          color: {
            base: "light.fg.info",
            _dark: "dark.fg.info",
          },
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
