import type { SVGProps } from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { type IconName, icons } from "../../tokens/iconography";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 이름 */
  name: IconName;
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: "xs" | "sm" | "md" | "lg";
  /** 솔리드 여부 */
  solid?: boolean;
}

/**
 * 아이콘은 사용자의 이해를 돕고 행동을 유도하기 위해 사용하는 시각적 언어입니다.
 * 시스템 전반에서 일관되게 사용되며,  페이지와 컴포넌트 내에서 정보를 함축적으로 전달하는 재사용 가능한 벡터 그래픽 심볼입니다.
 *
 * - 기본 크기는 `md`(1.25rem)이며, `tone`을 지정하지 않으면 부모 요소의 색상을 상속합니다.
 * - `solid`는 `tone`과 함께 사용해야 적용됩니다.
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
