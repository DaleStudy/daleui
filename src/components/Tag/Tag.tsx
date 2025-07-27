import {
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useState,
} from "react";
import { cva } from "../../../styled-system/css";
import type { Tone } from "../../tokens/colors";

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
    /** 링크 여부 */
    link: true;
  };

type TagPropsWithoutLink = BaseTagProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "style"> & {
    /** 링크 여부 */
    link?: false;
  };

type TagProps = TagPropsWithLink | TagPropsWithoutLink;

/**
 * - `tone` 속성으로 태그의 색조를 지정할 수 있습니다.
 * - `removable` 속성을 사용하여 제거 가능한 태그로 만들 수 있습니다.
 * - `link` 속성을 사용하여 링크 스타일을 적용할 수 있습니다.
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

  const Element = link ? "a" : "span";

  if (isRemoved) {
    return null;
  }

  return (
    <Element
      className={styles({ tone, removable, link })}
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
          className={removeButtonStyles()}
          aria-label="제거"
          tabIndex={-1}
        >
          ×
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
    fontSize: "sm",
    fontWeight: "medium",
    lineHeight: "tight",
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
          outlineWidth: "lg",
          outlineStyle: "solid",
          outlineColor: "border.neutral.active",
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
          outlineWidth: "lg",
          outlineStyle: "solid",
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
          outlineWidth: "lg",
          outlineStyle: "solid",
          outlineColor: "border.danger",
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
          outlineWidth: "lg",
          outlineStyle: "solid",
          outlineColor: "border.warning",
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
          outlineWidth: "lg",
          outlineStyle: "solid",
          outlineColor: "border.success",
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
          outlineWidth: "lg",
          outlineStyle: "solid",
          outlineColor: "border.info",
          outlineOffset: "2",
        },
      },
    },
    removable: {
      true: {},
      false: {},
    },
    link: {
      true: {
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      },
      false: {},
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
    fontSize: "xs",
    lineHeight: "tight",
    transition: "0.2s",
    "&:focus-visible": {
      outlineWidth: "sm",
      outlineStyle: "solid",
      outlineColor: "border.neutral",
      outlineOffset: "2",
    },
  },
});
