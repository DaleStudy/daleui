import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("라벨과 함께 렌더링된다", () => {
    render(<Checkbox label="테스트 체크박스" />);
    expect(screen.getByText("테스트 체크박스")).toBeInTheDocument();
  });

  it("초기 체크 상태를 설정할 수 있다", () => {
    render(<Checkbox label="체크됨" defaultChecked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("클릭하면 체크 상태가 변경된다", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="클릭 가능" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("비활성화 상태에서는 클릭할 수 없다", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="비활성화" disabled />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("체크 상태 변경 시 콜백이 호출된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="콜백 테스트" onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith({ checked: true });
  });

  it("name 속성을 설정할 수 있다", () => {
    render(<Checkbox label="이름" name="test-name" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "test-name");
  });

  it("tone 속성을 설정할 수 있다", () => {
    render(<Checkbox label="톤 테스트" tone="success" />);
    expect(screen.getByText("톤 테스트")).toBeInTheDocument();
  });

  it("invalid 속성을 설정할 수 있다", () => {
    render(<Checkbox label="유효하지 않음" invalid />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });
});
