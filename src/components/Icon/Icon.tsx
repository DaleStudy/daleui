import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { type IconName, icons } from "../../tokens/iconography";
export interface IconProps {
  /** 이름 */
  name: IconName;
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 명암비 낮출지 */
  muted?: boolean;
}

/**
 * - `name` 속성으로 어떤 모양의 아이콘을 사용할지 지정할 수 있습니다.
 * - 아이콘의 기본 크기는 부모 요소에서 설정한 글자 크기의 1.5배이며, `size` 속성을 통해서 크기를 변경할 수 있습니다.
 * - 아이콘의 기본 색상은 부모 요소에서 설정한 글자 색상과 동일하며, `tone` 속성과 `muted` 속성을 통해서 색상을 변경할 수 있습니다.
 */
export const Icon = ({
  name,
  size,
  tone,
  muted = false,
  ...rest
}: IconProps) => {
  const Tag = icons[name];

  return (
    <Tag
      className={css(
        sizeStyles.raw({ size }),
        colorStyles.raw({ tone, muted }),
        css.raw({
          display: "inline-block",
        }),
      )}
      {...rest}
    />
  );
};

const sizeStyles = cva({
  variants: {
    size: {
      xs: {
        width: "1em",
        height: "1em",
      },
      sm: {
        width: "1.25em",
        height: "1.25em",
      },
      md: {
        width: "1.5em",
        height: "1.5em",
      },
      lg: {
        width: "1.875em",
        height: "1.875em",
      },
      xl: {
        width: "2.25em",
        height: "2.25em",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const colorStyles = cva({
  compoundVariants: [
    {
      muted: false,
      tone: "neutral",
      css: {
        color: "fg.neutral.default",
      },
    },
    {
      muted: false,
      tone: "brand",
      css: {
        color: "fg.brand.default",
      },
    },
    {
      muted: false,
      tone: "danger",
      css: {
        color: "fg.danger",
      },
    },
    {
      muted: false,
      tone: "warning",
      css: {
        color: "fg.warning",
      },
    },
    {
      muted: false,
      tone: "success",
      css: {
        color: "fg.success",
      },
    },
    {
      muted: false,
      tone: "info",
      css: {
        color: "fg.info",
      },
    },
    {
      muted: true,
      tone: "neutral",
      css: {
        color: "fg.neutral.placeholder",
      },
    },
    {
      muted: true,
      tone: "brand",
      css: {
        color: "fg.brand.hover",
      },
    },
    {
      muted: true,
      tone: "danger",
      css: {
        color: "fg.danger",
      },
    },
    {
      muted: true,
      tone: "warning",
      css: {
        color: "fg.warning",
      },
    },
    {
      muted: true,
      tone: "success",
      css: {
        color: "fg.success",
      },
    },
    {
      muted: true,
      tone: "info",
      css: {
        color: "fg.info",
      },
    },
  ],
});
