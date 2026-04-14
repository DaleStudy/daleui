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
    expect(inputElement).toHaveAttribute("aria-invalid", "false");
  });

  test("invalid가 true일 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(<TextInput invalid />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
  });

  test("invalid가 false일 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(<TextInput invalid={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-invalid", "false");
  });

  test("required prop이 없을 때 aria-required 속성이 올바르게 설정된다", () => {
    render(<TextInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-required", "false");
  });

  test("required가 true일 때 aria-required 속성이 올바르게 설정된다", () => {
    render(<TextInput required />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-required", "true");
  });

  test("required가 false일 때 aria-required 속성이 올바르게 설정된다", () => {
    render(<TextInput required={false} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("aria-required", "false");
  });

  test("leadingIcon과 trailingIcon이 제공될 때 올바르게 렌더링되어야 한다.", () => {
    render(<TextInput leadingIcon="search" trailingIcon="x" />);

    expect(screen.getByTestId("icon-search")).toBeInTheDocument();
    expect(screen.getByTestId("icon-x")).toBeInTheDocument();
  });

  test("invalid가 true면 아이콘 tone이 danger로 적용된다", () => {
    render(<TextInput invalid leadingIcon="search" />);
    const icon = screen.getByTestId("icon-search");
    expect(icon.className).toMatch(/fg\.danger|danger/);
  });

  test("disabled가 true면 invalid와 무관하게 아이콘 tone이 neutral로 적용된다", () => {
    render(<TextInput disabled invalid leadingIcon="search" />);
    const icon = screen.getByTestId("icon-search");
    expect(icon.className).toMatch(/fg\.neutral|neutral/);
  });

  test("ref가 내부 input 엘리먼트로 전달되어야 한다.", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextInput ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test("제어 모드: value가 제공되면 올바르게 렌더링된다.", () => {
    render(<TextInput value="test" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("test");
  });

  test("제어 모드: value가 제공되지 않으면 defaultValue가 올바르게 렌더링된다.", () => {
    render(<TextInput defaultValue="test" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("test");
  });

  test("비제어 모드: defaultValue 제공 후 사용자가 텍스트를 입력하면 value가 변경된다.", async () => {
    const user = userEvent.setup();
    render(<TextInput defaultValue="test" />);
    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "test");
    expect(inputElement).toHaveValue("testtest");
  });

  test("defaultValue와 value가 모두 제공되면 value가 우선적으로 적용된다.", () => {
    render(<TextInput defaultValue="test" value="test2" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("test2");
  });

  test("helpText가 있으면 하단에 표시하고 aria-describedby로 연결한다", () => {
    render(<TextInput helpText="필수 항목입니다." />);
    expect(screen.getByText("필수 항목입니다.")).toBeInTheDocument();
    const input = screen.getByLabelText("텍스트 입력", { selector: "input" });
    const helpId = input.getAttribute("aria-describedby");
    expect(helpId).toBeTruthy();
  });

  test("id prop을 넘기면 입력 요소에 그대로 적용된다", () => {
    render(<TextInput id="user-name" />);
    expect(screen.getByLabelText("텍스트 입력")).toHaveAttribute(
      "id",
      "user-name",
    );
  });

  test("helpText가 빈 문자열이면 도움말을 렌더하지 않고 aria-describedby를 두지 않는다", () => {
    render(<TextInput helpText="" />);
    const input = screen.getByRole("textbox");
    expect(screen.queryByText("도움말을 입력하세요")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  test("aria-describedby prop과 helpText를 함께 쓰면 두 id를 공백으로 이어 붙인다", () => {
    render(<TextInput aria-describedby="extra-desc" helpText="힌트입니다." />);
    const input = screen.getByRole("textbox");
    const help = screen.getByText("힌트입니다.");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toMatch(/extra-desc/);
    expect(describedBy).toContain(help.id);
  });

  test("aria-describedby prop만 있고 helpText가 빈 문자열이면 해당 id만 aria-describedby에 넣는다", () => {
    render(<TextInput aria-describedby="only-extra" helpText="" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "only-extra");
  });

  test("errorMessage가 있으면 하단에 표시하고 aria-describedby로 연결한다", () => {
    render(<TextInput errorMessage="이메일 형식이 올바르지 않습니다." />);
    const error = screen.getByText("이메일 형식이 올바르지 않습니다.");
    expect(error).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
  });

  test("invalid일 때 errorMessage는 danger 스타일을 사용한다", () => {
    render(<TextInput invalid errorMessage="오류 메시지입니다." />);
    const error = screen.getByText("오류 메시지입니다.");
    expect(error.className).toMatch(/fg\.danger|danger/);
  });

  test("errorMessage와 helpText가 모두 있으면 errorMessage를 표시한다", () => {
    render(<TextInput errorMessage="오류입니다." helpText="도움말입니다." />);
    expect(screen.getByText("오류입니다.")).toBeInTheDocument();
    expect(screen.queryByText("도움말입니다.")).not.toBeInTheDocument();
  });
});
