import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Badge } from "./Badge";
import * as stories from "./Badge.stories";

const { Basic, Variants, States, Removable } = composeStories(stories);

test("텍스트와 함께 배지를 올바르게 렌더링한다", () => {
  render(<Basic>테스트 배지</Basic>);

  expect(screen.getByText("테스트 배지")).toBeInTheDocument();
});

test("variant 속성을 올바르게 적용한다", () => {
  render(<Variants />);

  const solidBadge = screen.getByText("솔리드 배지");
  const outlineBadge = screen.getByText("아웃라인 배지");

  expect(solidBadge).toHaveClass("bg_bg.neutral");
  expect(outlineBadge).toHaveClass("bd_neutral");
  expect(outlineBadge).toHaveClass("bd-w_sm");
});

test("link 속성을 올바르게 적용한다", () => {
  render(<States />);

  const linkBadges = screen.getAllByText("링크 상태");

  linkBadges.forEach((badge) => {
    expect(badge).toHaveAttribute("role", "link");
    expect(badge).toHaveAttribute("tabIndex", "0");
  });
});

test("removable 속성을 올바르게 적용한다", () => {
  render(<Removable />);

  const removableBadges = screen.getAllByLabelText("제거");

  expect(removableBadges).toHaveLength(4); // 4개의 제거 가능한 배지

  removableBadges.forEach((removeButton) => {
    expect(removeButton).toHaveAttribute("type", "button");
    expect(removeButton).toHaveAttribute("tabIndex", "-1");
  });
});

test("제거 버튼 클릭 시 onRemove 콜백을 호출한다", async () => {
  const handleRemove = vi.fn();
  const user = userEvent.setup();

  render(
    <Badge variant="solid" removable onRemove={handleRemove}>
      제거 가능한 배지
    </Badge>,
  );

  const removeButton = screen.getByLabelText("제거");
  await user.click(removeButton);

  expect(handleRemove).toHaveBeenCalledTimes(1);
});

test("링크 배지 클릭 시 onClick 콜백을 호출한다", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Badge variant="solid" link onClick={handleClick}>
      클릭 가능한 배지
    </Badge>,
  );

  const badge = screen.getByText("클릭 가능한 배지");
  await user.click(badge);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("제거 버튼 클릭 시 이벤트 전파를 중단한다", async () => {
  const handleClick = vi.fn();
  const handleRemove = vi.fn();
  const user = userEvent.setup();

  render(
    <Badge
      variant="solid"
      link
      removable
      onClick={handleClick}
      onRemove={handleRemove}
    >
      링크 + 제거 가능 배지
    </Badge>,
  );

  const removeButton = screen.getByLabelText("제거");
  await user.click(removeButton);

  expect(handleRemove).toHaveBeenCalledTimes(1);
  expect(handleClick).not.toHaveBeenCalled(); // 이벤트 전파가 중단되어야 함
});

test("기본값을 올바르게 설정한다", () => {
  render(<Badge>기본 배지</Badge>);

  const badge = screen.getByText("기본 배지");

  expect(badge.tagName).toBe("SPAN");
  expect(badge).not.toHaveAttribute("role", "link");
  expect(screen.queryByLabelText("제거")).not.toBeInTheDocument();
});

test("link가 true일 때 a 태그로 렌더링한다", () => {
  render(<Badge link>링크 배지</Badge>);

  const badge = screen.getByText("링크 배지");

  expect(badge.tagName).toBe("A");
  expect(badge).toHaveAttribute("role", "link");
  expect(badge).toHaveAttribute("tabIndex", "0");
});

test("solid variant를 기본값으로 적용한다", () => {
  render(<Badge>기본 배지</Badge>);

  const badge = screen.getByText("기본 배지");

  expect(badge).toHaveClass("bg_bg.neutral");
});

test("removable과 link를 함께 사용할 수 있다", () => {
  render(
    <Badge variant="outline" link removable>
      복합 기능 배지
    </Badge>,
  );

  const badge = screen.getByText("복합 기능 배지");
  const removeButton = screen.getByLabelText("제거");

  expect(badge.tagName).toBe("A");
  expect(badge).toHaveAttribute("role", "link");
  expect(removeButton).toBeInTheDocument();
});
