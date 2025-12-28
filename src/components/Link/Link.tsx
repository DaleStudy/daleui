import { type AnchorHTMLAttributes } from "react";
import { css, cva } from "../../../styled-system/css";
import { textStyles } from "../../tokens/typography";

type LinkSize = "sm" | "md" | "lg";
type LinkTone = "neutral" | "brand";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 링크 URL (필수) */
  href: string;
  /** 링크 내용, 아이콘, 이미지 등 (필수) */
  children: React.ReactNode;
  /** 링크의 색조 */
  tone?: LinkTone;
  /** 링크의 크기 */
  size?: LinkSize;
  /** 링크에 밑줄 표시 여부 */
  underline?: boolean;
  /** 새창에서 열지 여부 */
  external?: boolean;
}

/**
 * - `underline` 속성으로 밑줄 표시 여부를 설정할 수 있습니다. 기본값은 `true`입니다.
 * - `tone` 속성을 통해서 링크의 색상을 변경할 수 있습니다. 기본값은 `brand`입니다.
 * - `size` 속성을 통해서 텍스트 크기를 변경할 수 있습니다.
 * -  아이콘 등 컴포넌트를 사용시 링크와 다른 `Tone`, `Size`를 사용하지 않도록 주의합니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이 컴포넌트는 `<a>` 태그를 사용하여 시맨틱하게 구현되어 있습니다.
 * - `external`을 true로 설정하면 `target="_blank"`와 `rel="noopener noreferrer"`가 자동으로 추가되어 보안 및 접근성이 향상됩니다.
 * - `external`을 true로 설정하더라도 `target`과 `rel` 속성을 직접 설정할 수 있습니다.
 * - 키보드 포커스 시 명확한 아웃라인이 표시됩니다.
 * - 텍스트가 없는 이미지나 아이콘만 사용하는 경우, 반드시 `aria-label` 속성을 추가하여 대체 텍스트를 제공하는 것을 권장합니다.
 * - `external` 속성이 `true` 일 때, 외부 링크 아이콘(externalLink)이 함께 제공되지 않으면 시각적 안내 부족으로 접근성 문제가 발생할 수 있습니다.
 */
export function Link({
  href,
  children,
  tone = "brand",
  size = "md",
  underline = true,
  external = false,
  ...props
}: LinkProps) {
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;

  return (
    <a
      className={css(
        styles.raw({ tone, underline, size }),
        textStyles.label[size].DEFAULT.value,
      )}
      href={href}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}

const styles = cva({
  base: {
    transition: "colors 0.2s",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    "&:focus": {
      outline: "borderWidths.lg solid",
      borderRadius: "md",
      outlineColor: "border.brand.focus",
    },
    "&:visited": {
      color: "fg.brand.visited",
      "& svg": {
        color: "fg.brand.visited",
      },
    },
  },
  variants: {
    tone: {
      brand: {
        color: "fg.brand",
        "&:focus": {
          color: "fg.brand.focus",
        },
        "&:active, &:hover": {
          color: "fg.brand.hover",
        },
      },
      neutral: {
        color: "fg.neutral",
        "&:focus": {
          color: "fg.neutral.focus",
        },
        "&:active, &:hover": {
          color: "fg.neutral.hover",
        },
      },
    },
    size: {
      sm: {
        gap: "2",
      },
      md: {
        gap: "4",
      },
      lg: {
        gap: "4",
      },
    },
    underline: {
      true: {
        textDecoration: "underline",
      },
      false: {
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
  defaultVariants: {
    tone: "brand",
    size: "md",
    underline: true,
  },
});
