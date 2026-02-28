import {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { css, cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { Icon } from "../Icon/Icon";

type BaseTagProps = {
  /** 태그 내용 */
  children: ReactNode;
  /** 태그의 색조 */
  tone?: Tone;
  /** `onRemove` 핸들러가 설정되면 제거 버튼(X)이 표시됩니다. */
  onRemove?: () => void;
};

/** href가 있으면 자동으로 <a> 로 렌더링 */
type TagAsLink = BaseTagProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "children"> & {
    /* 링크 태그(`<a>`) 또는 일반 태그(`<span>`)로 자동 선택됩니다. */
    href: string;
  };

/** href가 없으면 <span> 로 렌더링 */
type TagAsSpan = BaseTagProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "style" | "children"> & {
    href?: never;
  };

export type TagProps = TagAsLink | TagAsSpan;

export function Tag({
  children,
  tone = "neutral",
  href,
  onRemove,
  ...rest
}: TagProps) {

  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    // 링크 클릭/네비게이션과 충돌 방지
    e.preventDefault();
    e.stopPropagation();
    onRemove?.();
  };

  const handleRemoveKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      onRemove?.();
    }
  };

  if (href) {
    const {
      target: propTarget,
      rel: propRel,
      ...anchorRest
    } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    const target = propTarget;
    const rel =
      target === "_blank" ? (propRel ?? "noopener noreferrer") : propRel;

    return (
      <span className={styles({ tone, link: true })}>
        <a
          href={href}
          target={target}
          rel={rel}
          className={linkOverlayStyles}
          {...anchorRest}
        >
          {children}
        </a>
        {onRemove && (
          <button
            type="button"
            onClick={handleRemoveClick}
            onKeyDown={handleRemoveKeyDown}
            className={removeButtonStyles({ tone, elevated: true })}
            aria-label="제거"
          >
            <Icon name="x" size="xs" />
          </button>
        )}
      </span>
    );
  }

  const spanRest = rest as HTMLAttributes<HTMLSpanElement>;

  return (
    <span className={styles({ tone, link: false })} {...spanRest}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={handleRemoveClick}
          onKeyDown={handleRemoveKeyDown}
          className={removeButtonStyles({ tone })}
          aria-label="제거"
        >
          <Icon name="x" size="xs" />
        </button>
      )}
    </span>
  );
}

const styles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4",
    px: "12",
    py: "4",
    height: "8",
    borderRadius: "full",
    textStyle: "label.sm",
    cursor: "default",
    transition: "0.2s",
  },
  variants: {
    tone: {
      neutral: {
        bg: "bgSolid.neutral",
        color: "fgSolid.neutral",
        "&:hover": {
          bg: "bgSolid.neutral.hover",
        },
        "&:has(a:active)": {
          bg: "bgSolid.neutral.active",
        },
      },
      brand: {
        bg: "bgSolid.brand",
        color: "fgSolid.brand",
        "&:hover": {
          bg: "bgSolid.brand.hover",
        },
        "&:has(a:active)": {
          bg: "bgSolid.brand.active",
        },
      },
      danger: {
        bg: "bgSolid.danger",
        color: "fgSolid.danger",
        "&:hover": {
          bg: "bgSolid.danger.hover",
        },
        "&:has(a:active)": {
          bg: "bgSolid.danger.active",
        },
      },
      warning: {
        bg: "bgSolid.warning",
        color: "fgSolid.warning",
        "&:hover": {
          bg: "bgSolid.warning.hover",
        },
        "&:has(a:active)": {
          bg: "bgSolid.warning.active",
        },
      },
      success: {
        bg: "bgSolid.success",
        color: "fgSolid.success",
        "&:hover": {
          bg: "bgSolid.success.hover",
        },
        "&:has(a:active)": {
          bg: "bgSolid.success.active",
        },
      },
      info: {
        bg: "bgSolid.info",
        color: "fgSolid.info",
        "&:hover": {
          bg: "bgSolid.info.hover",
        },
        "&:has(a:active)": {
          bg: "bgSolid.info.active",
        },
      },
    },
    link: {
      true: {
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

const linkOverlayStyles = css({
  color: "inherit",
  textDecoration: "inherit",
  // 링크 전체 영역을 클릭할 수 있도록 하는 오버레이 스타일
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "0",
    borderRadius: "inherit",
  },
  "&:focus-visible": {
    outline: "none",
    "&::after": {
      borderRadius: "full",
      outlineWidth: "{borderWidths.lg}",
      outlineColor: "border.brand.focus",
      outlineOffset: "1px",
      outlineStyle: "solid",
    },
  },
});

const removeButtonStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4",
    height: "4",
    borderRadius: "full",
    border: "none",
    bg: "transparent",
    color: "inherit",
    cursor: "pointer",
    transition: "0.2s",
    "&:focus-visible": {
      outlineWidth: "{borderWidths.lg}",
      outlineOffset: "1px",
      outlineStyle: "solid",
    },
  },
  variants: {
    tone: {
      neutral: { "&:focus-visible": { outlineColor: "border.neutral.focus" } },
      brand: { "&:focus-visible": { outlineColor: "border.neutral.focus" } },
      danger: { "&:focus-visible": { outlineColor: "border.neutral.focus" } },
      success: { "&:focus-visible": { outlineColor: "border.neutral.focus" } },
      info: { "&:focus-visible": { outlineColor: "border.neutral.focus" } },
      warning: { "&:focus-visible": { outlineColor: "border.brand.focus" } },
    },
    // elevated는 focus-visible 시 제거 버튼이 태그 뒤에 가려지는 문제를 해결하기 위한 스타일입니다.
    elevated: {
      true: {
        position: "relative",
        zIndex: 1,
      },
    },
  },
});
