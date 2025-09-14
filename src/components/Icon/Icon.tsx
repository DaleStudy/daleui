import type { SVGProps } from "react";
import { cva, cx } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { type IconName, icons } from "../../tokens/iconography";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 이름 */
  name: IconName;
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: "xs" | "sm" | "md" | "lg";
}

/**
 * - `name` 속성으로 어떤 모양의 아이콘을 사용할지 지정할 수 있습니다.
 * - 아이콘의 기본 크기는 기본 글자 크기의 1.25배이며, `size` 속성을 통해서 크기를 변경할 수 있습니다.
 * - 아이콘의 `tone` 속성을 통해서 색조를 변경할 수 있으며, 지정하지 않으면 부모의 색조를 상속합니다.
 */
export const Icon = ({ name, size, tone, className, ...rest }: IconProps) => {
  const Tag = icons[name];
  return <Tag className={cx(styles({ size, tone }), className)} {...rest} />;
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
      brand: { color: "fg.brand" },
      neutral: { color: "fg.neutral" },
      success: { color: "fg.success" },
      warning: { color: "fg.warning" },
      danger: { color: "fg.danger" },
      info: { color: "fg.info" },
    },
  },
  defaultVariants: { size: "md" },
});
