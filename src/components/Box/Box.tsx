import React from "react";
import { css, cx } from "../../../styled-system/css";
import type { Spacing } from "../../tokens/spacing";

type As =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "span";

type CSSLength = `${number}px` | `${number}em` | `${number}rem` | `${number}%`;

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** 자식 요소 */
  children?: React.ReactNode;
  /** 렌더링 태그 */
  as?: As;
  /** 안쪽 여백 */
  padding?: Spacing;
  /** 바깥 여백 */
  margin?: Spacing;
  /** 너비 (예: "100px", "2rem", "2em", "50%") */
  width?: CSSLength;
  /** 높이 (예: "100px", "2rem", "2em", "50%") */
  height?: CSSLength;
  /** 요소 참조 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * Box는 가장 기본적인 레이아웃 컴포넌트입니다.
 *
 * - `className` 속성을 통해서 추가 스타일을 적용할 수 있습니다.
 * - `as="span"`을 사용할 경우, span은 기본적으로 `inline` 요소이므로 `width`와 `height` 속성이 적용되지 않습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 */

export const Box = ({
  ref,
  children,
  as = "div",
  padding,
  margin,
  width,
  height,
  className,
  ...rest
}: BoxProps) => {
  const baseStyle = css({
    padding,
    margin,
  });

  const inlineStyle = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

  return React.createElement(
    as,
    {
      ref,
      className: cx(baseStyle, className),
      style: inlineStyle,
      ...rest,
    },
    children,
  );
};
