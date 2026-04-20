import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { PasswordInput } from "./PasswordInput";

function getPasswordField() {
  return screen.getByPlaceholderText("패스워드를 입력해주세요.");
}

test("입력 필드를 패스워드 타입으로 렌더링한다", () => {
  render(<PasswordInput />);

  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("type", "password");
});

test("placeholder를 표시한다", () => {
  const placeholder = "패스워드를 입력해주세요.";
  render(<PasswordInput placeholder={placeholder} />);
  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test("아이콘 버튼 클릭 시 가시성을 토글한다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput />);

  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  const toggle = screen.getByRole("button");

  expect(input).toHaveAttribute("type", "password");
  await user.click(toggle);
  expect(input).toHaveAttribute("type", "text");
  await user.click(toggle);
  expect(input).toHaveAttribute("type", "password");
});

test("disabled일 때 토글되지 않는다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput disabled />);

  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  const toggle = screen.getByRole("button");

  expect(input).toHaveAttribute("type", "password");
  expect(toggle).toBeDisabled();
  await user.click(toggle);
  expect(input).toHaveAttribute("type", "password");
});

test("입력 값을 받는다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput />);

  const input = getPasswordField() as HTMLInputElement;
  await user.type(input, "test123");
  expect(input.value).toBe("test123");
});

test("disabled 상태를 올바르게 반영한다", () => {
  render(<PasswordInput disabled />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  const toggle = screen.getByRole("button");
  expect(input).toBeDisabled();
  expect(toggle).toBeDisabled();
});

test("접근성 속성을 제공한다 (aria-label, aria-pressed)", async () => {
  const user = userEvent.setup();
  render(<PasswordInput />);
  const toggle = screen.getByRole("button");
  expect(toggle).toHaveAttribute("aria-label", "패스워드 보기");
  expect(toggle).toHaveAttribute("aria-pressed", "false");
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-label", "패스워드 숨기기");
  expect(toggle).toHaveAttribute("aria-pressed", "true");
});

test("invalid prop이 없을 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveAttribute("aria-invalid", "false");
});

test("invalid가 true일 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput invalid />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveAttribute("aria-invalid", "true");
});

test("invalid가 false일 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput invalid={false} />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveAttribute("aria-invalid", "false");
});

test("required prop이 없을 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveAttribute("aria-required", "false");
});

test("required가 true일 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput required />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveAttribute("aria-required", "true");
});

test("required가 false일 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput required={false} />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveAttribute("aria-required", "false");
});

test("키보드(Space/Enter)로 가시성을 토글할 수 있다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  const toggle = screen.getByRole("button");
  expect(input).toHaveAttribute("type", "password");
  // 키보드 탭으로 포커스 이동
  await user.tab(); // input
  await user.tab(); // toggle button
  expect(toggle).toHaveFocus();
  await user.keyboard(" ");
  expect(input).toHaveAttribute("type", "text");
  await user.keyboard("{Enter}");
  expect(input).toHaveAttribute("type", "password");
});

test("제어 모드: value가 제공되면 올바르게 렌더링된다", () => {
  render(<PasswordInput value="test123" />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveValue("test123");
});

test("비제어 모드: defaultValue 제공 후 올바르게 렌더링된다", () => {
  render(<PasswordInput defaultValue="defaultPassword" />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveValue("defaultPassword");
});

test("비제어 모드: defaultValue 제공 후 사용자가 텍스트를 입력하면 value가 변경된다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput defaultValue="test" />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  await user.type(input, "123");
  expect(input).toHaveValue("test123");
});

test("defaultValue와 value가 모두 제공되면 value가 우선적으로 적용된다", () => {
  render(<PasswordInput defaultValue="default" value="controlled" />);
  const input = screen.getByPlaceholderText("패스워드를 입력해주세요.");
  expect(input).toHaveValue("controlled");
});

test("helperText가 있으면 하단에 표시하고 aria-describedby로 연결한다", () => {
  render(<PasswordInput helperText="8자 이상 입력해 주세요." />);
  const help = screen.getByText("8자 이상 입력해 주세요.");
  expect(help).toBeInTheDocument();
  const input = getPasswordField();
  expect(input).toHaveAccessibleDescription("8자 이상 입력해 주세요.");
});

test("id prop을 넘기면 입력 요소에 그대로 적용된다", () => {
  render(<PasswordInput id="user-password" />);
  expect(getPasswordField()).toHaveAttribute("id", "user-password");
});

test("aria-label prop을 입력 요소에 전달한다", () => {
  render(<PasswordInput aria-label="계정 비밀번호" />);
  expect(
    screen.getByLabelText("계정 비밀번호", { selector: "input" }),
  ).toBeInTheDocument();
});

describe("PasswordInput label", () => {
  test("label prop이 있으면 레이블을 렌더링하고 input과 연결된다", () => {
    render(<PasswordInput label="비밀번호" />);
    expect(
      screen.getByLabelText("비밀번호", { selector: "input" }),
    ).toBeInstanceOf(HTMLInputElement);
  });

  test("label prop이 없으면 레이블을 렌더링하지 않는다", () => {
    render(<PasswordInput />);
    // label prop이 없으면 레이블로 조회되지 않는다
    expect(
      screen.queryByLabelText("비밀번호", { selector: "input" }),
    ).not.toBeInTheDocument();
  });

  test("label + required이면 * 표시가 렌더링된다", () => {
    render(<PasswordInput label="비밀번호" required />);
    expect(screen.getByText("비밀번호")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("label + disabled이면 레이블이 비활성화 스타일이 된다", () => {
    render(<PasswordInput label="비밀번호" disabled />);
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName === "LABEL" && el.textContent?.trim() === "비밀번호",
      ),
    ).toHaveClass("c_fg.neutral.disabled");
  });
});
