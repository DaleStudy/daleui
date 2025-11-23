import React from "react";
import { type RecipeVariant, css, cva, cx } from "../../../styled-system/css";
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

export interface HStackProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof hstackVariants>> {
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
 * - `align` 속성을 통해서 가로 정렬 방식을 지정할 수 있습니다. `left`, `center`, `right`, `between`, `around` 중 선택 가능합니다. 기본값은 `center`입니다.
 * - `reversed` 속성을 통해서 가로 배치 방향을 지정할 수 있습니다. 기본값은 `false`입니다.
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const HStack = ({
  children,
  as = "div",
  align,
  reversed = false,
  gap,
  className,
  ...rest
}: HStackProps) => {
  const Component = as;

  return React.createElement(
    Component,
    {
      className: cx(
        hstackVariants({
          align,
          reversed,
        }),
        css({ gap }),
        className,
      ),
      ...rest,
    },
    children,
  );
};

const hstackVariants = cva({
  base: {
    display: "flex",
    alignItems: "center",
  },
  variants: {
    align: {
      left: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      right: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
    },
    reversed: {
      true: { flexDirection: "row-reverse" },
      false: { flexDirection: "row" },
    },
  },
  defaultVariants: {
    align: "center",
    reversed: false,
  },
});
