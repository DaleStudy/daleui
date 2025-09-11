import {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useState,
} from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";
import { Icon } from "../Icon/Icon";

type BaseTagProps = {
  /** 태그 내용 */
  children: ReactNode;
  /** 색조 */
  tone?: Tone;
  /** 제거 가능 여부 */
  removable?: boolean;
};

/** href가 있으면 자동으로 <a> 로 렌더링 */
type TagAsLink = BaseTagProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "children"> & {
    href: string;
  };

/** href가 없으면 <span> 로 렌더링 */
type TagAsSpan = BaseTagProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "style" | "children"> & {
    href?: never;
  };

export type TagProps = TagAsLink | TagAsSpan;

/**
 * - `tone` 색조를 지정합니다.
 * - `removable` 로 제거 가능한 태그를 만들 수 있습니다.
 * - `href` 유무로 링크 태그(`<a>`) 또는 일반 태그(`<span>`)로 자동 선택됩니다.
 */
export function Tag({
  children,
  tone = "neutral",
  removable = false,
  href,
  ...rest
}: TagProps) {
  const [isRemoved, setIsRemoved] = useState(false);

  if (isRemoved) return null;

  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    // 링크 클릭/네비게이션과 충돌 방지
    e.preventDefault();
    e.stopPropagation();
    setIsRemoved(true);
  };

  const handleRemoveKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      setIsRemoved(true);
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
      <a
        href={href}
        target={target}
        rel={rel}
        className={styles({ tone, link: true })}
        {...anchorRest}
      >
        {children}
        {removable && (
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
      </a>
    );
  }

  const spanRest = rest as HTMLAttributes<HTMLSpanElement>;

  return (
    <span className={styles({ tone, link: false })} {...spanRest}>
      {children}
      {removable && (
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
    "&:focus-visible": {
      outlineWidth: "{borderWidths.lg}",
      outlineColor: "border.brand.focus",
      outlineOffset: "2",
    },
  },
  variants: {
    tone: {
      neutral: {
        bg: "bgSolid.neutral",
        color: "fgSolid.neutral",
        "&:hover": {
          bg: "bgSolid.neutral.hover",
        },
        "&:active": {
          bg: "bgSolid.neutral.active",
        },
      },
      brand: {
        bg: "bgSolid.brand",
        color: "fgSolid.brand",
        "&:hover": {
          bg: "bgSolid.brand.hover",
        },
        "&:active": {
          bg: "bgSolid.brand.active",
        },
      },
      danger: {
        bg: "bgSolid.danger",
        color: "fgSolid.danger",
        "&:hover": {
          bg: "bgSolid.danger.hover",
        },
        "&:active": {
          bg: "bgSolid.danger.active",
        },
      },
      warning: {
        bg: "bgSolid.warning",
        color: "fgSolid.warning",
        "&:hover": {
          bg: "bgSolid.warning.hover",
        },
        "&:active": {
          bg: "bgSolid.warning.active",
        },
      },
      success: {
        bg: "bgSolid.success",
        color: "fgSolid.success",
        "&:hover": {
          bg: "bgSolid.success.hover",
        },
        "&:active": {
          bg: "bgSolid.success.active",
        },
      },
      info: {
        bg: "bgSolid.info",
        color: "fgSolid.info",
        "&:hover": {
          bg: "bgSolid.info.hover",
        },
        "&:active": {
          bg: "bgSolid.info.active",
        },
      },
    },
    link: {
      true: {
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      },
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
      outlineOffset: "2",
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
  },
});
