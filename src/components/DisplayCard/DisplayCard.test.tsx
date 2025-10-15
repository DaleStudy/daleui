import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DisplayCard } from "./DisplayCard";
import * as stories from "./DisplayCard.stories";

const { Basic, Tones, Outlines, WithLink, External } = composeStories(stories);

test("기본 DisplayCard가 올바르게 렌더링됨", () => {
  render(<Basic />);

  expect(screen.getByText("제목")).toBeInTheDocument();
  expect(
    screen.getByText("이 기능에 대한 설명을 여기에 작성합니다"),
  ).toBeInTheDocument();
  expect(screen.getByRole("article")).toBeInTheDocument();
});

test("아이콘이 올바르게 렌더링됨", () => {
  render(
    <DisplayCard title="테스트 제목" description="테스트 설명" icon="star" />,
  );

  expect(screen.getByLabelText("star")).toBeInTheDocument();
});

test("제목이 올바른 스타일로 렌더링됨", () => {
  render(<Basic />);

  const title = screen.getByText("제목");
  expect(title).toHaveClass("fs_lg");
  expect(title).toHaveClass("fw_semibold");
});

test("설명이 올바른 스타일로 렌더링됨", () => {
  render(<Basic />);

  const description = screen.getByText(
    "이 기능에 대한 설명을 여기에 작성합니다",
  );
  expect(description).toHaveClass("fs_md");
});

test("tone 속성이 올바르게 적용됨", () => {
  render(<Tones />);

  expect(screen.getByText("neutral")).toBeInTheDocument();
  expect(screen.getByText("brand")).toBeInTheDocument();

  const articles = screen.getAllByRole("article");
  expect(articles).toHaveLength(2);

  expect(articles[0]).toHaveClass("bd-c_border.neutral");
  expect(articles[1]).toHaveClass("bd-c_border.brand");
});

test("outline 속성이 올바르게 적용됨", () => {
  render(<Outlines />);

  expect(screen.getByText("테두리 없는 카드")).toBeInTheDocument();
  expect(screen.getByText("테두리 있는 카드")).toBeInTheDocument();

  const articles = screen.getAllByRole("article");

  expect(articles[0]).toHaveClass("bd-w_0");

  expect(articles[1]).toHaveClass("bd-w_sm");
});

test("링크 유무에 따라 올바르게 렌더링됨", () => {
  render(<WithLink />);

  expect(screen.getByText("링크 없는 카드")).toBeInTheDocument();
  expect(screen.getByText("링크 있는 카드")).toBeInTheDocument();

  const link = screen.getByRole("link", { name: /자세히 보기/ });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "#");
});

test("외부 링크와 내부 링크가 올바르게 렌더링됨", () => {
  render(<External />);

  const internalLink = screen.getByRole("link", { name: /페이지로 이동/ });
  const externalLink = screen.getByRole("link", { name: /외부 사이트 방문/ });

  expect(internalLink).not.toHaveAttribute("target", "_blank");

  expect(externalLink).toHaveAttribute("target", "_blank");
  expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("링크의 tone이 올바르게 적용됨", () => {
  render(<WithLink />);

  const link = screen.getByRole("link", { name: /자세히 보기/ });
  expect(link).toHaveClass("c_fg.neutral");
});
