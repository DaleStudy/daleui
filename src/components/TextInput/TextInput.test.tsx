import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  test("기본 props로 올바르게 렌더링되어야 한다.", () => {
    render(
      <TextInput placeholder="이름을 입력하세요" data-testid="text-input" />,
    );

    const inputElement = screen.getByPlaceholderText("이름을 입력하세요");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });

  test("사용자가 텍스트를 입력하면 value가 변경되고 onChange 핸들러가 호출되어야 한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <TextInput
        placeholder="테스트"
        onChange={handleChange}
        data-testid="text-input"
      />,
    );

    const inputElement = screen.getByPlaceholderText(
      "테스트",
    ) as HTMLInputElement;
    await user.type(inputElement, "안녕하세요");

    expect(handleChange).toHaveBeenCalled();
    expect(inputElement.value).toBe("안녕하세요");
  });

  test("disabled prop이 true일 때 입력이 비활성화되어야 한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <TextInput
        placeholder="비활성"
        disabled
        onChange={handleChange}
        data-testid="text-input"
      />,
    );

    const inputElement = screen.getByPlaceholderText("비활성");
    expect(inputElement).toBeDisabled();

    await user.type(inputElement, "테스트").catch(() => {});

    expect(handleChange).not.toHaveBeenCalled();
  });

  test("invalid prop이 없을 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(<TextInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).not.toHaveAttribute("aria-invalid");
  });

  test("invalid가 true일 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(<TextInput invalid />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
  });

  test("invalid가 false일 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(<TextInput invalid={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).not.toHaveAttribute("aria-invalid");
  });

  test("required prop이 없을 때 aria-required 속성이 올바르게 설정된다", () => {
    render(<TextInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).not.toHaveAttribute("aria-required");
  });

  test("required가 true일 때 aria-required 속성이 올바르게 설정된다", () => {
    render(<TextInput required />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-required", "true");
  });

  test("required가 false일 때 aria-required 속성이 올바르게 설정된다", () => {
    render(<TextInput required={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).not.toHaveAttribute("aria-required");
  });

  test("leadingIcon과 trailingIcon이 제공될 때 올바르게 렌더링되어야 한다.", () => {
    render(<TextInput leadingIcon="search" trailingIcon="x" />);

    expect(screen.getByTestId("icon-search")).toBeInTheDocument();
    expect(screen.getByTestId("icon-x")).toBeInTheDocument();
  });

  test("ref가 내부 input 엘리먼트로 전달되어야 한다.", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextInput ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
