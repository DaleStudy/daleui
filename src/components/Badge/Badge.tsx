import React, { type HTMLAttributes } from "react";
import { cva } from "../../../styled-system/css";

type BadgeVariant = "solid" | "outline";

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  /** 배지 내용 */
  children: React.ReactNode;
  /** 배지 스타일 종류 */
  variant?: BadgeVariant;
  /** 제거 가능 여부 */
  removable?: boolean;
  /** 링크 여부 */
  link?: boolean;
  /** 제거 시 실행함수 */
  onRemove?: () => void;
  /** 클릭 시 실행함수 */
  onClick?: () => void;
}

/**
 * - `variant` 속성으로 배지의 스타일 종류를 지정할 수 있습니다.
 * - `removable` 속성을 사용하여 제거 가능한 배지로 만들 수 있습니다.
 * - `link` 속성을 사용하여 링크 스타일을 적용할 수 있습니다.
 */
export const Badge = ({
  children,
  variant = "solid",
  removable = false,
  link = false,
  onRemove,
  onClick,
  ...rest
}: BadgeProps) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  const handleClick = () => {
    if (link || onClick) {
      onClick?.();
    }
  };

  const Tag = link ? "a" : "span";

  return (
    <Tag
      className={styles({ variant, removable, link })}
      onClick={handleClick}
      role={link ? "link" : undefined}
      tabIndex={link ? 0 : undefined}
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
    </Tag>
  );
};

const styles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4",
    px: "8",
    py: "4",
    borderRadius: "sm",
    fontSize: "sm",
    fontWeight: "medium",
    lineHeight: "1",
    cursor: "default",
    transition: "0.2s",
  },
  variants: {
    variant: {
      solid: {
        bg: "bg.neutral",
        color: "fg.neutral",
      },
      outline: {
        border: "neutral",
        borderWidth: "sm",
        bg: "transparent",
        color: "fg.neutral",
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
          opacity: "0.8",
        },
        "&:focus-visible": {
          outline: "neutral",
          outlineWidth: "lg",
          outlineOffset: "2",
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
    width: "16",
    height: "16",
    borderRadius: "full",
    border: "none",
    bg: "transparent",
    color: "inherit",
    cursor: "pointer",
    fontSize: "xs",
    lineHeight: "1",
    transition: "0.2s",
    "&:hover": {
      bg: "bg.neutral.hover",
    },
    "&:focus-visible": {
      outline: "neutral",
      outlineWidth: "sm",
      outlineOffset: "1",
    },
  },
});
