import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import * as stories from "./Checkbox.stories";

const { Basic, Tones, States, Disabled, Required } = composeStories(stories);

test("label과 함께 체크박스가 올바르게 렌더링됨", () => {
  render(<Basic />);
  expect(screen.getByText("기본 체크박스")).toBeInTheDocument();
});

test("체크박스에 체크 시, tone 속성이 올바르게 적용됨", async () => {
  const user = userEvent.setup();
  render(<Tones />);

  const brandCheckbox = screen.getByLabelText("브랜드 색조");
  const neutralCheckbox = screen.getByLabelText("중립 색조");
  const dangerCheckbox = screen.getByLabelText("위험 색조");
  const warningCheckbox = screen.getByLabelText("경고 색조");
  const successCheckbox = screen.getByLabelText("성공 색조");
  const infoCheckbox = screen.getByLabelText("정보 색조");

  // Simulate checking each checkbox

  await user.click(brandCheckbox);
  await user.click(neutralCheckbox);
  await user.click(dangerCheckbox);
  await user.click(warningCheckbox);
  await user.click(successCheckbox);
  await user.click(infoCheckbox);

  // Check for data-state attribute which indicates checked state
  expect(brandCheckbox).toHaveAttribute("aria-checked", "true");
  expect(neutralCheckbox).toHaveAttribute("aria-checked", "true");
  expect(dangerCheckbox).toHaveAttribute("aria-checked", "true");
  expect(warningCheckbox).toHaveAttribute("aria-checked", "true");
  expect(successCheckbox).toHaveAttribute("aria-checked", "true");
  expect(infoCheckbox).toHaveAttribute("aria-checked", "true");

  // Check for correct background colors based on tone
  expect(brandCheckbox).toHaveClass("[&:checked]:bg_bgSolid.brand");
  expect(neutralCheckbox).toHaveClass("[&:checked]:bg_bgSolid.neutral");
  expect(dangerCheckbox).toHaveClass("[&:checked]:bg_bgSolid.danger");
  expect(warningCheckbox).toHaveClass("[&:checked]:bg_bgSolid.warning");
  expect(successCheckbox).toHaveClass("[&:checked]:bg_bgSolid.success");
  expect(infoCheckbox).toHaveClass("[&:checked]:bg_bgSolid.info");
});

test("체크된 상태와 체크되지않은 상태가 올바르게 렌더링됨", () => {
  render(<States />);

  const checkedCheckbox = screen.getByLabelText("체크된 상태");
  const uncheckedCheckbox = screen.getByLabelText("체크되지 않은 상태");

  expect(checkedCheckbox).toHaveAttribute("aria-checked", "true");
  expect(uncheckedCheckbox).toHaveAttribute("aria-checked", "false");
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

  expect(disabledCheckedCheckbox).toHaveClass(
    "[&:checked]:bg_bg.neutral.disabled!",
  );
  expect(disabledCheckedCheckbox).toHaveClass(
    "[&:checked]:bd-c_bg.neutral.disabled!",
  );
  expect(disabledUncheckedCheckbox).toHaveClass(
    "[&:disabled]:bd-c_border.neutral.disabled",
  );
});

test("필수 표시가 올바르게 표시됨", () => {
  render(<Required />);

  expect(
    screen.getByRole("checkbox", {
      name: "필수 체크박스 *",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", {
      name: "선택 체크박스",
    }),
  ).toBeInTheDocument();
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
  expect(checkbox).toHaveAttribute("aria-checked", "false");

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
  expect(checkbox).toHaveAttribute("aria-checked", "false");

  // Click to check
  await user.click(checkbox);
  expect(checkbox).toHaveAttribute("aria-checked", "true");

  // Click again to uncheck
  await user.click(checkbox);
  expect(checkbox).toHaveAttribute("aria-checked", "false");
});

test("required 속성값이 true일 경우, label에 별표가 추가됨", () => {
  render(
    <Checkbox id="required-checkbox" label="필수 체크박스" required={true} />,
  );

  const requiredIndicator = screen.getByText("*");
  expect(requiredIndicator).toBeInTheDocument();
  expect(requiredIndicator).toHaveClass("c_fg.danger");
});
