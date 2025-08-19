import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
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

  expect(screen.getByText("비활성화 라벨")).toBeDisabled();
  expect(screen.getByText("활성화 라벨")).toBeEnabled();
  expect(screen.getByText("비활성화 라벨")).toHaveClass(
    "c_fg.neutral.disabled",
  );
});

test("variant 속성이 올바르게 적용됨", () => {
  render(<Variants />);

  expect(screen.getByText("기본 라벨")).toBeInTheDocument();

  // 필수 라벨에 *가 붙는지 확인
  const requiredLabel = screen.getByText("필수 라벨");
  expect(requiredLabel).toBeInTheDocument();
  expect(screen.getByText("필수 라벨 *")).toBeInTheDocument();

  // *의 클래스가 올바른지 확인
  const asterisk = screen.getByText("*");
  expect(asterisk).toHaveClass("c_fg.danger");

  // 선택 라벨에 (옵션 선택)이 붙는지 확인
  const optionalLabel = screen.getByText("선택 라벨");
  expect(optionalLabel).toBeInTheDocument();
  expect(screen.getByText("선택 라벨 (옵션 선택)")).toBeInTheDocument();
});

test("isDescription 속성이 올바르게 적용됨", () => {
  render(<IsDescription />);

  expect(screen.getByText("보조설명문 있는 라벨")).toBeInTheDocument();
  expect(screen.getByText("보조설명문 없는 라벨")).toBeInTheDocument();

  // Text 컴포넌트 안에 description이 있는지 확인
  const descriptionInText = screen.getByText("보조설명문");
  expect(descriptionInText).toBeInTheDocument();
  expect(descriptionInText.tagName).toBe("SPAN"); // Text 컴포넌트는 span으로 렌더링됨
});
