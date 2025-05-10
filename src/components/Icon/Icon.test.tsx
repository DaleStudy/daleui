import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import * as stories from "./Icon.stories";

const { Basic } = composeStories(stories);

test("svg 엘리먼트가 렌더링됨", () => {
  const { container } = render(<Basic />);

  expect(container.querySelector("svg")).toBeInTheDocument();
});

test.each([
  ["xs", "w_1em h_1em"],
  ["sm", "w_1.25em h_1.25em"],
  ["md", "w_1.5em h_1.5em"],
  ["lg", "w_1.875em h_1.875em"],
  ["xl", "w_2.25em h_2.25em"],
] as const)("size 값에 따라 class가 올바르게 적용됨", (size, className) => {
  const { container } = render(<Basic size={size} />);

  expect(container.querySelector("svg")).toHaveClass(className);
});

test.each([
  ["neutral", "c_text"],
  ["accent", "c_text.accent"],
  ["danger", "c_text.danger"],
  ["warning", "c_text.warning"],
] as const)("tone 값에 따라 class가 올바르게 적용됨", (tone, className) => {
  const { container } = render(<Basic tone={tone} muted={false} />);

  expect(container.querySelector("svg")).toHaveClass(className);
});

test.each([
  [false, "c_text"],
  [true, "c_text.muted"],
] as const)("muted 값에 따라 class가 올바르게 적용됨", (muted, className) => {
  const { container } = render(<Basic tone="neutral" muted={muted} />);

  expect(container.querySelector("svg")).toHaveClass(className);
});
