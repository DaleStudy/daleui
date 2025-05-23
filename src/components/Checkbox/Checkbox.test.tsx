import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import * as stories from "./Checkbox.stories";
import { Checkbox } from "./Checkbox";

const { Basic, Tones, States, Disabled, Required } = composeStories(stories);

test("label과 함께 체크박스가 올바르게 렌더링됨", () => {
  render(<Basic />);
  expect(screen.getByText("기본 체크박스")).toBeInTheDocument();
});

test("체크박스에 체크 시, tone 속성이 올바르게 적용됨", async () => {
  const user = userEvent.setup();
  render(<Tones />);

  const neutralCheckbox = screen.getByLabelText("중립 색조");
  const accentCheckbox = screen.getByLabelText("강조 색조");
  const dangerCheckbox = screen.getByLabelText("위험 색조");
  const warningCheckbox = screen.getByLabelText("경고 색조");

  // Simulate checking each checkbox

  await user.click(neutralCheckbox);
  await user.click(accentCheckbox);
  await user.click(dangerCheckbox);
  await user.click(warningCheckbox);

  // Check for data-state attribute which indicates checked state
  expect(neutralCheckbox).toHaveAttribute("data-state", "checked");
  expect(accentCheckbox).toHaveAttribute("data-state", "checked");
  expect(dangerCheckbox).toHaveAttribute("data-state", "checked");
  expect(warningCheckbox).toHaveAttribute("data-state", "checked");

  // Check for correct background colors based on tone
  expect(neutralCheckbox).toHaveClass("[&[data-state='checked']]:bg-c_bg");
  expect(accentCheckbox).toHaveClass(
    "[&[data-state='checked']]:bg-c_bg.accent",
  );
  expect(dangerCheckbox).toHaveClass(
    "[&[data-state='checked']]:bg-c_bg.danger",
  );
  expect(warningCheckbox).toHaveClass(
    "[&[data-state='checked']]:bg-c_bg.warning",
  );
});

test("체크된 상태와 체크되지않은 상태가 올바르게 렌더링됨", () => {
  render(<States />);

  const checkedCheckbox = screen.getByLabelText("체크된 상태");
  const uncheckedCheckbox = screen.getByLabelText("체크되지 않은 상태");

  expect(checkedCheckbox).toHaveAttribute("data-state", "checked");
  expect(uncheckedCheckbox).toHaveAttribute("data-state", "unchecked");
});

test("disabled 속성이 올바르게 적용됨", () => {
  render(<Disabled />);

  const disabledCheckedCheckbox =
    screen.getByLabelText("비활성화 & 체크된 상태");
  const disabledUncheckedCheckbox =
    screen.getByLabelText("비활성화 & 체크되지 않은 상태");
  const enabledCheckbox = screen.getByLabelText("활성화 상태");

  expect(disabledCheckedCheckbox).toBeDisabled();
  expect(disabledUncheckedCheckbox).toBeDisabled();
  expect(enabledCheckbox).not.toBeDisabled();

  // Check for opacity class that indicates disabled state
  expect(disabledCheckedCheckbox).toHaveClass("[&:disabled]:op_0.5");
  expect(disabledUncheckedCheckbox).toHaveClass("[&:disabled]:op_0.5");
});

test("필수 표시가 올바르게 표시됨", () => {
  render(<Required />);

  const requiredLabel = screen.getByText("필수 체크박스").parentElement;
  const optionalLabel = screen.getByText("선택 체크박스");

  // Check for required indicator (asterisk)
  expect(requiredLabel).toContainHTML("*");
  expect(optionalLabel).not.toContainHTML("*");
});

test("체크박스 클릭 시, onChange 핸들러가 호출됨", async () => {
  const handleChange = vi.fn();
  const user = userEvent.setup();

  render(
    <Checkbox
      id="test-checkbox"
      label="테스트 체크박스"
      onChange={handleChange}
    />,
  );

  const checkbox = screen.getByLabelText("테스트 체크박스");

  // Initially unchecked
  expect(checkbox).toHaveAttribute("data-state", "unchecked");

  // Click to check
  await user.click(checkbox);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith(true, undefined);

  // Click again to uncheck
  await user.click(checkbox);
  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange).toHaveBeenCalledWith(false, undefined);
});

test("value값이 있을 경우, 체크 시 value가 onChange 핸들러로 전달됨", async () => {
  const handleChange = vi.fn();
  const user = userEvent.setup();

  render(
    <Checkbox
      id="value-checkbox"
      label="값이 있는 체크박스"
      value="test-value"
      onChange={handleChange}
    />,
  );

  const checkbox = screen.getByLabelText("값이 있는 체크박스");

  // Click to check
  await user.click(checkbox);
  expect(handleChange).toHaveBeenCalledWith(true, "test-value");
});

test("required 속성이 올바르게 처리됨", () => {
  render(
    <Checkbox id="required-checkbox" label="필수 체크박스" required={true} />,
  );

  // 정규 표현식을 사용하여 라벨 찾기 (별표가 있어도 일치)
  const checkbox = screen.getByRole("checkbox", { name: /필수 체크박스/ });

  // aria-required 속성 확인
  expect(checkbox).toHaveAttribute("aria-required", "true");
});

test("체크박스가 클릭될 때 체크 상태가 전환됨", async () => {
  const user = userEvent.setup();

  render(<Basic />);

  const checkbox = screen.getByLabelText("기본 체크박스");

  // Initially unchecked
  expect(checkbox).toHaveAttribute("data-state", "unchecked");

  // Click to check
  await user.click(checkbox);
  expect(checkbox).toHaveAttribute("data-state", "checked");

  // Click again to uncheck
  await user.click(checkbox);
  expect(checkbox).toHaveAttribute("data-state", "unchecked");
});

test("required 속성값이 true일 경우, label에 별표가 추가됨", () => {
  render(
    <Checkbox id="required-checkbox" label="필수 체크박스" required={true} />,
  );

  const requiredIndicator = screen.getByText("*");
  expect(requiredIndicator).toBeInTheDocument();
  expect(requiredIndicator).toHaveClass("c_text.danger");
});
