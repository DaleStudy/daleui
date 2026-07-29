import type { HTMLAttributes, Ref } from "react";
import { cva, cx } from "../../../styled-system/css";

export interface DividerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "dangerouslySetInnerHTML"
> {
  /** 방향 */
  orientation?: "horizontal" | "vertical";
  /** 선 스타일 */
  variant?: "solid" | "dashed";
  /** 두께 */
  stroke?: "xs" | "sm";
  /** 요소 참조 */
  ref?: Ref<HTMLElement>;
}

/**
 * Divider는 콘텐츠를 시각적으로 구분하는 선입니다.
 *
 * - `orientation="horizontal"`(기본값)은 세로로 쌓인 콘텐츠를 가로 선으로 구분할 때, `orientation="vertical"`은 가로로 나열된 콘텐츠를 세로 선으로 구분할 때 사용합니다.
 * - `orientation="vertical"`은 높이를 `align-self: stretch`로 채우므로 부모가 flex 또는 grid 컨테이너여야 합니다. 그 외의 부모에서는 `align-self`가 무시되어 높이가 0이 되므로, `height` 등으로 직접 높이를 지정해야 합니다.
 */
export function Divider({
  ref,
  orientation = "horizontal",
  variant = "solid",
  stroke = "sm",
  className,
  ...rest
}: DividerProps) {
  const lineStyle = styles({ orientation, variant, stroke });

  if (orientation === "vertical") {
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        className={cx(lineStyle, className)}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      />
    );
  }

  return (
    <hr
      ref={ref as Ref<HTMLHRElement>}
      className={cx(lineStyle, className)}
      {...(rest as HTMLAttributes<HTMLHRElement>)}
    />
  );
}

const styles = cva({
  base: {
    borderColor: "border.neutral",
  },
  variants: {
    orientation: {
      horizontal: { width: "100%", height: "0" },
      vertical: { alignSelf: "stretch", height: "auto", width: "0" },
    },
    stroke: {
      xs: {},
      sm: {},
    },
    variant: {
      solid: {},
      dashed: {},
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      stroke: "xs",
      css: { borderTopWidth: "xs" },
    },
    {
      orientation: "horizontal",
      stroke: "sm",
      css: { borderTopWidth: "sm" },
    },
    {
      orientation: "vertical",
      stroke: "xs",
      css: { borderLeftWidth: "xs" },
    },
    {
      orientation: "vertical",
      stroke: "sm",
      css: { borderLeftWidth: "sm" },
    },
    {
      orientation: "horizontal",
      variant: "solid",
      css: { borderTopStyle: "solid" },
    },
    {
      orientation: "horizontal",
      variant: "dashed",
      css: { borderTopStyle: "dashed" },
    },
    {
      orientation: "vertical",
      variant: "solid",
      css: { borderLeftStyle: "solid" },
    },
    {
      orientation: "vertical",
      variant: "dashed",
      css: { borderLeftStyle: "dashed" },
    },
  ],
});
