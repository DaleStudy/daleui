import { type HTMLAttributes, type Ref, useState } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";
import { getInitial } from "./getInitial";

/** 아바타의 크기 */
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "style" | "children"
> {
  /** 이미지 주소. 비어 있거나 불러오기에 실패하면 이니셜 → 대체 아이콘 순으로 표시됩니다. */
  src?: string;
  /** 사용자 이름. 이니셜을 만드는 데 쓰이고 이미지의 대체 텍스트가 됩니다. */
  name?: string;
  /** 크기. `sm`은 32px, `md`는 40px, `lg`는 48px입니다. */
  size?: AvatarSize;
  /** 요소 참조 */
  ref?: Ref<HTMLSpanElement>;
}

/** 표시 형태 */
type AvatarVariant = "image" | "initial" | "fallback";

/** 쓸 수 있는 값에 따라 이미지 → 이니셜 → 대체 아이콘 순으로 표시 형태를 고릅니다. */
function getVariant(canShowImage: boolean, initial: string): AvatarVariant {
  if (canShowImage) {
    return "image";
  }

  if (initial) {
    return "initial";
  }

  return "fallback";
}

/**
 * 아바타(Avatar)는 현재 로그인한 사용자나 콘텐츠 작성자의 프로필 이미지를 동그라미나 네모 형태로 시각화하고(사용자 식별 기능), 이미지가 없을 때는 이름의 이니셜이나 기본 아이콘을 대신 보여주어(대체 정보 제공) 서비스 내에서 사용자의 고유한 정체성과 소속감을 직관적으로 표현해 주는 기본 컴포넌트입니다.
 *
 * `src`가 있으면 이미지를, 없거나 불러오기에 실패하면 `name`으로 만든 이니셜을, 둘 다 없으면 대체 아이콘을 표시합니다.
 *
 * ### 이니셜 규칙
 * 한 글자만으로 구분되는 한글·한자·가나는 첫 글자만, 영문은 두 글자를 사용합니다.
 *
 * - `"서달레"` → `"서"`
 * - `"Dale Seo"` → `"DS"` (공백으로 나뉘면 각 단어의 첫 글자)
 * - `"dale"` → `"DA"` (한 단어면 앞 두 글자)
 *
 * ### 접근성(Accessibility) 안내
 * - `name`이 있으면 이미지의 대체 텍스트로 쓰입니다.
 * - `name`이 없으면 읽을 이름이 없어 아무것도 읽히지 않습니다.
 * - 이름이 필요한 자리(아바타만 있는 버튼, 아바타 묶음 등)에는 `aria-label`이나
 *   `aria-labelledby`를 직접 넘기면 그 이름으로 읽힙니다.
 */
export function Avatar({
  ref,
  src,
  name,
  size = "md",
  className,
  ...rest
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const initial = name ? getInitial(name) : "";
  const canShowImage = !!src && src !== failedSrc;
  const variant = getVariant(canShowImage, initial);
  const label = name?.trim() || undefined;
  const hasAccessibleName =
    label !== undefined ||
    rest["aria-label"] !== undefined ||
    rest["aria-labelledby"] !== undefined;

  return (
    <span
      ref={ref}
      role={hasAccessibleName ? "img" : undefined}
      aria-label={label}
      className={cx(styles({ size, variant }), className)}
      {...rest}
    >
      {variant === "image" && (
        <img
          src={src}
          alt=""
          className={imageStyles}
          onError={() => setFailedSrc(src)}
        />
      )}
      {variant === "initial" && <span>{initial}</span>}
      {variant === "fallback" && <Icon name="user" size={size} />}
    </span>
  );
}

const styles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "full",
    border: "brand",
    overflow: "hidden",
    userSelect: "none",
  },
  variants: {
    size: {
      sm: { width: "8", height: "8" },
      md: { width: "10", height: "10" },
      lg: { width: "12", height: "12" },
    },
    variant: {
      image: {},
      initial: {
        borderColor: "transparent",
        bg: "bgSolid.brand",
        color: "fgSolid.brand",
      },
      fallback: {
        borderColor: "transparent",
        bg: "bg.neutral.hover",
        color: "fg.neutral",
      },
    },
  },
  compoundVariants: [
    { size: "sm", variant: "initial", css: { textStyle: "label.sm" } },
    { size: "md", variant: "initial", css: { textStyle: "label.md" } },
    { size: "lg", variant: "initial", css: { textStyle: "label.lg" } },
  ],
});

const imageStyles = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
