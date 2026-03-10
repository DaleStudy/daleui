import { render, screen, within } from "@testing-library/react";
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
  expect(screen.getByTestId("label")).toHaveClass("c_fg.neutral.DEFAULT");
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

test("required일 때 별표가 렌더링됨", () => {
  render(<Label required labelText="필수 라벨" data-testid="label" />);
  const label = within(screen.getByTestId("label"));
  const asterisk = label.getByLabelText("옵션 필수");
  expect(asterisk).toHaveClass("c_fg.danger");
});

test("required + disabled일 때 별표가 비활성화 색상으로 렌더링됨", () => {
  render(
    <Label
      required
      disabled
      labelText="필수 비활성화 라벨"
      data-testid="label"
    />,
  );
  const label = within(screen.getByTestId("label"));
  const asterisk = label.getByLabelText("옵션 필수");
  expect(asterisk).toHaveClass("c_fg.neutral.disabled");
});
