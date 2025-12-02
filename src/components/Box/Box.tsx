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

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** 자식 요소들 */
  children?: React.ReactNode;
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** padding */
  padding?: Spacing;
  /** margin */
  margin?: Spacing;
  /** 너비 (px 단위) */
  width?: number;
  /** 높이 (px 단위) */
  height?: number;
}

/**
 * Box는 가장 기본적인 레이아웃 컴포넌트입니다.
 *
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `padding`, `margin` 속성을 통해서 spacing을 지정할 수 있습니다.
 * - `width`, `height` 속성을 통해서 크기를 지정할 수 있습니다.
 * - `className` 속성을 통해서 추가 스타일을 적용할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */

export const Box = ({
  children,
  as = "div",
  padding,
  margin,
  width,
  height,
  className,
  ...rest
}: BoxProps) => {
  const Component = as;

  const isInline = as === "span";

  const baseStyle = css({
    display: isInline ? "inline-block" : "block",
    padding,
    margin,
  });

  const inlineStyle = {
    ...(width !== undefined && { width: `${width}px` }),
    ...(height !== undefined && { height: `${height}px` }),
  };

  return (
    <Component
      className={cx(baseStyle, className)}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
