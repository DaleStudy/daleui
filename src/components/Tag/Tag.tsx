import {
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

type TagPropsWithLink = BaseTagProps &
  Omit<HTMLAttributes<HTMLAnchorElement>, "style"> & {
    /** true시 a 태그, false/생략시 span 태그로 렌더링 */
    link: true;
  };

type TagPropsWithoutLink = BaseTagProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "style"> & {
    /** true시 a 태그, false/생략시 span 태그로 렌더링 */
    link?: false;
  };

type TagProps = TagPropsWithLink | TagPropsWithoutLink;

/**
 * - `tone` 속성으로 태그의 색조를 지정할 수 있습니다.
 * - `removable` 속성을 사용하여 제거 가능한 태그로 만들 수 있습니다.
 * - `link` 속성을 사용하여 링크 스타일을 적용할 수 있습니다.
 *   - `link={true}`일 때는 `a` 태그로 렌더링되며, `href`, `target` 등 `a` 태그의 모든 속성을 사용할 수 있습니다.
 *   - `link={false}` 또는 생략시에는 `span` 태그로 렌더링됩니다.
 */
export function Tag({
  children,
  tone = "neutral",
  removable = false,
  link = false,
  onClick,
  ...rest
}: TagProps) {
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemoveClick = (e: MouseEvent) => {
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

  const Element = link ? "a" : "span";

  if (isRemoved) {
    return null;
  }

  return (
    <Element
      className={styles({ tone, link })}
      role={link ? "link" : undefined}
      tabIndex={link ? 0 : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={handleRemoveClick}
          onKeyDown={handleRemoveKeyDown}
          className={removeButtonStyles()}
          aria-label="제거"
        >
          <Icon name="x" size="xs" />
        </button>
      )}
    </Element>
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
        "&:active": {
          bg: "bgSolid.neutral.active",
        },
        "&:focus-visible": {
          outlineWidth: "{borderWidths.lg}",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
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
        "&:focus-visible": {
          outlineWidth: "{borderWidths.lg}",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
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
        "&:focus-visible": {
          outlineWidth: "{borderWidths.lg}",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
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
        "&:focus-visible": {
          outlineWidth: "{borderWidths.lg}",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
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
        "&:focus-visible": {
          outlineWidth: "{borderWidths.lg}",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
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
        "&:focus-visible": {
          outlineWidth: "{borderWidths.lg}",
          outlineColor: "border.brand.focus",
          outlineOffset: "2",
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
      outlineColor: "border.brand.focus",
      outlineOffset: "2",
      outlineStyle: "solid",
    },
  },
});
