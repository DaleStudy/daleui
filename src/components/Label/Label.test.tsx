import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { Label } from "./Label";

test("텍스트와 함께 라벨이 올바르게 렌더링됨", () => {
  render(
    <>
      <Label labelText="라벨" />
    </>,
  );
  expect(screen.getByText("라벨")).toBeInTheDocument();
});

test("tone 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Label tone="neutral" labelText="중립 색조 라벨" />
      <Label tone="danger" labelText="위험 색조 라벨" />
    </>,
  );
  const neutralText = screen.getAllByText("중립 색조 라벨")[0];
  const dangerText = screen.getAllByText("위험 색조 라벨")[0];
  // eslint-disable-next-line testing-library/no-node-access
  expect(neutralText.closest("label")).toHaveClass("c_fg.neutral.DEFAULT");
  // eslint-disable-next-line testing-library/no-node-access
  expect(dangerText.closest("label")).toHaveClass("c_fg.danger");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Label disabled={true} labelText="비활성화 라벨" />
      <Label disabled={false} labelText="활성화 라벨" />
    </>,
  );
  const disabledText = screen.getByText("비활성화 라벨");
  // eslint-disable-next-line testing-library/no-node-access
  expect(disabledText.closest("label")).toHaveClass("c_fg.neutral.disabled");
});

test("variant 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Label variant="default" labelText="기본 라벨" />
      <Label variant="required" labelText="필수 라벨" />
      <Label variant="optional" labelText="선택 라벨" />
    </>,
  );
  expect(screen.getByText("기본 라벨")).toBeInTheDocument();

  const requiredText = screen.getByText("필수 라벨");
  // eslint-disable-next-line testing-library/no-node-access
  const requiredLabel = requiredText.closest("label") as HTMLElement;
  const asterisk = within(requiredLabel).getByLabelText("옵션 필수");
  expect(asterisk).toHaveClass("c_fg.danger");

  const optionalText = screen.getByText("선택 라벨");
  // eslint-disable-next-line testing-library/no-node-access
  const optionalLabel = optionalText.closest("label") as HTMLElement;
  expect(optionalLabel).toHaveTextContent(/\(옵션 선택\)/);
});

test("Description 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Label description="보조설명문" labelText="보조설명문 있는 라벨" />
      <Label labelText="보조설명문 없는 라벨" />
    </>,
  );
  expect(screen.getByText("보조설명문 있는 라벨")).toBeInTheDocument();
  expect(screen.getByText("보조설명문 없는 라벨")).toBeInTheDocument();

  // Text 컴포넌트 안에 description이 있는지 확인
  const descriptionInText = screen.getByText("보조설명문");
  expect(descriptionInText).toBeInTheDocument();
  expect(descriptionInText.tagName).toBe("SPAN");
});
