import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Text.stories";

const { Basic, Tones, Contrasts } = composeStories(stories);

test("renders the heading with the correct text content", () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText("테스트"));
});

test("applies the correct font weight class based on the weight prop", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights)
  ) as keyof typeof fontWeights;

  render(<Basic weight={weight} />);

  expect(screen.getByText("본문")).toHaveClass(`fw_${weight}`);
});

test("applies the correct font size class based on the size prop", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes)
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);

  expect(screen.getByText("본문")).toHaveClass(`fs_${size}`);
});

test("applies the correct color based on the tone", () => {
  render(<Tones />);

  expect(screen.getByText("중립 색조")).toHaveClass("c_text");

  expect(screen.getByText("강조 색조")).toHaveClass("c_text.accent");

  expect(screen.getByText("위험 색조")).toHaveClass("c_text.danger");

  expect(screen.getByText("경고 색조")).toHaveClass("c_text.warning");
});

test("applies the correct color for low and high contrast", () => {
  render(<Contrasts />);

  expect(screen.getByText("낮은 명암비")).toHaveClass("c_text.muted");

  expect(screen.getByText("높은 명암비")).toHaveClass("c_text");
});
