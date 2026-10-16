import type { HTMLAttributes, Ref } from "react";
import { css, cva, cx } from "../../../styled-system/css";
import { visuallyHidden } from "../../../styled-system/patterns";
import { Icon } from "../Icon/Icon";

/** 스피너의 크기 */
export type SpinnerSize = "sm" | "md";

/** 스피너의 색조 */
export type SpinnerTone = "brand" | "neutral";

export interface SpinnerProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "style" | "children"
> {
  /** 크기 */
  size?: SpinnerSize;
  /** 색조 */
  tone?: SpinnerTone;
  /**
   * 스크린 리더에 읽히는 로딩 설명.
   * `null` 전달 시 장식용으로 간주되어 `aria-hidden` 처리됨.
   */
  label?: string | null;
  /** 요소 참조 */
  ref?: Ref<HTMLSpanElement>;
}

/**
 * 스피너(Spinner)는 화면이 멈춘 것이 아니라 데이터가 열심히 불러와지는 중임을 알려주고(진행 상태 표현), 사용자가 이탈하지 않고 다음 화면을 차분히 기다릴 수 있도록(시각적 피드백 제공) 도와주는 역할을 하는 기본 컴포넌트입니다.
 *
 * - 남은 분량을 가늠할 수 있는 로딩에는 진행률 표시를, 콘텐츠의 자리와 모양을 미리 보여줄 수 있는 로딩에는 `Skeleton`을 사용하세요.
 * - 버튼이 제출 중임을 알릴 때는 `Button`의 `loading`을 사용하세요.
 *
 * ### 접근성(Accessibility) 안내
 * - 기본적으로 `role="status"`로 렌더링되어 `label`("로딩 중")이 라이브 리전으로 읽힙니다.
 * - 이미 로딩 상태를 알리는 영역(`aria-busy`를 쓰는 영역, `Button`의 `loading` 등) 안에서는
 *   `label={null}`로 장식용 처리해 같은 안내가 두 번 읽히지 않게 하세요.
 * - 회전 모션이 로딩을 전달하는 유일한 시각 신호이므로 `prefers-reduced-motion: reduce` 환경에서도
 *   멈추지 않고, 대신 느리게 회전합니다.
 */
export function Spinner({
  ref,
  size = "md",
  tone = "brand",
  label = "로딩 중",
  className,
  ...rest
}: SpinnerProps) {
  const decorative = label === null;

  return (
    <span
      ref={ref}
      role={decorative ? undefined : "status"}
      aria-hidden={decorative ? true : undefined}
      className={cx(styles({ size }), className)}
      {...rest}
    >
      <Icon
        name="loaderCircle"
        size={size}
        tone={tone}
        className={spinStyles}
      />
      {!decorative && <span className={visuallyHidden()}>{label}</span>}
    </span>
  );
}

const styles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: { width: "4", height: "4" },
      md: { width: "5", height: "5" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const spinStyles = css({
  animation: "spin 1s linear infinite",
  "@media (prefers-reduced-motion: reduce)": {
    animationDuration: "2s",
  },
});
