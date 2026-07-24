import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Divider } from "./Divider";

test("기본값으로 렌더링하면 hr 요소로 렌더링된다", () => {
  render(<Divider data-testid="divider" />);
  const divider = screen.getByTestId("divider");
  expect(divider.tagName).toBe("HR");
});

test("orientation이 horizontal이면 hr 요소로 렌더링된다", () => {
  render(<Divider orientation="horizontal" data-testid="divider" />);
  const divider = screen.getByTestId("divider");
  expect(divider.tagName).toBe("HR");
});

test("orientation이 vertical이면 separator 역할의 div로 렌더링된다", () => {
  render(<Divider orientation="vertical" data-testid="divider" />);
  const divider = screen.getByTestId("divider");
  expect(divider.tagName).toBe("DIV");
  expect(divider).toHaveAttribute("role", "separator");
  expect(divider).toHaveAttribute("aria-orientation", "vertical");
});

test("variant를 올바르게 적용한다", () => {
  render(<Divider variant="dashed" data-testid="divider" />);
  const divider = screen.getByTestId("divider");
  expect(divider.className).toMatch("border-top-style_dashed");
});

test("stroke를 올바르게 적용한다", () => {
  render(
    <div>
      <Divider stroke="xs" data-testid="divider-xs" />
      <Divider stroke="sm" data-testid="divider-sm" />
    </div>,
  );
  expect(screen.getByTestId("divider-xs").className).toMatch("bd-t-w_xs");
  expect(screen.getByTestId("divider-sm").className).toMatch("bd-t-w_sm");
});

test("className을 병합한다", () => {
  render(<Divider className="custom-class" data-testid="divider" />);
  expect(screen.getByTestId("divider")).toHaveClass("custom-class");
});

test("ref를 전달한다", () => {
  let refValue: HTMLElement | null = null;
  render(
    <Divider
      ref={(el) => {
        refValue = el;
      }}
    />,
  );
  expect(refValue).not.toBeNull();
});
