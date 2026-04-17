import { type AnchorHTMLAttributes, type Ref } from "react";
import { css, cva } from "../../../styled-system/css";
import { textStyles } from "../../tokens/typography";

type LinkSize = "sm" | "md" | "lg";
type LinkTone = "neutral" | "brand";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 대상 URL */
  href: string;
  /** 링크 내용 */
  children: React.ReactNode;
  /** 색조 */
  tone?: LinkTone;
  /** 크기 */
  size?: LinkSize;
  /** 밑줄 표시 여부 */
  underline?: boolean;
  /** 외부 링크·새 탭 열기 여부 */
  external?: boolean;
  /** 요소 참조 */
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * 링크는 사용자를 다른 페이지, 동일 페이지 내의 특정 위치, 또는 외부 리소스로 이동시키는 네비게이션(Navigation) 요소입니다.
 * 사용자의 특정 행동을 유도할 때에는 버튼을 사용합니다.
 *
 * 아이콘 등 컴포넌트를 함께 사용할 때 링크와 다른 `tone`, `size`를 사용하지 않도록 주의합니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이 컴포넌트는 `<a>` 태그를 사용하여 시맨틱하게 구현되어 있습니다.
 * - `external`을 true로 설정하면 `target="_blank"`와 `rel="noopener noreferrer"`가 자동으로 추가됩니다. 직접 `target`, `rel`을 지정하면 override됩니다.
 * - 키보드 포커스 시 명확한 아웃라인이 표시됩니다.
 * - 텍스트가 없는 이미지나 아이콘만 사용하는 경우, 반드시 `aria-label` 속성을 추가하여 대체 텍스트를 제공하는 것을 권장합니다.
 * - `external`이 true일 때, 외부 링크 아이콘(`externalLink`)을 함께 제공하지 않으면 시각적 안내 부족으로 접근성 문제가 발생할 수 있습니다.
 */
export function Link({
  ref,
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
      ref={ref}
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
