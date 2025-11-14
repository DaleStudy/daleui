import React from "react";
import { css, cva, cx, type RecipeVariant } from "../../../styled-system/css";
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

export interface FlexProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof flexVariants>> {
  /** 자식 요소들 (필수) */
  children: React.ReactNode;
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** 요소 간 간격 */
  gap?: Spacing;
}

/**
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `role` 속성을 통해서 역할을 지정할 수 있습니다.
 * - `direction` 속성을 통해서 flex 방향을 지정할 수 있습니다. `row`, `rowReverse`, `column`, `columnReverse` 중 선택 가능하며 기본값은 `row`입니다.
 * - `justify` 속성을 통해서 주축 정렬 방식을 지정할 수 있습니다. `start`, `center`, `end`, `between` 중 선택 가능하며 기본값은 `center`입니다.
 * - `align` 속성을 통해서 교차축 정렬 방식을 지정할 수 있습니다. `start`, `center`, `end`, `stretch` 중 선택 가능하며 기본값은 `center`입니다.
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const Flex = ({
  children,
  as = "div",
  direction = "row",
  justify = "center",
  align = "center",
  gap,
  className,
  ...rest
}: FlexProps) => {
  const Component = as;

  return React.createElement(
    Component,
    {
      className: cx(
        flexVariants({
          direction,
          justify,
          align,
        }),
        css({ gap }),
        className,
      ),
      ...rest,
    },
    children,
  );
};

const flexVariants = cva({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
      rowReverse: { flexDirection: "row-reverse" },
      columnReverse: { flexDirection: "column-reverse" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },
  },
  defaultVariants: {
    direction: "row",
    justify: "center",
    align: "center",
  },
});
