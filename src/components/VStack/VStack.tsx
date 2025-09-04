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
  | "ol"
  | "li"
  | "span";

export interface VStackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className">,
    Partial<RecipeVariant<typeof vstackVariants>> {
  /** 자식 요소들 (필수) */
  children: React.ReactNode;
  /** 역할 */
  role?: React.AriaRole;
  /** 렌더링할 HTML 요소 */
  as?: As;
  /** 요소 간 간격 */
  gap?: Spacing;
}

/**
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `alignItems` 속성을 통해서 교차축 정렬 방식을 지정할 수 있습니다. 기본값은 `center`입니다.
 * - `justifyContent` 속성을 통해서 주축 정렬 방식을 지정할 수 있습니다. 기본값은 `start`입니다.
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다. 기본값은 `8`입니다.
 * - `isReverse` 속성을 통해서 세로 배치 방식을 지정할 수 있습니다. 기본값은 `false`입니다.
 * - `width` 속성을 통해서 너비를 지정할 수 있습니다.
 * - `height` 속성을 통해서 높이를 지정할 수 있습니다.
 * - `minWidth` 속성을 통해서 최소 너비를 지정할 수 있습니다.
 * - `minHeight` 속성을 통해서 최소 높이를 지정할 수 있습니다.
 * - `maxWidth` 속성을 통해서 최대 너비를 지정할 수 있습니다.
 * - `maxHeight` 속성을 통해서 최대 높이를 지정할 수 있습니다.
 * - `role` 속성을 통해서 역할을 지정할 수 있습니다. 기본값은 `undefined`입니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` | `ul` | `ol` 등) 중복 role 지정은 피하시길 바랍니다..
 * - 목록이라면 가능하면 ul/ol을 사용하고, 불가능하면 role="list" + 자식 role="listitem"으로 지정합니다.
 */
export const VStack = ({
  children,
  justifyContent,
  as = "div",
  alignItems = "center",
  gap,
  isReverse = false,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  ...rest
}: VStackProps) => {
  const Component = as;

  return React.createElement(
    Component,
    {
      className: cx(
        vstackVariants({
          alignItems,
          justifyContent,
          isReverse,
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
        }),
        css({ gap }),
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
    alignItems: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
    },
    justifyContent: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      "flex-end": { justifyContent: "flex-end" },
      "space-between": { justifyContent: "space-between" },
      "space-around": { justifyContent: "space-around" },
    },
    isReverse: {
      true: { flexDirection: "column-reverse" },
      false: { flexDirection: "column" },
    },
    width: {
      auto: { width: "auto" },
      full: { width: "100%" },
      fit: { width: "fit-content" },
      "320": { width: "20" },
      "640": { width: "40" },
      "1024": { width: "64" },
      "1280": { width: "80" },
    },
    height: {
      auto: { height: "auto" },
      full: { height: "100%" },
      fit: { height: "fit-content" },
      "180": { height: "180" },
      "360": { height: "360" },
      "576": { height: "576" },
      "720": { height: "720" },
    },
    minWidth: {
      auto: { minWidth: "auto" },
      full: { minWidth: "100%" },
      fit: { minWidth: "fit-content" },
      "320": { minWidth: "20" },
      "640": { minWidth: "40" },
      "1024": { minWidth: "64" },
      "1280": { minWidth: "80" },
    },
    minHeight: {
      auto: { minHeight: "auto" },
      full: { minHeight: "full" },
      fit: { minHeight: "fit" },
      "180": { minHeight: "180" },
      "360": { minHeight: "360" },
      "576": { minHeight: "576" },
      "720": { minHeight: "720" },
    },
    maxWidth: {
      auto: { maxWidth: "auto" },
      full: { maxWidth: "100%" },
      fit: { maxWidth: "fit-content" },
      "320": { maxWidth: "20" },
      "640": { maxWidth: "40" },
      "1024": { maxWidth: "64" },
      "1280": { maxWidth: "80" },
    },
    maxHeight: {
      auto: { maxHeight: "auto" },
      full: { maxHeight: "full" },
      fit: { maxHeight: "fit" },
      "180": { maxHeight: "180" },
      "360": { maxHeight: "360" },
      "576": { maxHeight: "576" },
      "720": { maxHeight: "720" },
    },
  },
  defaultVariants: {
    alignItems: "center",
    isReverse: false,
  },
});
