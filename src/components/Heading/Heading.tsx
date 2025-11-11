import type { HTMLAttributes, ReactNode } from "react";
import { css, cva } from "../../../styled-system/css";

type Level = 1 | 2 | 3 | 4 | 5;
type HeadingTone = "brand" | "neutral";
type HeadingSize = 1 | 2 | 3 | 4 | 5;
type Align = "left" | "center" | "right";
type WordBreak = "eng" | "cjk";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 제목 텍스트 */
  children: ReactNode;
  /** 제목 단계 */
  level: Level;
  /** 제목 크기 */
  size?: HeadingSize;
  /** 제목의 색조 */
  tone?: HeadingTone;
  /** 텍스트 정렬 */
  align?: Align;
  /** 단어 줄바꿈 */
  wordBreak?: WordBreak;
}

/**
 * - `level` 속성을 통해서 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` 요소 중 하나를 선택할 수 있습니다.
 * - `level` 속성은 단계별 기본 텍스트 스타일을 제공합니다.
 * - `size` 속성을 통해서 기본 스타일을 변경할 수 있습니다.
 * - `level`과 `size` 속성이 같이 있는 경우, `size` 속성이 `level` 속성보다 우선순위가 높습니다.
 * 예를 들어 `size` 속성은 2, `level` 속성은 1인 경우, `<h1>` 태그이지만 `size` 속성이 2에 해당하는 스타일이 적용됩니다.
 * - `tone` 속성을 통해서 색상 강조를 지정할 수 있습니다.
 * - `align` 속성을 통해서 텍스트 정렬을 지정할 수 있습니다.
 * - `wordBreak` 속성을 통해서 단어 줄바꿈 방식을 지정할 수 있습니다. `eng`는 영어 단어 단위로 줄바꿈하고, `cjk`는 한중일 단어 단위로 줄바꿈합니다.
 */
export const Heading = ({
  children,
  level,
  size,
  tone = "neutral",
  align,
  wordBreak,
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
        styles.raw({
          level: size ? undefined : level,
          tone,
          align,
          wordBreak,
        }),
        size &&
          css.raw({
            textStyle: `heading.${size}`,
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
      1: { textStyle: "heading.1" },
      2: { textStyle: "heading.2" },
      3: { textStyle: "heading.3" },
      4: { textStyle: "heading.4" },
      5: { textStyle: "heading.5" },
    },
    tone: {
      brand: {
        color: "fg.brand",
      },
      neutral: {
        color: "fg.neutral",
      },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
      justify: { textAlign: "justify" },
    },
    wordBreak: {
      eng: { wordBreak: "normal" },
      cjk: { wordBreak: "keep-all" },
    },
  },
});
