import { composeStories } from "@storybook/react-vite";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import * as stories from "./Icon.stories";

const { Basic } = composeStories(stories);

test("SVG 요소를 렌더링한다", () => {
  const { container } = render(<Basic />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.querySelector("svg")).toBeInTheDocument();
});

test.each([
  ["xs", "w_1em h_1em"],
  ["sm", "w_1.25em h_1.25em"],
  ["md", "w_1.5em h_1.5em"],
  ["lg", "w_1.875em h_1.875em"],
  ["xl", "w_2.25em h_2.25em"],
] as const)("%s 크기에 올바른 클래스를 적용한다", (size, className) => {
  const { container } = render(<Basic size={size} />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.querySelector("svg")).toHaveClass(className);
});

test.each([
  ["neutral", "c_fg.neutral"],
  ["brand", "c_fg.brand"],
  ["danger", "c_fg.danger"],
  ["warning", "c_fg.warning"],
  ["success", "c_fg.success"],
  ["info", "c_fg.info"],
] as const)("%s 톤에 올바른 색상 클래스를 적용한다", (tone, className) => {
  const { container } = render(<Basic tone={tone} muted={false} />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.querySelector("svg")).toHaveClass(className);
});

test.each([
  [false, "c_fg.neutral"],
  [true, "c_fg.neutral.placeholder"],
] as const)("muted가 %s일 때 올바른 클래스를 적용한다", (muted, className) => {
  const { container } = render(<Basic tone="neutral" muted={muted} />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.querySelector("svg")).toHaveClass(className);
});

test.each([
  ["neutral", false],
  ["neutral", true],
  ["brand", false],
  ["brand", true],
  ["danger", false],
  ["danger", true],
  ["warning", false],
  ["warning", true],
  ["success", false],
  ["success", true],
  ["info", false],
  ["info", true],
] as const)(
  "%s 톤과 muted=%s 조합으로 SVG 요소를 렌더링한다",
  (tone, muted) => {
    const { container } = render(<Basic tone={tone} muted={muted} />);
    // eslint-disable-next-line testing-library/no-node-access
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
  },
);

test.each([
  ["neutral", false],
  ["neutral", true],
  ["brand", false],
  ["brand", true],
  ["danger", false],
  ["danger", true],
  ["warning", false],
  ["warning", true],
  ["success", false],
  ["success", true],
  ["info", false],
  ["info", true],
] as const)("%s 톤과 muted=%s 조합으로 class 속성을 가진다", (tone, muted) => {
  const { container } = render(<Basic tone={tone} muted={muted} />);
  // eslint-disable-next-line testing-library/no-node-access
  const svg = container.querySelector("svg");

  expect(svg).toHaveAttribute("class");
});

test.each([
  ["neutral", false],
  ["neutral", true],
  ["brand", false],
  ["brand", true],
  ["danger", false],
  ["danger", true],
  ["warning", false],
  ["warning", true],
  ["success", false],
  ["success", true],
  ["info", false],
  ["info", true],
] as const)(
  "%s 톤과 muted=%s 조합으로 색상 클래스를 포함한다",
  (tone, muted) => {
    const { container } = render(<Basic tone={tone} muted={muted} />);
    // eslint-disable-next-line testing-library/no-node-access
    const svg = container.querySelector("svg");

    const hasColorClass = Array.from(svg?.classList || []).some(
      (className) =>
        className.startsWith("c_fg.") || className.startsWith("dark:c_fg."),
    );
    expect(hasColorClass).toBe(true);
  },
);
