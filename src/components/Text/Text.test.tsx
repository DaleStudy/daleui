import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Text.stories";

const { Basic, Tones, Contrasts } = composeStories(stories);

test("텍스트와 함께 heading이 올바르게 렌더링됨", () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText("테스트"));
});

test("weight prop에 따라 font weight 클래스가 올바르게 적용됨", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights),
  ) as keyof typeof fontWeights;

  render(<Basic weight={weight} />);

  expect(screen.getByText("본문")).toHaveClass(`fw_${weight}`);
});

test("size prop에 따라 font size 클래스가 올바르게 적용됨", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes),
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);

  expect(screen.getByText("본문")).toHaveClass(`fs_${size}`);
});

test("tone에 따라 글자 색이 올바르게 적용됨", () => {
  render(<Tones />);

  expect(screen.getByText("중립 색조")).toHaveClass("c_text");

  expect(screen.getByText("강조 색조")).toHaveClass("c_text.accent");

  expect(screen.getByText("위험 색조")).toHaveClass("c_text.danger");

  expect(screen.getByText("경고 색조")).toHaveClass("c_text.warning");
});

test("낮은 명암비와 높은 명암비에 따라 글자 색이 올바르게 적용됨", () => {
  render(<Contrasts />);

  expect(screen.getByText("낮은 명암비")).toHaveClass("c_text.muted");

  expect(screen.getByText("높은 명암비")).toHaveClass("c_text");
});
