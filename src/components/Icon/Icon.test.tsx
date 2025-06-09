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
  ["neutral", "c_light.fg.neutral.default"],
  ["brand", "c_light.fg.brand.default"],
  ["danger", "c_light.fg.danger"],
  ["warning", "c_light.fg.warning"],
  ["success", "c_light.fg.success"],
  ["info", "c_light.fg.info"],
] as const)('tone "%s"값에 따라 class가 올바르게 적용됨', (tone, className) => {
  const { container } = render(<Basic tone={tone} muted={false} />);

  expect(container.querySelector("svg")).toHaveClass(className);
});

test.each([
  [false, "c_light.fg.neutral.default"],
  [true, "c_light.fg.neutral.placeholder"],
] as const)("muted 값에 따라 class가 올바르게 적용됨", (muted, className) => {
  const { container } = render(<Basic tone="neutral" muted={muted} />);

  expect(container.querySelector("svg")).toHaveClass(className);
});

test("모든 tone과 muted 조합이 올바르게 작동함", () => {
  const tones = [
    "neutral",
    "brand",
    "danger",
    "warning",
    "success",
    "info",
  ] as const;
  const mutedValues = [true, false] as const;

  tones.forEach((tone) => {
    mutedValues.forEach((muted) => {
      const { container } = render(<Basic tone={tone} muted={muted} />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("class");

      const hasColorClass = Array.from(svg?.classList || []).some(
        (className) =>
          className.startsWith("c_light.fg.") ||
          className.startsWith("dark:c_dark.fg."),
      );
      expect(hasColorClass).toBe(true);
    });
  });
});
