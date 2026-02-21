import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Tag } from "./Tag";
import type { TagProps } from "./Tag";

test("텍스트와 함께 태그를 올바르게 렌더링한다", () => {
  render(<Tag>테스트 태그</Tag>);
  expect(screen.getByText("테스트 태그")).toBeInTheDocument();
});

test("tone 속성을 올바르게 적용한다", () => {
  render(
    <div>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="brand">Brand</Tag>
      <Tag tone="danger">Danger</Tag>
    </div>,
  );

  const neutralTag = screen.getByText("Neutral");
  const brandTag = screen.getByText("Brand");
  const dangerTag = screen.getByText("Danger");

  expect(neutralTag).toBeInTheDocument();
  expect(brandTag).toHaveClass("bg_bgSolid.brand");
  expect(dangerTag).toHaveClass("bg_bgSolid.danger");
});

test("href가 있으면 a 태그로 렌더링된다", () => {
  render(<Tag href="https://example.com">링크 태그</Tag>);
  const linkTag = screen.getByRole("link", { name: "링크 태그" });
  expect(linkTag).toHaveAttribute("href", "https://example.com");
});

test("link 태그에 href 속성을 올바르게 적용한다", () => {
  const tagProps: TagProps = {
    href: "https://example.com",
    target: "_blank",
    children: "외부 링크 태그",
  };

  render(<Tag {...tagProps} />);
  const linkTag = screen.getByRole("link", { name: "외부 링크 태그" });
  expect(linkTag).toHaveAttribute("href", "https://example.com");
  expect(linkTag).toHaveAttribute("target", "_blank");
  // target=_blank일 때 보안 속성 자동 추가 확인
  expect(linkTag).toHaveAttribute("rel", "noopener noreferrer");
});

test("href + removable일 때 button이 a 태그 안에 중첩되지 않는다", () => {
  render(
    <Tag href="https://example.com" removable>
      링크 + 제거 태그
    </Tag>,
  );

  const link = screen.getByRole("link", { name: "링크 + 제거 태그" });
  const removeButton = screen.getByLabelText("제거");

  // button이 a 태그의 자식이 아닌 형제여야 한다
  expect(link.contains(removeButton)).toBe(false);
});

test("removable 속성을 올바르게 적용한다", () => {
  render(
    <div>
      <Tag removable>제거 가능 태그 1</Tag>
      <Tag removable>제거 가능 태그 2</Tag>
      <Tag removable>제거 가능 태그 3</Tag>
    </div>,
  );

  const removableTags = screen.getAllByLabelText("제거");
  expect(removableTags).toHaveLength(3);

  removableTags.forEach((removeButton) => {
    expect(removeButton).toHaveAttribute("type", "button");
    expect(removeButton).not.toHaveAttribute("tabIndex", "-1");
  });
});

test("제거 버튼이 올바르게 렌더링된다", async () => {
  const user = userEvent.setup();
  render(
    <Tag tone="brand" removable>
      제거 가능한 태그
    </Tag>,
  );

  const removeButton = screen.getByLabelText("제거");
  expect(removeButton).toBeInTheDocument();
  expect(removeButton).not.toHaveAttribute("tabIndex", "-1");
  await user.click(removeButton);
});

test("링크 태그가 올바르게 동작한다", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Tag tone="success" href="#" onClick={handleClick}>
      클릭 가능한 태그
    </Tag>,
  );

  const tag = screen.getByRole("link", { name: "클릭 가능한 태그" });
  await user.click(tag);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("제거 버튼 클릭 시 이벤트 전파를 중단한다", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <div onClick={handleClick}>
      <Tag tone="warning" href="#" removable>
        링크 + 제거 가능 태그
      </Tag>
    </div>,
  );

  const removeButton = screen.getByLabelText("제거");
  await user.click(removeButton);
  expect(handleClick).not.toHaveBeenCalled();
});

test("제거 버튼 클릭 시 Tag 엘리먼트를 제거한다", async () => {
  const user = userEvent.setup();

  render(
    <div>
      <Tag tone="danger" removable>
        제거될 태그
      </Tag>
      <Tag tone="success">남아있을 태그</Tag>
    </div>,
  );

  expect(screen.getByText("제거될 태그")).toBeInTheDocument();
  expect(screen.getByText("남아있을 태그")).toBeInTheDocument();

  const removeButton = screen.getByLabelText("제거");
  await user.click(removeButton);

  expect(screen.queryByText("제거될 태그")).not.toBeInTheDocument();
  expect(screen.getByText("남아있을 태그")).toBeInTheDocument();
});

test("X 버튼만 클릭했을 때만 제거되고, 태그 자체 클릭으로는 제거되지 않는다", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Tag tone="brand" removable onClick={handleClick}>
      테스트 태그
    </Tag>,
  );

  const tag = screen.getByText("테스트 태그");
  const removeButton = screen.getByLabelText("제거");

  // 태그 클릭 - 제거되지 않아야 함
  await user.click(tag);
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(screen.getByText("테스트 태그")).toBeInTheDocument();

  // X 버튼 클릭 - 제거되어야 함
  await user.click(removeButton);
  expect(screen.queryByText("테스트 태그")).not.toBeInTheDocument();
});

test("제거 버튼에 focus가 가능하다", async () => {
  const user = userEvent.setup();

  render(<Tag removable>Focus 테스트 태그</Tag>);

  const removeButton = screen.getByLabelText("제거");

  // 제거 버튼에 focus 가능한지 확인
  await user.tab();
  expect(removeButton).toHaveFocus();
});

test("제거 버튼이 키보드로 동작한다", async () => {
  const user = userEvent.setup();

  render(<Tag removable>키보드 테스트 태그</Tag>);

  const removeButton = screen.getByLabelText("제거");

  // 제거 버튼에 focus
  await user.tab();
  expect(removeButton).toHaveFocus();

  // Enter 키로 제거
  await user.keyboard("{Enter}");
  expect(screen.queryByText("키보드 테스트 태그")).not.toBeInTheDocument();
});

test("제거 버튼이 Space 키로 동작한다", async () => {
  const user = userEvent.setup();

  render(<Tag removable>Space 키 테스트 태그</Tag>);

  const removeButton = screen.getByLabelText("제거");

  // 제거 버튼에 focus
  await user.tab();
  expect(removeButton).toHaveFocus();

  // Space 키로 제거
  await user.keyboard(" ");
  expect(screen.queryByText("Space 키 테스트 태그")).not.toBeInTheDocument();
});

test("링크 + 제거 가능 태그에서 제거 버튼 키보드 동작 시 링크가 클릭되지 않는다", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Tag href="#" removable onClick={handleClick}>
      링크 + 제거 가능 태그
    </Tag>,
  );

  const removeButton = screen.getByLabelText("제거");

  // 제거 버튼에 focus - 링크가 있으므로 두 번 tab
  await user.tab(); // 링크에 포커스
  await user.tab(); // 제거 버튼에 포커스
  expect(removeButton).toHaveFocus();

  // Enter 키로 제거 - 링크 클릭 핸들러가 호출되지 않아야 함
  await user.keyboard("{Enter}");
  expect(handleClick).not.toHaveBeenCalled();
  expect(screen.queryByText("링크 + 제거 가능 태그")).not.toBeInTheDocument();
});

test("링크 + 제거 가능 태그에서 제거 버튼 Space 키 동작 시 링크가 클릭되지 않는다", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(
    <Tag href="#" removable onClick={handleClick}>
      링크 + 제거 가능 태그 Space
    </Tag>,
  );

  const removeButton = screen.getByLabelText("제거");

  // 제거 버튼에 focus - 링크가 있으므로 두 번 tab
  await user.tab(); // 링크에 포커스
  await user.tab(); // 제거 버튼에 포커스
  expect(removeButton).toHaveFocus();

  // Space 키로 제거 - 링크 클릭 핸들러가 호출되지 않아야 함
  await user.keyboard(" ");
  expect(handleClick).not.toHaveBeenCalled();
  expect(
    screen.queryByText("링크 + 제거 가능 태그 Space"),
  ).not.toBeInTheDocument();
});
