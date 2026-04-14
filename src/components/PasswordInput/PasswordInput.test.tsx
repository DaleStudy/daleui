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

test("helpText가 있으면 하단에 표시하고 aria-describedby로 연결한다", () => {
  render(<PasswordInput helpText="8자 이상 입력해 주세요." />);
  expect(screen.getByText("8자 이상 입력해 주세요.")).toBeInTheDocument();
  const input = screen.getByLabelText("패스워드", { selector: "input" });
  const helpId = input.getAttribute("aria-describedby");
  expect(helpId).toBeTruthy();
  const help = screen.getByText("8자 이상 입력해 주세요.");
  expect(help).toBeInTheDocument();
});

test("id prop을 넘기면 입력 요소에 그대로 적용된다", () => {
  render(<PasswordInput id="user-password" />);
  expect(screen.getByLabelText("패스워드")).toHaveAttribute(
    "id",
    "user-password",
  );
});

test("helpText가 빈 문자열이면 도움말을 렌더하지 않고 aria-describedby를 두지 않는다", () => {
  render(<PasswordInput helpText="" />);
  const input = screen.getByLabelText("패스워드", { selector: "input" });
  expect(screen.queryByText("도움말을 입력하세요")).not.toBeInTheDocument();
  expect(input).not.toHaveAttribute("aria-describedby");
});

test("aria-describedby prop과 helpText를 함께 쓰면 두 id를 공백으로 이어 붙인다", () => {
  render(
    <PasswordInput aria-describedby="extra-desc" helpText="힌트입니다." />,
  );
  const input = screen.getByLabelText("패스워드", { selector: "input" });
  const help = screen.getByText("힌트입니다.");
  const describedBy = input.getAttribute("aria-describedby");
  expect(describedBy).toMatch(/extra-desc/);
  expect(describedBy).toContain(help.id);
});

test("aria-describedby prop만 있고 helpText가 빈 문자열이면 해당 id만 aria-describedby에 넣는다", () => {
  render(<PasswordInput aria-describedby="only-extra" helpText="" />);
  const input = screen.getByLabelText("패스워드", { selector: "input" });
  expect(input).toHaveAttribute("aria-describedby", "only-extra");
});

test("errorMessage가 있으면 하단에 표시하고 aria-describedby로 연결한다", () => {
  render(<PasswordInput errorMessage="패스워드 형식이 올바르지 않습니다." />);
  const error = screen.getByText("패스워드 형식이 올바르지 않습니다.");
  expect(error).toBeInTheDocument();
  const input = screen.getByLabelText(/패스워드/, { selector: "input" });
  expect(input.getAttribute("aria-describedby")).toBeTruthy();
});

test("invalid일 때 errorMessage는 danger 스타일을 사용한다", () => {
  render(<PasswordInput invalid errorMessage="오류 메시지입니다." />);
  const error = screen.getByText("오류 메시지입니다.");
  expect(error.className).toMatch(/fg\.danger|danger/);
});

test("errorMessage와 helpText가 모두 있으면 errorMessage를 표시한다", () => {
  render(<PasswordInput errorMessage="오류입니다." helpText="도움말입니다." />);
  expect(screen.getByText("오류입니다.")).toBeInTheDocument();
  expect(screen.queryByText("도움말입니다.")).not.toBeInTheDocument();
});
