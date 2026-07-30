import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Divider } from "./Divider";

test("기본값으로 렌더링하면 hr 요소로 렌더링된다", () => {
  render(<Divider />);
  expect(screen.getByRole("separator").tagName).toBe("HR");
});

test("orientation이 horizontal이면 hr 요소로 렌더링된다", () => {
  render(<Divider orientation="horizontal" />);
  expect(screen.getByRole("separator").tagName).toBe("HR");
});

test("orientation이 vertical이면 separator 역할의 div로 렌더링된다", () => {
  render(<Divider orientation="vertical" />);
  const divider = screen.getByRole("separator");
  expect(divider.tagName).toBe("DIV");
  expect(divider).toHaveAttribute("aria-orientation", "vertical");
});

test("variant를 올바르게 적용한다", () => {
  render(<Divider variant="dashed" />);
  expect(screen.getByRole("separator").className).toMatch(
    "border-top-style_dashed",
  );
});

test("stroke를 올바르게 적용한다", () => {
  render(
    <div>
      <Divider stroke="xs" />
      <Divider stroke="sm" />
    </div>,
  );
  const [xs, sm] = screen.getAllByRole("separator");
  expect(xs.className).toMatch("bd-t-w_xs");
  expect(sm.className).toMatch("bd-t-w_sm");
});

test("className을 병합한다", () => {
  render(<Divider className="custom-class" />);
  expect(screen.getByRole("separator")).toHaveClass("custom-class");
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
