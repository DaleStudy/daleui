import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import * as stories from "./Heading.stories";

const { Basic } = composeStories(stories);

test("renders the text content", () => {
  render(<Basic>제목</Basic>);

  const heading = screen.getByRole("heading");

  expect(heading).toHaveTextContent("제목");
});

test.each([1, 2, 3, 4, 5, 6] as const)("use the correct level %s", (level) => {
  render(<Basic level={level} />);

  expect(screen.getByRole("heading", { level })).toBeInTheDocument();
});
