import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Heading.stories";

const { Basic, Contrasts } = composeStories(stories);

test("텍스트와 함께 heading이 올바르게 렌더링됨", () => {
  render(<Basic>제목</Basic>);

  expect(screen.getByRole("heading")).toHaveTextContent("제목");
});

test.each([1, 2, 3, 4, 5] as const)(
  "level 값에 따라 HTML heading 요소가 올바르게 렌더링됨",
  (level) => {
    render(<Basic level={level} />);

    expect(screen.getByRole("heading", { level })).toBeInTheDocument();
  },
);

test("weight prop에 따라 font weight 클래스가 올바르게 적용됨", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights),
  ) as keyof typeof fontWeights;

  render(<Basic weight={weight} />);

  expect(screen.getByRole("heading")).toHaveClass(`fw_${weight}`);
});

test("size prop에 따라 font size 클래스가 올바르게 적용됨", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes),
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);

  expect(screen.getByRole("heading")).toHaveClass(`fs_${size}`);
});

test("낮은 명암비와 높은 명암비에 따라 글자 색이 올바르게 적용됨", () => {
  render(<Contrasts />);

  expect(screen.getByRole("heading", { name: "낮은 명암비" })).toHaveClass(
    "c_foreground.default.secondary",
  );

  expect(screen.getByRole("heading", { name: "높은 명암비" })).toHaveClass(
    "c_foreground.default.primary",
  );
});
