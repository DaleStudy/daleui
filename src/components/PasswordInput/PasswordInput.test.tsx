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

test("기본 값을 렌더링한다", () => {
  render(<PasswordInput defaultValue="defaultPassword" />);
  const input = screen.getByLabelText(/패스워드/, {
    selector: "input",
  }) as HTMLInputElement;
  expect(input.value).toBe("defaultPassword");
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
  expect(input).not.toHaveAttribute("aria-invalid");
});

test("invalid가 true일 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput invalid />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-invalid", "true");
});

test("invalid가 false일 때 aria-invalid 속성이 올바르게 설정된다", () => {
  render(<PasswordInput invalid={false} />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).not.toHaveAttribute("aria-invalid");
});

test("required prop이 없을 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).not.toHaveAttribute("aria-required");
});

test("required가 true일 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput required />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).toHaveAttribute("aria-required", "true");
});

test("required가 false일 때 aria-required 속성이 올바르게 설정된다", () => {
  render(<PasswordInput required={false} />);
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input).not.toHaveAttribute("aria-required");
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
