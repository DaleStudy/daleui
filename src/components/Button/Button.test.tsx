import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Button } from "./Button";

test("텍스트와 함께 버튼이 올바르게 렌더링됨", () => {
  render(<Button variant="solid">테스트</Button>);

  expect(screen.getByText("테스트")).toBeInTheDocument();
});

const toneAndVariantCases = [
  {
    case: "solid - brand",
    props: { variant: "solid", tone: "brand" },
    expectedClass: "bg_bgSolid.brand",
  },
  {
    case: "solid - neutral",
    props: { variant: "solid", tone: "neutral" },
    expectedClass: "bg_bgSolid.neutral",
  },
  {
    case: "solid - danger",
    props: { variant: "solid", tone: "danger" },
    expectedClass: "bg_bgSolid.danger",
  },
  {
    case: "outline - brand",
    props: { variant: "outline", tone: "brand" },
    expectedClass: "bd_brand",
  },
  {
    case: "outline - neutral",
    props: { variant: "outline", tone: "neutral" },
    expectedClass: "bd_neutral",
  },
  {
    case: "outline - danger",
    props: { variant: "outline", tone: "danger" },
    expectedClass: "bd_danger",
  },
  {
    case: "ghost - brand",
    props: { variant: "ghost", tone: "brand" },
    expectedClass: "c_fg.brand",
  },
  {
    case: "ghost - neutral",
    props: { variant: "ghost", tone: "neutral" },
    expectedClass: "c_fg.neutral",
  },
  {
    case: "ghost - danger",
    props: { variant: "ghost", tone: "danger" },
    expectedClass: "c_fg.danger",
  },
] as const;

test.each(toneAndVariantCases)("$case가 적용됨", ({ props, expectedClass }) => {
  render(<Button {...props}>버튼 테스트</Button>);
  expect(screen.getByRole("button", { name: "버튼 테스트" })).toHaveClass(
    expectedClass,
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
