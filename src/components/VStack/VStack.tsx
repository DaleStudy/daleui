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
  | "ul"
  | "span";

export interface VStackProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof vstackVariants>> {
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
 * - `align` 속성을 통해서 가로 정렬 방식을 지정할 수 있습니다. 기본값은 `center`입니다.
 * - `isReversed` 속성을 통해서 세로 배치 방식을 지정할 수 있습니다. 기본값은 `false`입니다.
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` | `ul` | `ol` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 목록이라면 가능하면 ul/ol을 사용하고, 불가능하면 role="list" + 자식 role="listitem"으로 지정합니다.
 */
export const VStack = ({
  children,
  as = "div",
  align = "center",
  isReversed = false,
  gap,
  className,
  ...rest
}: VStackProps) => {
  const Component = as;

  return React.createElement(
    Component,
    {
      className: cx(
        vstackVariants({
          align,
          isReversed,
        }),
        css({ gap }),
        className,
      ),
      ...rest,
    },
    children,
  );
};

const vstackVariants = cva({
  base: {
    display: "flex",
  },
  variants: {
    align: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
    },
    isReversed: {
      true: { flexDirection: "column-reverse" },
      false: { flexDirection: "column" },
    },
  },
  defaultVariants: {
    align: "center",
    isReversed: false,
  },
});
