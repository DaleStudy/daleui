import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Spinner } from "./Spinner";

function getIcon(container: HTMLElement) {
  return container.querySelector("svg") as SVGElement;
}

function getIconClass(container: HTMLElement) {
  return getIcon(container).getAttribute("class") ?? "";
}

describe("Spinner 크기", () => {
  test("기본 크기는 md(20px)", () => {
    const { container } = render(<Spinner />);
    expect(getIcon(container)).toHaveClass("w_1.25rem", "h_1.25rem");
  });

  test("sm은 16px로 렌더링됨", () => {
    const { container } = render(<Spinner size="sm" />);
    expect(getIcon(container)).toHaveClass("w_1rem", "h_1rem");
  });
});

describe("Spinner 색조", () => {
  test("기본 색조는 brand", () => {
    const { container } = render(<Spinner />);
    expect(getIcon(container)).toHaveClass("c_fg.brand");
  });

  test("neutral 색조를 지정할 수 있음", () => {
    const { container } = render(<Spinner tone="neutral" />);
    expect(getIcon(container)).toHaveClass("c_fg.neutral");
  });
});

describe("Spinner 애니메이션", () => {
  test("spin 키프레임으로 회전함", () => {
    const { container } = render(<Spinner />);
    expect(getIconClass(container)).toContain("anim_spin");
  });

  test("모션 축소 환경에서도 멈추지 않고 느리게 회전함", () => {
    // happy-dom 은 CSS 미디어 쿼리를 평가하지 않으므로, 회전이 유지되면서
    // prefers-reduced-motion 조건에 속도만 재정의됨을 클래스 이름으로 검증합니다.
    const { container } = render(<Spinner />);
    const className = getIconClass(container);
    expect(className).toContain("anim_spin");
    expect(className).toContain("prefers-reduced-motion");
  });
});

describe("Spinner 접근성", () => {
  test("기본으로 '로딩 중'을 읽는 라이브 리전으로 렌더링됨", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("로딩 중");
  });

  test("label로 읽히는 설명을 바꿀 수 있음", () => {
    render(<Spinner label="주문을 처리하는 중" />);
    expect(screen.getByRole("status")).toHaveTextContent("주문을 처리하는 중");
  });

  test("label={null}은 장식용으로 취급되어 아무것도 읽히지 않음", () => {
    render(<Spinner label={null} data-testid="spinner" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveAttribute("aria-hidden", "true");
    expect(spinner).not.toHaveAttribute("role");
    expect(spinner).not.toHaveTextContent("로딩 중");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("Spinner 속성 전달", () => {
  test("className과 나머지 속성이 루트 요소에 전달됨", () => {
    render(<Spinner className="custom-spinner" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("custom-spinner");
  });
});
