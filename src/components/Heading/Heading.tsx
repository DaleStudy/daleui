import { css } from "../../../styled-system/css";
import type { TextStyle, FontSize, FontWeight } from "../../tokens/typography";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 텍스트 */
  children: React.ReactNode | string;
  /** 단계 */
  level?: Level;
  /** 크기 */
  size?: FontSize;
  /** 굵기 */
  weight?: FontWeight;
  /** 명암비 */
  // contrast?: "low" | "high";
}

const textStyles: Record<Level, TextStyle> = {
  1: "4xl",
  2: "3xl",
  3: "2xl",
  4: "xl",
  5: "lg",
  6: "md",
};

/**
 * - `level` 속성을 통해서 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 요소 중 하나를 선택할 수 있습니다.
 * - `level` 속성은 단계 별 기본 텍스트 스타일을 제공합니다.
 * - `size` 속성과 `weight` 속성을 통해서 기본 스타일을 변경할 수 있습니다.
 */
export const Heading = ({
  children,
  level,
  size,
  weight,
  // contrast = "low",
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
      className={css({
        textStyle: textStyles[level],
        fontSize: size,
        fontWeight: weight,
      })}
      {...rest}
    >
      {children}
    </Tag>
  );
};
