import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Link.stories";
import { Icon } from "../Icon/Icon";

const { Basic, Tones, Contrasts, Underlines, Security } =
  composeStories(stories);

test("renders the link with the correct text content", () => {
  render(<Basic>링크</Basic>);
  expect(screen.getByRole("link")).toHaveTextContent("링크");
});

test("applies the correct tone based on the 'tone' prop", () => {
  render(<Tones />);

  expect(screen.getByRole("link", { name: "중립 링크" })).toHaveClass("c_text");
  expect(screen.getByRole("link", { name: "강조 링크" })).toHaveClass(
    "c_text.accent"
  );
  expect(screen.getByRole("link", { name: "위험 링크" })).toHaveClass(
    "c_text.danger"
  );
  expect(screen.getByRole("link", { name: "경고 링크" })).toHaveClass(
    "c_text.warning"
  );
});

test("applies the correct font size based on the 'size' prop", () => {
  const size = faker.helpers.arrayElement(
    Object.keys(fontSizes)
  ) as keyof typeof fontSizes;

  render(<Basic size={size} />);
  expect(screen.getByRole("link")).toHaveStyle({ fontSize: size });
});

test("applies the correct font weight based on the 'weight' prop", () => {
  const weight = faker.helpers.arrayElement(
    Object.keys(fontWeights)
  ) as keyof typeof fontWeights;

  render(<Basic weight={weight} />);
  expect(screen.getByRole("link")).toHaveClass(`fw_${weight}`);
});

test("applies the correct styles for low and high contrast", () => {
  render(<Contrasts />);

  expect(screen.getByRole("link", { name: "낮은 명암비" })).toHaveClass(
    "c_text.muted"
  );

  expect(screen.getByRole("link", { name: "높은 명암비" })).toHaveClass(
    "c_text"
  );
});

test("applies the correct underline styles", () => {
  render(<Underlines />);

  expect(screen.getByRole("link", { name: "밑줄 있음" })).toHaveClass(
    "td_underline"
  );
  expect(screen.getByRole("link", { name: "밑줄 없음" })).toHaveClass(
    "td_none"
  );
});

test("forwards additional anchor props like 'href' and 'target'", () => {
  const href = "https://www.daleui.com";
  const target = "_self";

  render(
    <Basic href={href} target={target}>
      링크
    </Basic>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", href);
  expect(link).toHaveAttribute("target", target);
});

test("adds rel='noopener noreferrer' when target is '_blank'", () => {
  render(<Security />);

  expect(
    screen.getByRole("link", { name: "새 탭에서 열기 (보안 속성 자동 추가)" })
  ).toHaveAttribute("rel", "noopener noreferrer");

  expect(
    screen.getByRole("link", { name: "같은 탭에서 열기" })
  ).not.toHaveAttribute("rel", "noopener noreferrer");
});

test("can be used with Icon component", () => {
  render(
    <Basic>
      <Icon name="chevronRight" />
      링크
    </Basic>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveTextContent("링크");
  expect(link.querySelector("svg")).toBeInTheDocument();
});
