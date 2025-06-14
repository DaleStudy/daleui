import type { HTMLAttributes, ReactNode } from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import type { FontSize, FontWeight } from "../../tokens/typography";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** 텍스트 */
  children: ReactNode;
  /** HTML 태그 */
  as?: "span" | "div" | "p" | "strong" | "em" | "small";
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: FontSize;
  /** 굵기 */
  weight?: FontWeight;
  /** 명암비 낮출지 */
  muted?: boolean;
}

/**
 * - `as` 속성으로 어떤 HTML 태그를 사용할지 지정할 수 있습니다.
 * - `muted` 속성을 주시면 글자색이 옅어집니다. 명암비가 낮아지므로 접근성 측면에서 주의해서 사용하세요.
 */
export const Text = ({
  children,
  as: Tag = "span",
  tone = "neutral",
  size,
  weight,
  muted = false,
  ...rest
}: TextProps) => {
  return (
    <Tag
      className={css(
        styles.raw({ tone, muted }),
        css.raw({
          fontSize: size,
          fontWeight: weight,
        }),
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const styles = cva({
  compoundVariants: [
    {
      muted: false,
      tone: "neutral",
      css: {
        color: "fg.neutral.default",
      },
    },
    {
      muted: false,
      tone: "brand",
      css: {
        color: "fg.brand.default",
      },
    },
    {
      muted: false,
      tone: "danger",
      css: {
        color: "fg.danger",
      },
    },
    {
      muted: false,
      tone: "warning",
      css: {
        color: "fg.warning",
      },
    },
    {
      muted: false,
      tone: "success",
      css: {
        color: "fg.success",
      },
    },
    {
      muted: false,
      tone: "info",
      css: {
        color: "fg.info",
      },
    },
    {
      muted: true,
      tone: "neutral",
      css: {
        color: "fg.neutral.placeholder",
      },
    },
    {
      muted: true,
      tone: "brand",
      css: {
        color: "fg.brand.hover",
      },
    },
    {
      muted: true,
      tone: "danger",
      css: {
        color: "fg.danger",
      },
    },
    {
      muted: true,
      tone: "warning",
      css: {
        color: "fg.warning",
      },
    },
    {
      muted: true,
      tone: "success",
      css: {
        color: "fg.success",
      },
    },
    {
      muted: true,
      tone: "info",
      css: {
        color: "fg.info",
      },
    },
  ],
});
