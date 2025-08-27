import { composeStories } from "@storybook/react-vite";
import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import * as stories from "./Label.stories";

const { Basic, Tones, Variants, Disabled, Description } =
  composeStories(stories);

test("텍스트와 함께 라벨이 올바르게 렌더링됨", () => {
  render(<Basic />);
  expect(screen.getByText("타이틀")).toBeInTheDocument();
});

test("tone 속성이 올바르게 적용됨", () => {
  render(<Tones />);
  const neutralText = screen.getAllByText("중립 색조 라벨")[0];
  const dangerText = screen.getAllByText("위험 색조 라벨")[0];
  // eslint-disable-next-line testing-library/no-node-access
  expect(neutralText.closest("label")).toHaveClass("c_fg.neutral.DEFAULT");
  // eslint-disable-next-line testing-library/no-node-access
  expect(dangerText.closest("label")).toHaveClass("c_fg.danger");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(<Disabled />);
  const disabledText = screen.getByText("비활성화 라벨");
  // eslint-disable-next-line testing-library/no-node-access
  expect(disabledText.closest("label")).toHaveClass("c_fg.neutral.disabled");
});

test("variant 속성이 올바르게 적용됨", () => {
  render(<Variants />);
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
  render(<Description />);
  expect(screen.getByText("보조설명문 있는 라벨")).toBeInTheDocument();
  expect(screen.getByText("보조설명문 없는 라벨")).toBeInTheDocument();

  // Text 컴포넌트 안에 description이 있는지 확인
  const descriptionInText = screen.getByText("보조설명문");
  expect(descriptionInText).toBeInTheDocument();
  expect(descriptionInText.tagName).toBe("SPAN");
});
