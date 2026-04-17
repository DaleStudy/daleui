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

/** grid-template-areas 영역 이름 (문자열 또는 string[][]) */
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
  extends
    React.HTMLAttributes<HTMLElement>,
    Partial<RecipeVariant<typeof gridVariants>> {
  /** 자식 요소 */
  children: React.ReactNode;
  /** 렌더링 태그 */
  as?: As;
  /** 열 템플릿 (grid-template-columns) */
  gridTemplateColumns?: string;
  /** 행 템플릿 (grid-template-rows) */
  gridTemplateRows?: string;
  /** 자식 간 간격 */
  gap?: Spacing;
  /** 영역 이름 (grid-template-areas, GridItem.gridArea와 함께 사용) */
  areas?: Areas;
  /** 자동 배치 흐름 (grid-auto-flow) */
  autoFlow?: RecipeVariant<typeof gridVariants>["autoFlow"];
  /** 아이템 주축 정렬 (justify-items) */
  justifyItems?: RecipeVariant<typeof gridVariants>["justifyItems"];
  /** 아이템 교차축 정렬 (align-items) */
  alignItems?: RecipeVariant<typeof gridVariants>["alignItems"];
  /** 컨테이너 주축 정렬 (justify-content) */
  justifyContent?: RecipeVariant<typeof gridVariants>["justifyContent"];
  /** 컨테이너 교차축 정렬 (align-content) */
  alignContent?: RecipeVariant<typeof gridVariants>["alignContent"];
  /** 요소 참조 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * CSS Grid 레이아웃을 위한 컨테이너 컴포넌트입니다.
 * - `gridTemplateColumns`, `gridTemplateRows`, `gap`, `areas` 등 CSS Grid 관련 props를 통해 레이아웃을 설정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const Grid = ({
  ref,
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
  return React.createElement(
    as,
    {
      ref,
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
          gridTemplateAreas: "var(--grid-template-areas, none)",
          gridTemplateColumns: "var(--grid-template-columns, none)",
          gridTemplateRows: "var(--grid-template-rows, none)",
        }),
        className,
      ),
      style: {
        "--grid-template-areas": formatAreas(areas),
        "--grid-template-columns": gridTemplateColumns,
        "--grid-template-rows": gridTemplateRows,
      },
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
  /** 자식 요소 */
  children: React.ReactNode;
  /** 렌더링 태그 */
  as?: As;
  /** 열 범위 (grid-column) */
  gridColumn?: string;
  /** 행 범위 (grid-row) */
  gridRow?: string;
  /** 열 시작 선 (grid-column-start) */
  gridColumnStart?: string;
  /** 행 시작 선 (grid-row-start) */
  gridRowStart?: string;
  /** 열 끝 선 (grid-column-end) */
  gridColumnEnd?: string;
  /** 행 끝 선 (grid-row-end) */
  gridRowEnd?: string;
  /** 영역 이름 (grid-area) */
  gridArea?: string;
  /** 요소 참조 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * CSS Grid 레이아웃 내의 아이템 컴포넌트입니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const GridItem = ({
  ref,
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
  // 유효하지 않은 css 변수가 주어질 때 auto로 처리하지 않도록 null 체크
  const placementStyle = {
    ...(gridColumn != null && { "--grid-column": gridColumn }),
    ...(gridRow != null && { "--grid-row": gridRow }),
    ...(gridColumnStart != null && { "--grid-column-start": gridColumnStart }),
    ...(gridRowStart != null && { "--grid-row-start": gridRowStart }),
    ...(gridColumnEnd != null && { "--grid-column-end": gridColumnEnd }),
    ...(gridRowEnd != null && { "--grid-row-end": gridRowEnd }),
    ...(gridArea != null && { "--grid-area": gridArea }),
  };

  const placementCss = {
    ...(gridColumn != null && { gridColumn: "var(--grid-column)" }),
    ...(gridRow != null && { gridRow: "var(--grid-row)" }),
    ...(gridColumnStart != null && {
      gridColumnStart: "var(--grid-column-start)",
    }),
    ...(gridRowStart != null && { gridRowStart: "var(--grid-row-start)" }),
    ...(gridColumnEnd != null && { gridColumnEnd: "var(--grid-column-end)" }),
    ...(gridRowEnd != null && { gridRowEnd: "var(--grid-row-end)" }),
    ...(gridArea != null && { gridArea: "var(--grid-area)" }),
  };

  return React.createElement(
    as,
    {
      ref,
      className: cx(css(placementCss), className),
      style: placementStyle,
      ...props,
    },
    children,
  );
};
