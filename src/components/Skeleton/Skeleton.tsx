import type { CSSProperties, HTMLAttributes, Ref } from "react";
import { cva } from "../../../styled-system/css";
import { VStack } from "../VStack/VStack";

/** 스켈레톤의 모양 변형 */
export type SkeletonVariant = "text" | "circular" | "rounded";

/**
 * 스켈레톤의 애니메이션.
 * `pulse`는 중성 회색 모션이고, `false`는 애니메이션 없이 정적인 회색으로 채웁니다.
 */
export type SkeletonAnimation = "pulse" | false;

export interface SkeletonProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "style" | "children"
> {
  /**
   * 모양.
   * - `text`: 둘러싼 글자 크기에 맞춰 높이가 자동 조절됩니다(기본값).
   * - `circular`: 정원형. `width`/`height`(또는 `Skeleton.Avatar`의 `size`)로 크기를 지정합니다.
   * - `rounded`: `md` 반경의 둥근 모서리.
   */
  variant?: SkeletonVariant;
  /**
   * 모션.
   * `pulse`는 중성 회색, `false`는 정적입니다.
   * 모든 애니메이션은 `prefers-reduced-motion: reduce` 환경에서 자동으로 정적 채움으로 대체됩니다.
   */
  animation?: SkeletonAnimation;
  /** 너비. 숫자는 `px`로, 문자열은 그대로 사용합니다. */
  width?: string | number;
  /** 높이. 숫자는 `px`로, 문자열은 그대로 사용합니다. */
  height?: string | number;
  /** 요소 참조 */
  ref?: Ref<HTMLElement>;
}

function toCssSize(value?: string | number): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === "number" ? `${value}px` : value;
}

function SkeletonRoot({
  ref,
  variant = "text",
  animation = "pulse",
  width,
  height,
  className,
  ...rest
}: SkeletonProps) {
  const style: CSSProperties = {
    width: toCssSize(width),
    height: toCssSize(height),
  };

  return (
    <span ref={ref} aria-busy={true} className={className} {...rest}>
      <span
        aria-hidden="true"
        style={style}
        className={placeholderStyles({
          variant,
          animation: animation === false ? "none" : animation,
        })}
      />
    </span>
  );
}

export interface SkeletonTextProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "style" | "children"
> {
  /** 줄 수 */
  lines?: number;
  /** 마지막 줄의 너비. 기본값은 `lines > 1`일 때 `"60%"`, 그 외에는 `"100%"`입니다. */
  lastLineWidth?: string;
  /** 모션. `Skeleton`과 동일한 값입니다. */
  animation?: SkeletonAnimation;
  /** 요소 참조 */
  ref?: Ref<HTMLElement>;
}

function SkeletonText({
  ref,
  lines = 1,
  lastLineWidth,
  animation = "pulse",
  className,
  ...rest
}: SkeletonTextProps) {
  const resolvedLastLineWidth = lastLineWidth ?? (lines > 1 ? "60%" : "100%");

  return (
    <VStack
      ref={ref}
      as="span"
      align="stretch"
      gap="4"
      aria-busy={true}
      className={className}
      {...rest}
    >
      {Array.from({ length: lines }, (_, index) => (
        <SkeletonRoot
          key={index}
          variant="text"
          animation={animation}
          width={index === lines - 1 ? resolvedLastLineWidth : "100%"}
        />
      ))}
    </VStack>
  );
}

export interface SkeletonAvatarProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "style" | "children"
> {
  /** 지름. 숫자는 `px`로, 문자열은 그대로 사용합니다. */
  size?: string | number;
  /** 모션. `Skeleton`과 동일한 값입니다. */
  animation?: SkeletonAnimation;
  /** 요소 참조 */
  ref?: Ref<HTMLElement>;
}

function SkeletonAvatar({
  ref,
  size = 40,
  animation = "pulse",
  className,
  ...rest
}: SkeletonAvatarProps) {
  return (
    <SkeletonRoot
      ref={ref}
      variant="circular"
      width={size}
      height={size}
      animation={animation}
      className={className}
      {...rest}
    />
  );
}

const placeholderStyles = cva({
  base: {
    backgroundColor: "bg.skeleton",
  },
  variants: {
    variant: {
      text: {
        display: "block",
        width: "100%",
        height: "1.2em",
        borderRadius: "sm",
        // 글자처럼 보이도록 세로로 눌러 표현합니다(레이아웃 높이는 1.2em을 유지).
        transform: "scale(1, 0.6)",
        transformOrigin: "0 60%",
      },
      circular: {
        display: "inline-block",
        borderRadius: "full",
      },
      rounded: {
        display: "inline-block",
        borderRadius: "md",
      },
    },
    animation: {
      none: {},
      pulse: {
        // prefers-reduced-motion 환경에서는 애니메이션을 적용하지 않아 정적 채움이 됩니다.
        "@media (prefers-reduced-motion: no-preference)": {
          animation: "pulse 1.6s ease-in-out infinite",
        },
      },
    },
  },
  defaultVariants: {
    variant: "text",
    animation: "pulse",
  },
});

/**
 * 콘텐츠가 로딩되는 동안 자리를 표시하는 플레이스홀더(스켈레톤) 컴포넌트입니다.
 *
 * - `variant`로 모양(텍스트/원형/둥근 사각형)을 고릅니다.
 * - `animation`으로 모션을 고릅니다. `pulse`는 중성 회색 모션이고, `false`는 정적입니다.
 * - 플레이스홀더는 `aria-hidden`으로 가려지고, 래퍼는 `aria-busy`로 로딩 상태를 알립니다.
 * - 모든 애니메이션은 `prefers-reduced-motion: reduce` 환경에서 정적 채움으로 대체됩니다.
 */
export const Skeleton = Object.assign(SkeletonRoot, {
  /**
   * 여러 줄의 텍스트 플레이스홀더입니다. `lines`로 줄 수를, `lastLineWidth`로 마지막 줄 너비를 조절합니다.
   */
  Text: SkeletonText,
  /**
   * 원형 아바타 플레이스홀더입니다. `size`로 지름을 지정합니다.
   */
  Avatar: SkeletonAvatar,
});
