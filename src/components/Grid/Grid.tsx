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

type Areas = string | string[][];

/**
 * 2차원 배열 형태의 areas를 CSS grid-template-areas 문자열로 변환합니다.
 * @example
 * [["header", "header"], ["sidebar", "main"]] → '"header header" "sidebar main"'
 */
const formatAreas = (areas: Areas | undefined): string | undefined => {
  if (!areas) {
    return undefined;
  }
  if (typeof areas === "string") {
    return areas;
  }
  return areas.map((row) => `"${row.join(" ")}"`).join(" ");
};

export interface GridProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof gridVariants>> {
  /** 자식 요소들 (필수) */
  children: React.ReactNode;
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** 열 템플릿 정의 (예: "repeat(3, 1fr)", "1fr 2fr 1fr", "100px auto 1fr") */
  gridTemplateColumns?: string;
  /** 행 템플릿 정의 (예: "repeat(2, 100px)", "auto 1fr auto") */
  gridTemplateRows?: string;
  /** 요소 간 간격 */
  gap?: Spacing;
  /** grid-template-areas 설정 (문자열 또는 2차원 배열) */
  areas?: Areas;
}

/**
 * CSS Grid 레이아웃을 위한 컨테이너 컴포넌트입니다.
 *
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `gridTemplateColumns` 속성을 통해서 열 템플릿을 지정할 수 있습니다.
 *   - 예: `"repeat(3, 1fr)"`, `"1fr 2fr 1fr"`, `"100px auto 1fr"`, `"repeat(auto-fit, minmax(200px, 1fr))"`
 * - `gridTemplateRows` 속성을 통해서 행 템플릿을 지정할 수 있습니다.
 *   - 예: `"repeat(2, 100px)"`, `"auto 1fr auto"`
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다.
 * - `autoFlow` 속성을 통해서 grid-auto-flow를 지정할 수 있습니다. `row`, `column`, `rowDense`, `columnDense` 중 선택 가능하며 기본값은 `row`입니다.
 * - `justifyItems` 속성을 통해서 그리드 아이템의 인라인 축 정렬을 지정할 수 있습니다. `start`, `center`, `end`, `stretch` 중 선택 가능하며 기본값은 `stretch`입니다.
 * - `alignItems` 속성을 통해서 그리드 아이템의 블록 축 정렬을 지정할 수 있습니다. `start`, `center`, `end`, `stretch` 중 선택 가능하며 기본값은 `stretch`입니다.
 * - `justifyContent` 속성을 통해서 그리드 컨테이너의 인라인 축 정렬을 지정할 수 있습니다. `start`, `center`, `end`, `between`, `around`, `stretch` 중 선택 가능합니다.
 * - `alignContent` 속성을 통해서 그리드 컨테이너의 블록 축 정렬을 지정할 수 있습니다. `start`, `center`, `end`, `between`, `around`, `stretch` 중 선택 가능합니다.
 * - `areas` 속성을 통해서 grid-template-areas를 지정할 수 있습니다. 문자열 또는 2차원 배열 형태로 전달할 수 있습니다.
 *   - 문자열: `'"header header" "sidebar main" "footer footer"'`
 *   - 2차원 배열: `[["header", "header"], ["sidebar", "main"], ["footer", "footer"]]`
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const Grid = ({
  children,
  as = "div",
  gridTemplateColumns,
  gridTemplateRows,
  gap,
  areas,
  autoFlow = "row",
  justifyItems = "stretch",
  alignItems = "stretch",
  justifyContent,
  alignContent,
  className,
  ...props
}: GridProps) => {
  const Component = as;

  return React.createElement(
    Component,
    {
      className: cx(
        gridVariants({
          autoFlow,
          justifyItems,
          alignItems,
          justifyContent,
          alignContent,
        }),
        css({
          gap,
          gridTemplateAreas: formatAreas(areas),
          gridTemplateColumns,
          gridTemplateRows,
        }),
        className,
      ),
      ...props,
    },
    children,
  );
};

const gridVariants = cva({
  base: {
    display: "grid",
  },
  variants: {
    autoFlow: {
      row: { gridAutoFlow: "row" },
      column: { gridAutoFlow: "column" },
      rowDense: { gridAutoFlow: "row dense" },
      columnDense: { gridAutoFlow: "column dense" },
    },
    justifyItems: {
      start: { justifyItems: "start" },
      center: { justifyItems: "center" },
      end: { justifyItems: "end" },
      stretch: { justifyItems: "stretch" },
    },
    alignItems: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
    },
    justifyContent: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
      stretch: { justifyContent: "stretch" },
    },
    alignContent: {
      start: { alignContent: "start" },
      center: { alignContent: "center" },
      end: { alignContent: "end" },
      between: { alignContent: "space-between" },
      around: { alignContent: "space-around" },
      stretch: { alignContent: "stretch" },
    },
  },
  defaultVariants: {
    autoFlow: "row",
    justifyItems: "stretch",
    alignItems: "stretch",
  },
});

export interface GridItemProps extends React.HTMLAttributes<HTMLElement> {
  /** 자식 요소들 (필수) */
  children: React.ReactNode;
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** grid-column (예: "span 2", "1 / 3", "1 / -1") */
  gridColumn?: string;
  /** grid-row (예: "span 2", "1 / 3", "1 / -1") */
  gridRow?: string;
  /** grid-column-start (예: "1", "2") */
  gridColumnStart?: string;
  /** grid-row-start (예: "1", "2") */
  gridRowStart?: string;
  /** grid-column-end (예: "3", "-1") */
  gridColumnEnd?: string;
  /** grid-row-end (예: "3", "-1") */
  gridRowEnd?: string;
  /** grid-area 이름 */
  gridArea?: string;
}

/**
 * CSS Grid 레이아웃 내의 아이템 컴포넌트입니다.
 *
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `gridColumn` 속성을 통해서 열 위치를 지정할 수 있습니다.
 * - `gridRow` 속성을 통해서 행 위치를 지정할 수 있습니다.
 * - `gridColumnStart` 속성을 통해서 열 시작 위치를 지정할 수 있습니다.
 * - `gridRowStart` 속성을 통해서 행 시작 위치를 지정할 수 있습니다.
 * - `gridColumnEnd` 속성을 통해서 열 끝 위치를 지정할 수 있습니다.
 * - `gridRowEnd` 속성을 통해서 행 끝 위치를 지정할 수 있습니다.
 * - `gridArea` 속성을 통해서 grid-area 이름을 지정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const GridItem = ({
  children,
  as = "div",
  gridColumn,
  gridRow,
  gridColumnStart,
  gridRowStart,
  gridColumnEnd,
  gridRowEnd,
  gridArea,
  className,
  ...props
}: GridItemProps) => {
  const Component = as;

  return React.createElement(
    Component,
    {
      className: cx(
        css({
          gridColumn,
          gridRow,
          gridColumnStart,
          gridRowStart,
          gridColumnEnd,
          gridRowEnd,
          gridArea,
        }),
        className,
      ),
      ...props,
    },
    children,
  );
};
