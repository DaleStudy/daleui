import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Heading.stories";

const { Basic, Contrasts } = composeStories(stories);

test("renders the heading with the correct text content", () => {
  render(<Basic>제목</Basic>);

  expect(screen.getByRole("heading")).toHaveTextContent("제목");
});

test.each([1, 2, 3, 4, 5, 6] as const)(
  "renders the correct HTML heading element for level %i",
  (level) => {
    render(<Basic level={level} />);

    expect(screen.getByRole("heading", { level })).toBeInTheDocument();
  }
);

test("applies the correct font weight class based on the weight prop", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights)
  ) as keyof typeof fontWeights;

  render(<Basic weight={weight} />);

  expect(screen.getByRole("heading")).toHaveClass(`fw_${weight}`);
});

test("applies the correct font size class based on the size prop", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes)
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);

  expect(screen.getByRole("heading")).toHaveClass(`fs_${size}`);
});

test("applies the correct color for low and high contrast", () => {
  render(<Contrasts />);

  expect(screen.getByRole("heading", { name: "낮은 명암비" })).toHaveClass(
    "c_text"
  );

  expect(screen.getByRole("heading", { name: "높은 명암비" })).toHaveClass(
    "c_text.contrast"
  );
});
