import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Text.stories";

const { Basic, Tones, Contrasts } = composeStories(stories);

test("텍스트를 렌더링한다", () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText("테스트")).toBeInTheDocument();
});

test("weight prop에 따라 font weight 클래스를 적용한다", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights),
  ) as keyof typeof fontWeights;

  render(<Basic weight={weight} />);

  expect(screen.getByText("본문")).toHaveClass(`fw_${weight}`);
});

test("size prop에 따라 font size 클래스를 적용한다", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes),
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);

  expect(screen.getByText("본문")).toHaveClass(`fs_${size}`);
});

test.each([
  ["중립 색조", "c_fg.neutral.default"],
  ["브랜드 색조", "c_fg.brand.default"],
  ["위험 색조", "c_fg.danger"],
  ["경고 색조", "c_fg.warning"],
  ["성공 색조", "c_fg.success"],
  ["정보 색조", "c_fg.info"],
] as const)("%s에 올바른 톤 클래스를 적용한다", (textName, className) => {
  render(<Tones />);

  expect(screen.getByText(textName)).toHaveClass(className);
});

test.each([
  ["낮은 명암비", "c_fg.neutral.placeholder"],
  ["높은 명암비", "c_fg.neutral.default"],
] as const)("%s에 올바른 클래스를 적용한다", (textName, className) => {
  render(<Contrasts />);

  expect(screen.getByText(textName)).toHaveClass(className);
});
