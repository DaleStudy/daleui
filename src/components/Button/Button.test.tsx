import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import * as stories from "./Button.stories";
import { Button } from "./Button";

const { Basic, Variants, Tones, Sizes, Disabled } = composeStories(stories);

test("텍스트와 함께 버튼이 올바르게 렌더링됨", () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText("테스트")).toBeInTheDocument();
});

test("variant 속성이 올바르게 적용됨", () => {
  render(<Variants />);

  expect(screen.getByText("솔리드 버튼")).toHaveClass("bg_bg");
  expect(screen.getByText("아웃라인 버튼")).toHaveClass("bd_3px_solid");
});

test("tone 속성이 올바르게 적용됨", () => {
  render(<Tones />);

  expect(screen.getByText("중립 색조")).toHaveClass("bg_bg");
  expect(screen.getByText("강조 색조")).toHaveClass("bg_bg.accent");
  expect(screen.getByText("위험 색조")).toHaveClass("bg_bg.danger");
  expect(screen.getByText("경고 색조")).toHaveClass("bg_bg.warning");
});

test("size prop에 따라 font size가 올바르게 적용됨", () => {
  render(<Sizes />);

  expect(screen.getByText("작은 버튼")).toHaveClass("fs_sm");
  expect(screen.getByText("중간 버튼")).toHaveClass("fs_md");
  expect(screen.getByText("큰 버튼")).toHaveClass("fs_lg");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(<Disabled />);

  expect(screen.getByText("비활성화 버튼")).toBeDisabled();
  expect(screen.getByText("활성화 버튼")).toBeEnabled();
  expect(screen.getByText("비활성화 버튼")).toHaveClass("[&:disabled]:op_0.5");
});

test("기본적으로 버튼이 type='button'으로 렌더링됨", () => {
  render(<Basic>Default Button</Basic>);
  const button = screen.getByText("Default Button");
  expect(button).toHaveAttribute("type", "button");
});

test("기본적으로 버튼이 type='button'으로 렌더링됨", () => {
  render(<Basic variant="solid">Default Button</Basic>);
  const button = screen.getByText("Default Button");
  expect(button).toHaveAttribute("type", "button");
});

test("버튼이 type='button'으로 지정되었을 때 지정한대로 올바르게 렌더링됨", () => {
  render(
    <Button type="button" variant="solid">
      Button Type Button
    </Button>,
  );
  const button = screen.getByText("Button Type Button");
  expect(button).toHaveAttribute("type", "button");
});

test("버튼이 type='submit'으로 지정되었을 때 지정한대로 올바르게 렌더링됨", () => {
  render(
    <form>
      <Button type="submit" variant="solid">
        Submit Type Button
      </Button>
    </form>,
  );
  const button = screen.getByText("Submit Type Button");
  expect(button).toHaveAttribute("type", "submit");
});

test("type='submit'으로 지정된 버튼 클릭 시, form이 제출됨", async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();
  render(
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="solid">
        Submit Button
      </Button>
    </form>,
  );

  const submitButton = screen.getByText("Submit Button");
  await user.click(submitButton);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test("type='button'으로 지정된 버튼 클릭 시 form이 제출되지 않음", async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();

  render(
    <form onSubmit={handleSubmit}>
      <Button type="button" variant="solid">
        Button Type Button
      </Button>
    </form>,
  );
  const buttonTypeButton = screen.getByText("Button Type Button");
  await user.click(buttonTypeButton);
  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
