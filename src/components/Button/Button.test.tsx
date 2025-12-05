import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Button } from "./Button";

test("텍스트와 함께 버튼이 올바르게 렌더링됨", () => {
  render(<Button variant="solid">테스트</Button>);

  expect(screen.getByText("테스트")).toBeInTheDocument();
});

test("variant 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Button variant="solid">솔리드 버튼</Button>
      <Button variant="outline">아웃라인 버튼</Button>
      <Button variant="ghost">고스트 버튼</Button>
    </>,
  );

  expect(screen.getByRole("button", { name: "솔리드 버튼" })).toHaveClass(
    "bg_bgSolid.brand",
  );
  expect(screen.getByRole("button", { name: "아웃라인 버튼" })).toHaveClass(
    "bd_brand bd-w_lg",
  );
  expect(screen.getByRole("button", { name: "고스트 버튼" })).toHaveClass(
    "bg_transparent bd_none",
  );
});

test("tone 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Button variant="solid" tone="brand">
        솔리드 브랜드
      </Button>
      <Button variant="outline" tone="brand">
        아웃라인 브랜드
      </Button>
      <Button variant="ghost" tone="brand">
        고스트 브랜드
      </Button>
      <Button variant="solid" tone="neutral">
        솔리드 중립
      </Button>
      <Button variant="outline" tone="neutral">
        아웃라인 중립
      </Button>
      <Button variant="ghost" tone="neutral">
        고스트 중립
      </Button>
      <Button variant="solid" tone="danger">
        솔리드 위험
      </Button>
      <Button variant="outline" tone="danger">
        아웃라인 위험
      </Button>
      <Button variant="ghost" tone="danger">
        고스트 위험
      </Button>
    </>,
  );

  // solid는 brand tone을 지원
  expect(screen.getByRole("button", { name: "솔리드 브랜드" })).toHaveClass(
    "bg_bgSolid.brand",
  );

  // solid는 neutral tone을 지원
  expect(screen.getByRole("button", { name: "솔리드 중립" })).toHaveClass(
    "bg_bgSolid.neutral",
  );

  // solid는 danger tone을 지원
  expect(screen.getByRole("button", { name: "솔리드 위험" })).toHaveClass(
    "bg_bgSolid.danger",
  );

  // outline은 brand tone을 지원
  expect(screen.getByRole("button", { name: "아웃라인 브랜드" })).toHaveClass(
    "bd_brand",
  );

  // outline은 neutral tone을 지원
  expect(screen.getByRole("button", { name: "아웃라인 중립" })).toHaveClass(
    "bd_neutral",
  );

  // outline은 danger tone을 지원
  expect(screen.getByRole("button", { name: "아웃라인 위험" })).toHaveClass(
    "bd_danger",
  );

  // ghost는 brand tone을 지원
  expect(screen.getByRole("button", { name: "고스트 브랜드" })).toHaveClass(
    "c_fg.brand",
  );

  // ghost는 neutral tone을 지원
  expect(screen.getByRole("button", { name: "고스트 중립" })).toHaveClass(
    "c_fg.neutral",
  );

  // ghost는 danger tone을 지원
  expect(screen.getByRole("button", { name: "고스트 위험" })).toHaveClass(
    "c_fg.danger",
  );
});

test("size prop에 따라 font size가 올바르게 적용됨", () => {
  render(
    <>
      <Button variant="solid" size="sm">
        작은 버튼
      </Button>
      <Button variant="solid" size="md">
        중간 버튼
      </Button>
      <Button variant="solid" size="lg">
        큰 버튼
      </Button>
    </>,
  );

  expect(screen.getByRole("button", { name: "작은 버튼" })).toHaveClass(
    "fs_sm",
  );
  expect(screen.getByRole("button", { name: "중간 버튼" })).toHaveClass(
    "fs_md",
  );
  expect(screen.getByRole("button", { name: "큰 버튼" })).toHaveClass("fs_lg");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(
    <>
      <Button variant="solid" disabled>
        비활성화 버튼
      </Button>
      <Button variant="solid">활성화 버튼</Button>
    </>,
  );

  expect(screen.getByRole("button", { name: "비활성화 버튼" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "활성화 버튼" })).toBeEnabled();
  expect(screen.getByRole("button", { name: "비활성화 버튼" })).toHaveClass(
    "bg_bg.neutral.disabled!",
  );
});

test("기본적으로 버튼이 type='button'으로 렌더링됨", () => {
  render(<Button variant="solid">Default Button</Button>);
  const button = screen.getByRole("button", { name: "Default Button" });
  expect(button).toHaveAttribute("type", "button");
});

test("버튼이 type='button'으로 지정되었을 때 지정한대로 올바르게 렌더링됨", () => {
  render(<Button type="button">Button Type Button</Button>);
  const button = screen.getByRole("button", { name: "Button Type Button" });
  expect(button).toHaveAttribute("type", "button");
});

test("버튼이 type='submit'으로 지정되었을 때 지정한대로 올바르게 렌더링됨", () => {
  render(
    <form>
      <Button type="submit">Submit Type Button</Button>
    </form>,
  );
  const button = screen.getByRole("button", { name: "Submit Type Button" });
  expect(button).toHaveAttribute("type", "submit");
});

test("type='submit'으로 지정된 버튼 클릭 시, form이 제출됨", async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();
  render(
    <form onSubmit={handleSubmit}>
      <Button type="submit">Submit Button</Button>
    </form>,
  );

  const submitButton = screen.getByRole("button", { name: "Submit Button" });
  await user.click(submitButton);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test("type='button'으로 지정된 버튼 클릭 시 form이 제출되지 않음", async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();

  render(
    <form onSubmit={handleSubmit}>
      <Button type="button">Button Type Button</Button>
    </form>,
  );
  const buttonTypeButton = screen.getByRole("button", {
    name: "Button Type Button",
  });
  await user.click(buttonTypeButton);
  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("fullWidth 속성이 올바르게 적용됨", () => {
  render(<Button fullWidth>가득찬 버튼</Button>);
  const button = screen.getByRole("button", { name: "가득찬 버튼" });
  // fullWidth가 true일 때 w_100% 클래스가 적용되는지 확인
  expect(button.className).toContain("w_100%");
});

test("Icon과 함께 버튼이 올바르게 렌더링됨", () => {
  render(
    <Button leftIcon="star" rightIcon="search">
      테스트
    </Button>,
  );
  expect(screen.getByTestId("icon-star")).toBeInTheDocument();
  expect(screen.getByTestId("icon-search")).toBeInTheDocument();
});

test("로딩 상태가 올바르게 렌더링 됨", () => {
  render(<Button loading>로딩 상태</Button>);
  const loader = screen.getByTestId("button-loader");
  expect(loader).toBeInTheDocument();
});
