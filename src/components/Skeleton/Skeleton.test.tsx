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
      <Skeleton variant="rounded" width={120} height={32} />,
    );
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder.style.width).toBe("120px");
    expect(placeholder.style.height).toBe("32px");
  });

  test("문자열 width/height는 그대로 사용됨", () => {
    const { container } = render(
      <Skeleton variant="rounded" width="50%" height="2rem" />,
    );
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder.style.width).toBe("50%");
    expect(placeholder.style.height).toBe("2rem");
  });
});

describe("Skeleton 애니메이션", () => {
  test("기본 애니메이션은 bg.skeleton 채움과 pulse 키프레임을 사용함", () => {
    const { container } = render(<Skeleton />);
    const className = getPlaceholder(container)?.className ?? "";
    expect(className).toContain("bg-c_bg.skeleton");
    expect(className).toContain("anim_pulse");
  });
});

describe("Skeleton 접근성", () => {
  test("장식용 플레이스홀더를 단일 span으로 렌더링하고 로딩 상태를 만들지 않음", () => {
    render(<Skeleton data-testid="skeleton" className="custom-skeleton" />);
    const placeholder = screen.getByTestId("skeleton");
    expect(placeholder).toBeEmptyDOMElement();
    expect(placeholder).toHaveAttribute("aria-hidden", "true");
    expect(placeholder).toHaveClass("custom-skeleton");
    expect(placeholder).not.toHaveAttribute("aria-busy");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("Skeleton 모션 축소(prefers-reduced-motion)", () => {
  test("pulse는 prefers-reduced-motion 미디어 쿼리 뒤에 게이트되어 축소 시 정적 채움이 됨", () => {
    // happy-dom 은 CSS 미디어 쿼리를 평가하지 않으므로, 애니메이션이 무조건 적용되지 않고
    // prefers-reduced-motion 조건 뒤에 게이트되어 있음을 클래스 이름으로 검증합니다.
    const { container } = render(<Skeleton animation="pulse" />);
    const className = getPlaceholder(container)?.className ?? "";
    expect(className).toContain("prefers-reduced-motion");
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
});

describe("Skeleton.Avatar", () => {
  test("diameter 크기의 원형 박스를 렌더링함", () => {
    const { container } = render(<Skeleton.Avatar diameter={48} />);
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder).toHaveClass("bdr_full");
    expect(placeholder.style.width).toBe("48px");
    expect(placeholder.style.height).toBe("48px");
  });

  test("기본 diameter는 40px", () => {
    const { container } = render(<Skeleton.Avatar />);
    const placeholder = getPlaceholder(container) as HTMLElement;
    expect(placeholder.style.width).toBe("40px");
    expect(placeholder.style.height).toBe("40px");
  });
});
