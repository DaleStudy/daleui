import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Skeleton } from "./Skeleton";

/** 플레이스홀더(시각적 스켈레톤 박스)는 aria-hidden 으로 표시됩니다. */
function getPlaceholder(container: HTMLElement) {
  return container.querySelector('[aria-hidden="true"]');
}

function getPlaceholders(container: HTMLElement) {
  return container.querySelectorAll('[aria-hidden="true"]');
}

/** 래퍼는 aria-busy 로 로딩 상태를 알립니다. */
function getWrapper(container: HTMLElement) {
  return container.querySelector("[aria-busy]");
}

/** 추론 모드에서 자식은 visibility:hidden(vis_hidden) 으로 감싸집니다. */
function getHiddenChild(container: HTMLElement) {
  return container.querySelector(".vis_hidden");
}

describe("Skeleton 모양 변형", () => {
  test("text 변형은 sm 반경의 블록으로 렌더링됨", () => {
    const { container } = render(<Skeleton variant="text" />);
    const placeholder = getPlaceholder(container);
    expect(placeholder).toHaveClass("bdr_sm");
    expect(placeholder).toHaveClass("d_block");
  });

  test("circular 변형은 full 반경의 원형으로 렌더링됨", () => {
    const { container } = render(<Skeleton variant="circular" width={40} />);
    const placeholder = getPlaceholder(container);
    expect(placeholder).toHaveClass("bdr_full");
    expect(placeholder).toHaveClass("d_inline-block");
  });

  test("rectangular 변형은 직각 모서리(반경 0)로 렌더링됨", () => {
    const { container } = render(
      <Skeleton variant="rectangular" width={80} height={40} />,
    );
    expect(getPlaceholder(container)).toHaveClass("bdr_0");
  });

  test("rounded 변형은 md 반경으로 렌더링됨", () => {
    const { container } = render(
      <Skeleton variant="rounded" width={80} height={40} />,
    );
    expect(getPlaceholder(container)).toHaveClass("bdr_md");
  });
});

describe("Skeleton 크기 지정", () => {
  test("숫자 width/height는 px로 변환됨", () => {
    const { container } = render(
      <Skeleton variant="rectangular" width={120} height={32} />,
    );
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder.style.width).toBe("120px");
    expect(placeholder.style.height).toBe("32px");
  });

  test("문자열 width/height는 그대로 사용됨", () => {
    const { container } = render(
      <Skeleton variant="rectangular" width="50%" height="2rem" />,
    );
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder.style.width).toBe("50%");
    expect(placeholder.style.height).toBe("2rem");
  });
});

describe("Skeleton 로딩 모델", () => {
  test("loading=false이고 자식이 있으면 자식을 렌더링하고 플레이스홀더는 없음", () => {
    const { container } = render(
      <Skeleton loading={false}>
        <span>실제 콘텐츠</span>
      </Skeleton>,
    );
    expect(screen.getByText("실제 콘텐츠")).toBeInTheDocument();
    expect(getPlaceholder(container)).not.toBeInTheDocument();
  });

  test("loading=true이고 자식이 있으면 플레이스홀더를 렌더링하고 자식은 숨김", () => {
    const { container } = render(
      <Skeleton loading={true}>
        <span>실제 콘텐츠</span>
      </Skeleton>,
    );
    const placeholder = getPlaceholder(container);
    expect(placeholder).toBeInTheDocument();
    // 자식은 레이아웃 예약을 위해 visibility:hidden 으로 감싸짐
    const hiddenChild = getHiddenChild(container);
    expect(hiddenChild).toHaveTextContent("실제 콘텐츠");
    expect(hiddenChild).toHaveClass("vis_hidden");
  });

  test("자식이 없는 단독 스켈레톤은 loading 값과 무관하게 항상 플레이스홀더를 보여줌", () => {
    const { container: loadingContainer } = render(<Skeleton />);
    expect(getPlaceholder(loadingContainer)).toBeInTheDocument();

    const { container: notLoadingContainer } = render(
      <Skeleton loading={false} />,
    );
    expect(getPlaceholder(notLoadingContainer)).toBeInTheDocument();
  });
});

describe("Skeleton 애니메이션", () => {
  test("회색 애니메이션(pulse)은 bg.skeleton 채움과 pulse 키프레임을 사용함", () => {
    const { container } = render(<Skeleton animation="pulse" />);
    const className = getPlaceholder(container)?.className ?? "";
    expect(className).toContain("bg-c_bg.skeleton");
    expect(className).toContain("anim_pulse");
    expect(className).not.toContain("gradient-brand");
  });

  test("wave 애니메이션은 회색 ::after 광택 오버레이를 사용함", () => {
    const { container } = render(<Skeleton animation="wave" />);
    const className = getPlaceholder(container)?.className ?? "";
    expect(className).toContain("::after]:anim_wave");
    expect(className).toContain("bg.skeleton.highlight");
    expect(className).not.toContain("gradient-brand");
    expect(className).not.toContain("skeleton.brand");
  });

  test("dalewave는 옅게 씻어낸 보라 바탕 위로 청록 웨이브(::after)가 흐름(풀컬러/미끄러지는 그라데이션 아님)", () => {
    const { container } = render(<Skeleton animation="dalewave" />);
    const className = getPlaceholder(container)?.className ?? "";
    // 옅은 보라 바탕(bg.skeleton.brand) + 옅은 청록 광택(brandHighlight). 풀컬러 톤이 아닙니다.
    expect(className).toContain("bg-c_bg.skeleton.brand");
    expect(className).toContain("::after]:anim_wave");
    expect(className).toContain("brandHighlight");
    expect(className).not.toContain("gradient-brand");
    expect(className).not.toContain("violet.9");
  });

  test("dalepulse는 옅게 씻어낸 브랜드 그라데이션을 쓰고 회색 광택(::after)은 쓰지 않음", () => {
    const { container } = render(<Skeleton animation="dalepulse" />);
    const className = getPlaceholder(container)?.className ?? "";
    // 풀컬러 --gradient-brand가 아니라 옅은 스켈레톤 브랜드 토큰으로 그라데이션을 구성합니다.
    expect(className).toContain("bg.skeleton.brandHighlight");
    expect(className).toContain("anim_dalepulse");
    expect(className).not.toContain("::after]:anim_wave");
    expect(className).not.toContain("gradient-brand");
  });
});

describe("Skeleton 접근성", () => {
  test("플레이스홀더는 aria-hidden, 래퍼는 aria-busy를 가짐", () => {
    const { container } = render(<Skeleton />);
    const placeholder = getPlaceholder(container);
    expect(placeholder).toHaveAttribute("aria-hidden", "true");

    const wrapper = getWrapper(container);
    expect(wrapper).toHaveAttribute("aria-busy", "true");
  });

  test("aria-busy는 loading 상태를 반영함", () => {
    const { container } = render(
      <Skeleton loading={false}>
        <span>콘텐츠</span>
      </Skeleton>,
    );
    expect(getWrapper(container)).toHaveAttribute("aria-busy", "false");
  });
});

describe("Skeleton 모션 축소(prefers-reduced-motion)", () => {
  test("모든 애니메이션은 prefers-reduced-motion 미디어 쿼리 뒤에 게이트되어 축소 시 정적 채움이 됨", () => {
    // happy-dom 은 CSS 미디어 쿼리를 평가하지 않으므로, 애니메이션이 무조건 적용되지 않고
    // prefers-reduced-motion 조건 뒤에 게이트되어 있음을 클래스 이름으로 검증합니다.
    for (const animation of [
      "pulse",
      "wave",
      "dalewave",
      "dalepulse",
    ] as const) {
      const { container } = render(<Skeleton animation={animation} />);
      const className = getPlaceholder(container)?.className ?? "";
      expect(className).toContain("prefers-reduced-motion");
    }
  });

  test("animation=false는 어떤 애니메이션도 적용하지 않음", () => {
    const { container } = render(<Skeleton animation={false} />);
    const className = getPlaceholder(container)?.className ?? "";
    expect(className).not.toContain("anim_");
    expect(className).not.toContain("prefers-reduced-motion");
  });
});

describe("Skeleton.Text", () => {
  test("lines 개수만큼 줄을 렌더링하고 마지막 줄을 좁힘", () => {
    const { container } = render(<Skeleton.Text lines={3} />);
    const placeholders = getPlaceholders(container);
    expect(placeholders).toHaveLength(3);

    expect((placeholders[0] as HTMLElement).style.width).toBe("100%");
    expect((placeholders[1] as HTMLElement).style.width).toBe("100%");
    expect((placeholders[2] as HTMLElement).style.width).toBe("60%");
  });

  test("한 줄이면 마지막 줄 너비 기본값은 100%", () => {
    const { container } = render(<Skeleton.Text lines={1} />);
    const placeholders = getPlaceholders(container);
    expect(placeholders).toHaveLength(1);
    expect((placeholders[0] as HTMLElement).style.width).toBe("100%");
  });

  test("lastLineWidth로 마지막 줄 너비를 지정할 수 있음", () => {
    const { container } = render(
      <Skeleton.Text lines={2} lastLineWidth="40%" />,
    );
    const placeholders = getPlaceholders(container);
    expect((placeholders[1] as HTMLElement).style.width).toBe("40%");
  });

  test("loading=false이고 자식이 있으면 자식을 렌더링함", () => {
    const { container } = render(
      <Skeleton.Text loading={false}>
        <p>실제 문단</p>
      </Skeleton.Text>,
    );
    expect(screen.getByText("실제 문단")).toBeInTheDocument();
    expect(getPlaceholder(container)).not.toBeInTheDocument();
  });
});

describe("Skeleton.Avatar", () => {
  test("size 크기의 원형 박스를 렌더링함", () => {
    const { container } = render(<Skeleton.Avatar size={48} />);
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder).toHaveClass("bdr_full");
    expect(placeholder.style.width).toBe("48px");
    expect(placeholder.style.height).toBe("48px");
  });

  test("기본 size는 40px", () => {
    const { container } = render(<Skeleton.Avatar />);
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder.style.width).toBe("40px");
    expect(placeholder.style.height).toBe("40px");
  });
});
