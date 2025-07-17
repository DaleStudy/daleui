import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Icon } from "../Icon/Icon";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("기본 props로 올바르게 렌더링되어야 합니다.", () => {
    render(
      <TextInput placeholder="이름을 입력하세요" data-testid="text-input" />,
    );

    const inputElement = screen.getByPlaceholderText("이름을 입력하세요");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });

  it("사용자가 텍스트를 입력하면 value가 변경되고 onChange 핸들러가 호출되어야 합니다.", async () => {
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

  it("disabled prop이 true일 때 입력이 비활성화되어야 합니다.", async () => {
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

  it('state가 "error"일 때 aria-invalid 속성이 "true"여야 합니다.', () => {
    render(<TextInput state="error" data-testid="text-input" />);
    const inputElement = screen.getByTestId("text-input");
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
  });

  it("state가 없을 때 aria-invalid 속성을 갖지 않아야 합니다.", () => {
    render(<TextInput data-testid="text-input" />);
    const inputElement = screen.getByTestId("text-input");
    expect(inputElement).not.toHaveAttribute("aria-invalid", "true");

    // 또는 속성 자체가 없는 것을 명시적으로 테스트할 수 있습니다.
    expect(inputElement.hasAttribute("aria-invalid")).toBe(false);
  });

  it("leadingIcon과 trailingIcon이 제공될 때 올바르게 렌더링되어야 합니다.", () => {
    render(
      <TextInput
        leadingIcon={<Icon name="search" data-testid="leading-icon" />}
        trailingIcon={<Icon name="x" data-testid="trailing-icon" />}
      />,
    );

    expect(screen.getByTestId("leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trailing-icon")).toBeInTheDocument();
  });

  it("ref가 내부 input 엘리먼트로 전달되어야 합니다.", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextInput ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
