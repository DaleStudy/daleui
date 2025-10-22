import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { icons, type IconName } from "../../tokens/iconography";
import { Icon } from "./Icon";

test.each(Object.keys(icons) as IconName[])(
  "%s 기본 아이콘을 렌더링한다",
  (name) => {
    render(<Icon name={name} aria-label={name} />);

    expect(screen.getByLabelText(name)).toBeInTheDocument();
    expect(screen.getByLabelText(name)).toHaveClass("c_currentcolor");
    expect(screen.getByLabelText(name)).toHaveClass("w_1.25rem h_1.25rem");
  },
);

test.each([
  ["neutral", "c_fg.neutral"],
  ["brand", "c_fg.brand"],
  ["danger", "c_fg.danger"],
  ["warning", "c_fg.warning"],
  ["success", "c_fg.success"],
  ["info", "c_fg.info"],
] as const)("%s 톤에 올바른 색상 클래스를 적용한다", (tone, className) => {
  render(<Icon name="user" tone={tone} aria-label={tone} />);

  expect(screen.getByLabelText(tone)).toHaveClass(className);
});

test.each([
  ["neutral", "c_fgSolid.neutral"],
  ["brand", "c_fgSolid.brand"],
  ["danger", "c_fgSolid.danger"],
  ["warning", "c_fgSolid.warning"],
  ["success", "c_fgSolid.success"],
  ["info", "c_fgSolid.info"],
] as const)("%s 솔리드 여부에 올바른 클래스를 적용한다", (tone, className) => {
  render(<Icon name="user" tone={tone} solid aria-label={tone} />);

  expect(screen.getByLabelText(tone)).toHaveClass(className);
});

test.each([
  ["xs", "w_0.75rem h_0.75rem"],
  ["sm", "w_1rem h_1rem"],
  ["md", "w_1.25rem h_1.25rem"],
  ["lg", "w_1.5rem h_1.5rem"],
] as const)("%s 크기에 올바른 크기 클래스를 적용한다", (size, className) => {
  render(<Icon name="user" size={size} aria-label={size} />);

  expect(screen.getByLabelText(size)).toHaveClass(className);
});
