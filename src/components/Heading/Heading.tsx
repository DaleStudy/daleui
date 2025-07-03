import type { HTMLAttributes, ReactNode } from "react";
import { css, cva } from "../../../styled-system/css";

type Level = 1 | 2 | 3 | 4 | 5;
type Tone = "brand" | "neutral";
type HeadingSize = "md" | "lg" | "xl" | "2xl" | "3xl";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 텍스트 */
  children: ReactNode;
  /** 단계 */
  level: Level;
  /** 크기 */
  size?: HeadingSize;
  /** 색조 */
  tone?: Tone;
}

/**
 * - `level` 속성을 통해서 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` 요소 중 하나를 선택할 수 있습니다.
 * - `level` 속성은 단계 별 기본 텍스트 스타일을 제공합니다.
 * - `size` 속성을 통해서 기본 스타일을 변경할 수 있습니다.
 * - `tone` 속성을 통해서 색상 강조를 지정할 수 있습니다.
 */
export const Heading = ({
  children,
  level,
  size,
  tone = "brand",
  ...rest
}: HeadingProps) => {
  if (!level) {
    throw new Error(
      "The level prop is required and you can cause accessibility issues.",
    );
  }

  const Tag = `h${level}` as const;

  return (
    <Tag
      className={css(
        styles.raw({ level, tone }),
        css.raw({
          fontSize: size,
        }),
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const styles = cva({
  variants: {
    level: {
      1: { fontSize: "3xl" },
      2: { fontSize: "2xl" },
      3: { fontSize: "xl" },
      4: { fontSize: "lg" },
      5: { fontSize: "md" },
    },
    tone: {
      brand: {
        color: "fg.brand",
        "&:focus": {
          color: "fg.brand.focus",
        },
        "&:active, &:hover": {
          color: "fg.brand.hover",
        },
      },
      neutral: {
        color: "fg.neutral",
        "&:focus": {
          color: "fg.neutral.focus",
        },
        "&:active, &:hover": {
          color: "fg.neutral.hover",
        },
      },
    },
  },
});
