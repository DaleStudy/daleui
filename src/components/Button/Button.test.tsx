import { composeStories } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import * as stories from "./Button.stories";
import { Button } from "./Button";

const { Basic, Variants, Tones, Sizes, Disabled } = composeStories(stories);

test("renders the button with the correct text content", () => {
  render(<Basic>테스트</Basic>);

  expect(screen.getByText("테스트")).toBeInTheDocument();
});

test("applies the correct variant styles", () => {
  render(<Variants />);

  expect(screen.getByText("솔리드 버튼")).toHaveClass("bg_bg");
  expect(screen.getByText("아웃라인 버튼")).toHaveClass("bd_3px_solid");
});

test("applies the correct tone styles", () => {
  render(<Tones />);

  expect(screen.getByText("중립 색조")).toHaveClass("bg_bg");
  expect(screen.getByText("강조 색조")).toHaveClass("bg_bg.accent");
  expect(screen.getByText("위험 색조")).toHaveClass("bg_bg.danger");
  expect(screen.getByText("경고 색조")).toHaveClass("bg_bg.warning");
});

test("applies the correct font size based on the size prop", () => {
  render(<Sizes />);

  expect(screen.getByText("작은 버튼")).toHaveClass("fs_sm");
  expect(screen.getByText("중간 버튼")).toHaveClass("fs_md");
  expect(screen.getByText("큰 버튼")).toHaveClass("fs_lg");
});

test("applies the correct disabled styles", () => {
  render(<Disabled />);

  expect(screen.getByText("비활성화 버튼")).toBeDisabled();
  expect(screen.getByText("활성화 버튼")).toBeEnabled();
  expect(screen.getByText("비활성화 버튼")).toHaveClass("[&:disabled]:op_0.5");
});

test("renders a button with type='button' by default", () => {
  render(<Basic>Default Button</Basic>);
  const button = screen.getByText("Default Button");
  expect(button).toHaveAttribute("type", "button");
});

test("renders a button with type='button' by default", () => {
  render(<Basic variant="solid">Default Button</Basic>);
  const button = screen.getByText("Default Button");
  expect(button).toHaveAttribute("type", "button");
});

test("renders a button with type='button' when specified", () => {
  render(
    <Button type="button" variant="solid">
      Button Type Button
    </Button>
  );
  const button = screen.getByText("Button Type Button");
  expect(button).toHaveAttribute("type", "button");
});

test("renders a button with type='submit' when specified", () => {
  render(
    <form>
      <Button type="submit" variant="solid">
        Submit Type Button
      </Button>
    </form>
  );
  const button = screen.getByText("Submit Type Button");
  expect(button).toHaveAttribute("type", "submit");
});

test("submits the form when type='submit' button is clicked", () => {
  const handleSubmit = vi.fn();
  render(
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="solid">
        Submit Button
      </Button>
    </form>
  );

  const submitButton = screen.getByText("Submit Button");
  fireEvent.click(submitButton);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test("does not submit the form when type='button' button is clicked", () => {
  const handleSubmit = vi.fn();
  render(
    <form onSubmit={handleSubmit}>
      <Button type="button" variant="solid">
        Button Type Button
      </Button>
    </form>
  );
  const buttonTypeButton = screen.getByText("Button Type Button");
  fireEvent.click(buttonTypeButton);
  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
