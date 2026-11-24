import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Label } from "./Label";

test("텍스트와 함께 라벨이 올바르게 렌더링됨", () => {
  render(<Label labelText="라벨" />);
  expect(screen.getByText("라벨")).toBeInTheDocument();
});

test("tone=neutral일 때 올바른 클래스가 적용됨", () => {
  render(
    <Label tone="neutral" labelText="중립 색조 라벨" data-testid="label" />,
  );
  expect(screen.getByTestId("label")).toHaveClass("c_fg.neutral");
});

test("tone=danger일 때 올바른 클래스가 적용됨", () => {
  render(
    <Label tone="danger" labelText="위험 색조 라벨" data-testid="label" />,
  );
  expect(screen.getByTestId("label")).toHaveClass("c_fg.danger");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(<Label disabled labelText="비활성화 라벨" data-testid="label" />);
  expect(screen.getByTestId("label")).toHaveClass("c_fg.neutral.disabled");
});

test("required가 없으면 이름에 필수 안내나 별표가 없다", () => {
  render(
    <>
      <Label htmlFor="name" labelText="이름" />
      <input id="name" />
    </>,
  );
  expect(screen.getByRole("textbox", { name: "이름" })).toBeInTheDocument();
  expect(screen.queryByText("*")).not.toBeInTheDocument();
});

test("required 라벨은 별표를 숨기고 필수를 한 번만 읽으며 입력을 연결한다", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Label required htmlFor="name" labelText="이름" />
      <input id="name" />
    </>,
  );
  const input = screen.getByRole("textbox", { name: "이름 (필수)" });
  const asterisk = screen.getByText("*");
  expect(asterisk).toHaveAttribute("aria-hidden", "true");
  expect(asterisk).toHaveClass("c_fg.danger");
  await user.click(screen.getByText("이름"));
  expect(input).toHaveFocus();
});

test("required + disabled일 때 필수 안내는 유지하고 별표는 비활성화 색상이다", () => {
  render(
    <>
      <Label required disabled htmlFor="name" labelText="이름" />
      <input id="name" disabled />
    </>,
  );
  expect(screen.getByRole("textbox", { name: "이름 (필수)" })).toBeDisabled();
  expect(screen.getByText("*")).toHaveClass("c_fg.neutral.disabled");
});

test("children이 있을 때 label 안에 렌더링됨", () => {
  render(
    <Label labelText="라벨" data-testid="label">
      <input placeholder="입력" />
    </Label>,
  );
  const label = screen.getByTestId("label");
  expect(label).toContainElement(screen.getByPlaceholderText("입력"));
});

test("className을 넘겨도 기본 스타일을 유지한다", () => {
  render(<Label labelText="이름" className="custom" data-testid="label" />);
  const label = screen.getByTestId("label");
  expect(label).toHaveClass("custom");
  expect(label.classList.length).toBeGreaterThan(1);
});
