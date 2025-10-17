import type { SVGProps } from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { type IconName, icons } from "../../tokens/iconography";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 이름 */
  name: IconName;
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: "xs" | "sm" | "md" | "lg";
  /** 솔리드 여부 */
  solid?: boolean;
}

/**
 * - `name` 속성으로 어떤 모양의 아이콘을 사용할지 지정할 수 있습니다.
 * - 아이콘의 기본 크기는 기본 글자 크기의 1.25배이며, `size` 속성을 통해서 크기를 변경할 수 있습니다.
 * - 아이콘의 `tone` 속성을 통해서 색조를 변경할 수 있으며, 지정하지 않으면 부모의 색조를 상속합니다.
 * - 솔리드 여부를 지정해 아이콘을 솔리드 또는 비솔리드로 변경할 수 있습니다.
 */
export const Icon = ({ name, size, tone, solid, ...rest }: IconProps) => {
  const Tag = icons[name];

  return <Tag className={styles({ size, tone, solid })} {...rest} />;
};

const styles = cva({
  base: { display: "inline-block", color: "currentcolor" },
  variants: {
    size: {
      xs: { width: "0.75rem", height: "0.75rem" },
      sm: { width: "1rem", height: "1rem" },
      md: { width: "1.25rem", height: "1.25rem" },
      lg: { width: "1.5rem", height: "1.5rem" },
    },
    tone: {
      brand: {},
      neutral: {},
      success: {},
      warning: {},
      danger: {},
      info: {},
    },
    solid: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      solid: true,
      tone: "brand",
      css: { color: "fgSolid.brand" },
    },
    {
      solid: false,
      tone: "brand",
      css: { color: "fg.brand" },
    },
    {
      solid: true,
      tone: "neutral",
      css: { color: "fgSolid.neutral" },
    },
    {
      solid: false,
      tone: "neutral",
      css: { color: "fg.neutral" },
    },
    {
      solid: true,
      tone: "success",
      css: { color: "fgSolid.success" },
    },
    {
      solid: false,
      tone: "success",
      css: { color: "fg.success" },
    },
    {
      solid: true,
      tone: "warning",
      css: { color: "fgSolid.warning" },
    },
    {
      solid: false,
      tone: "warning",
      css: { color: "fg.warning" },
    },
    {
      solid: true,
      tone: "danger",
      css: { color: "fgSolid.danger" },
    },
    {
      solid: false,
      tone: "danger",
      css: { color: "fg.danger" },
    },
    {
      solid: true,
      tone: "info",
      css: { color: "fgSolid.info" },
    },
    {
      solid: false,
      tone: "info",
      css: { color: "fg.info" },
    },
  ],
  defaultVariants: { size: "md", solid: false },
});
