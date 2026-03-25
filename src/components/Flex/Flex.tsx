import React, { type AriaRole } from "react";
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

export interface FlexProps
  extends
    React.HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof flexVariants>> {
  /** 자식 요소들 (필수) */
  children: React.ReactNode;
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** 요소 간 간격 */
  gap?: Spacing;
  /** 요소 속성 */
  role?: AriaRole;
}

/**
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `role` 속성을 통해서 역할을 지정할 수 있습니다.
 * - `direction` 속성을 통해서 flex 방향을 지정할 수 있습니다. `row`, `rowReverse`, `column`, `columnReverse` 중 선택 가능하며 기본값은 `row`입니다.
 * - `justify` 속성을 통해서 주축 정렬 방식을 지정할 수 있습니다. `start`, `center`, `end`, `between`, `around` 중 선택 가능하며 기본값은 `start`입니다.
 * - `align` 속성을 통해서 교차축 정렬 방식을 지정할 수 있습니다. `start`, `center`, `end`, `stretch` 중 선택 가능하며 기본값은 `stretch`입니다.
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 * - reverse 방향(rowReverse, columnReverse)을 사용할 경우, 화면에 보여지는 시각적 순서와 DOM의 순서가 다를 수 있습니다.
 *
 * ### 레이아웃 컴포넌트 사용 가이드 (Flex · HStack · VStack)
 *
 * **HStack**과 **VStack**은 `Flex`에서 **자주 쓰는 한 줄·한 열 패턴**을 전용 컴포넌트로 추상화한 것입니다. 둘 다 **`align` 기본값이 `center`**이고, **`Flex`의 `align` 기본(`stretch`)**과 다릅니다. 교차축 가운데 정렬이 필요한 UI를 기본값만으로 맞추기 쉽습니다.
 *
 * - **HStack** — 가로 한 줄. 내부적으로 `direction="row"`, 기본 `justify="left"`, `align="center"`.
 * - **VStack** — 세로 한 열. 내부적으로 `direction="column"`, 기본 `justify="top"`, `align="center"`.
 * - **Flex** — `direction` 전환이 필요하거나, VStack/Hstack은 교차축 `align`(CSS `align-items`) 기본이 `center`이므로, **교차축이 가운데가 아닐 때**(`stretch`·`start`·`end` 등)나 `start`·`end` 토큰으로 맞출 때 사용합니다.
 */
export const Flex = ({
  children,
  as = "div",
  direction = "row",
  justify = "start",
  align = "stretch",
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
      around: { justifyContent: "space-around" },
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
    justify: "start",
    align: "stretch",
  },
});
