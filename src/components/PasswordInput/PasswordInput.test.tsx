import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { PasswordInput } from "./PasswordInput";

test("입력 필드를 패스워드 타입으로 렌더링한다", () => {
  render(<PasswordInput />);

  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
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

  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
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

  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  const toggle = screen.getByRole("button");

  expect(input).toHaveAttribute("type", "password");
  expect(toggle).toBeDisabled();
  await user.click(toggle);
  expect(input).toHaveAttribute("type", "password");
});

test("입력 값을 받는다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput />);

  const input = screen.getByLabelText(/패스워드/, {
    selector: "input",
  }) as HTMLInputElement;
  await user.type(input, "test123");
  expect(input.value).toBe("test123");
});

test("disabled 상태를 올바르게 반영한다", () => {
  render(<PasswordInput disabled />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
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
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-invalid", "false");
});

test("invalid가 true일 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput invalid />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-invalid", "true");
});

test("invalid가 false일 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput invalid={false} />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-invalid", "false");
});

test("required prop이 없을 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-required", "false");
});

test("required가 true일 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput required />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-required", "true");
});

test("required가 false일 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput required={false} />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-required", "false");
});

test("키보드(Space/Enter)로 가시성을 토글할 수 있다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
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
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveValue("test123");
});

test("비제어 모드: defaultValue 제공 후 올바르게 렌더링된다", () => {
  render(<PasswordInput defaultValue="defaultPassword" />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveValue("defaultPassword");
});

test("비제어 모드: defaultValue 제공 후 사용자가 텍스트를 입력하면 value가 변경된다", async () => {
  const user = userEvent.setup();
  render(<PasswordInput defaultValue="test" />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  await user.type(input, "123");
  expect(input).toHaveValue("test123");
});

test("defaultValue와 value가 모두 제공되면 value가 우선적으로 적용된다", () => {
  render(<PasswordInput defaultValue="default" value="controlled" />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveValue("controlled");
});
