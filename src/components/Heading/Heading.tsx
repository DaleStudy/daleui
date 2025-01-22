import type { ReactNode, HTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import type { FontSize, FontWeight } from "../../tokens/typography";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 텍스트 */
  children: ReactNode;
  /** 단계 */
  level: Level;
  /** 크기 */
  size?: FontSize;
  /** 굵기 */
  weight?: FontWeight;
  /** 명암비 낮출지 */
  muted?: boolean;
}

/**
 * - `level` 속성을 통해서 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 요소 중 하나를 선택할 수 있습니다.
 * - `level` 속성은 단계 별 기본 텍스트 스타일을 제공합니다.
 * - `size` 속성과 `weight` 속성을 통해서 기본 스타일을 변경할 수 있습니다.
 * - `muted` 속성을 주시면 글자색이 옅어집니다. 명암비가 낮아지므로 접근성 측면에서 주의해서 사용하세요.
 */
export const Heading = ({
  children,
  level,
  size,
  weight,
  muted = false,
  ...rest
}: HeadingProps) => {
  if (!level) {
    throw new Error(
      "The level prop is required and you can cause accessibility issues."
    );
  }

  const Tag = `h${level}` as const;

  return (
    <Tag
      className={css(
        styles.raw({ level, muted }),
        css.raw({
          fontSize: size,
          fontWeight: weight,
        })
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
      1: { textStyle: "4xl" },
      2: { textStyle: "3xl" },
      3: { textStyle: "2xl" },
      4: { textStyle: "xl" },
      5: { textStyle: "lg" },
      6: { textStyle: "md" },
    },
    muted: {
      true: { color: "text.muted" },
      false: { color: "text" },
    },
  },
});
