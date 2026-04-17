import React, { type HTMLAttributes, type ReactNode } from "react";
import { css, cva } from "../../../styled-system/css";

type Level = 1 | 2 | 3 | 4 | 5;
type HeadingTone = "brand" | "neutral";
type HeadingSize = 1 | 2 | 3 | 4 | 5;
type Align = "left" | "center" | "right";
type WordBreak = "eng" | "cjk";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 제목 내용 */
  children: ReactNode;
  /** 제목 단계 (h1–h5) */
  level: Level;
  /** 표시 크기 */
  size?: HeadingSize;
  /** 색조 */
  tone?: HeadingTone;
  /** 텍스트 정렬 */
  align?: Align;
  /** 줄바꿈 규칙 */
  wordBreak?: WordBreak;
  /** 요소 참조 */
  ref?: React.Ref<HTMLHeadingElement>;
}

/**
 * 페이지의 제목이나 섹션의 구조를 표현하기 위해 사용하는 컴포넌트입니다.
 * 두 가지 색상 톤을 제공하며, 뷰포인트에 따라 크기가 유동적으로 변경되도록 설계되어 있습니다.
 *
 * - `size`와 `level`이 함께 지정되면 `size`가 시각적 크기를 결정하고, `level`은 HTML 태그(`<h1>`–`<h5>`) 선택에만 사용됩니다.
 * 예를 들어 `size` 속성은 2, `level` 속성은 1인 경우, `<h1>` 태그이지만 `size` 속성이 2에 해당하는 스타일이 적용됩니다.
 * - 반응형 폰트를 지원하여 뷰포트에 따라 글꼴 크기가 자동으로 전환됩니다.
 */
export const Heading = ({
  ref,
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

  return React.createElement(
    Tag,
    {
      ref,
      className: css(
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
      ),
      ...rest,
    },
    children,
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
