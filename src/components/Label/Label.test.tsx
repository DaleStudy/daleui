import { composeStories } from "@storybook/react-vite";
import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import * as stories from "./Label.stories";

const { Basic, Tones, Variants, Disabled, IsDescription } =
  composeStories(stories);

test("텍스트와 함께 라벨이 올바르게 렌더링됨", () => {
  render(<Basic />);
  expect(screen.getByText("라벨")).toBeInTheDocument();
});

test("tone 속성이 올바르게 적용됨", () => {
  render(<Tones />);
  expect(screen.getAllByText("중립 색조 라벨")[0]).toHaveClass(
    "c_fg.neutral.DEFAULT",
  );
  expect(screen.getAllByText("위험 색조 라벨")[0]).toHaveClass("c_fg.danger");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(<Disabled />);
  expect(screen.getByText("비활성화 라벨")).toHaveClass(
    "c_fg.neutral.disabled",
  );
});

test("variant 속성이 올바르게 적용됨", () => {
  render(<Variants />);
  expect(screen.getByText("기본 라벨")).toBeInTheDocument();

  const requiredLabel = screen.getByText("필수 라벨");
  expect(within(requiredLabel).getByText("*")).toHaveClass("c_fg.danger");

  const optionalLabel = screen.getByText("선택 라벨");
  expect(optionalLabel).toHaveTextContent(/\(옵션 선택\)/);
});

test("isDescription 속성이 올바르게 적용됨", () => {
  render(<IsDescription />);
  expect(screen.getByText("보조설명문 있는 라벨")).toBeInTheDocument();
  expect(screen.getByText("보조설명문 없는 라벨")).toBeInTheDocument();

  // Text 컴포넌트 안에 description이 있는지 확인
  const descriptionInText = screen.getByText("보조설명문");
  expect(descriptionInText).toBeInTheDocument();
  expect(descriptionInText.tagName).toBe("SPAN");
});
