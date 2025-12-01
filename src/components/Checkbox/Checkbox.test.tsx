import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("렌더링", () => {
  test("문자열 라벨을 렌더링한다.", () => {
    render(<Checkbox label="테스트 라벨" />);
    expect(screen.getByText("테스트 라벨")).toBeInTheDocument();
  });

  test("ReactNode 라벨을 렌더링한다.", () => {
    render(
      <Checkbox
        label={
          <span data-testid="custom-label">
            <strong>커스텀</strong> 라벨
          </span>
        }
      />,
    );
    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
  });

  test("라벨이 없이도 렌더링된다.", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("name 속성을 설정할 수 있다.", () => {
    render(<Checkbox label="테스트" name="checkbox-name" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "checkbox-name");
  });

  test("name 속성이 없으면 name 어트리뷰트가 없다.", () => {
    render(<Checkbox label="테스트" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toHaveAttribute("name");
  });

  test("defaultChecked가 true이면 초기 체크 상태로 렌더링된다.", () => {
    render(<Checkbox label="테스트" defaultChecked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("defaultChecked가 false이면 초기 체크되지 않은 상태로 렌더링된다.", () => {
    render(<Checkbox label="테스트" defaultChecked={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("disabled가 true이면 비활성화 상태가 된다.", () => {
    render(<Checkbox label="테스트" disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  test("비활성화 + 체크된 상태를 동시에 가질 수 있다.", () => {
    render(<Checkbox label="테스트" disabled defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(checkbox).toBeChecked();
  });

  test("error가 true이면 aria-invalid가 설정된다.", () => {
    render(<Checkbox label="테스트" error />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  test("error와 disabled가 함께 사용될 수 있다.", () => {
    render(<Checkbox label="테스트" error disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  test("tone 기본값은 brand이다.", () => {
    render(<Checkbox label="기본 톤" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("기본 톤")).toBeInTheDocument();
  });

  test("모든 props를 함께 사용할 수 있다.", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        label="전체 테스트"
        name="full-test"
        defaultChecked={true}
        tone="success"
        onChange={handleChange}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(screen.getByText("전체 테스트")).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("name", "full-test");
    expect(checkbox).toBeChecked();
  });
});

describe("사용자 동작", () => {
  test("클릭하면 체크 상태가 변경된다.", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="테스트" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("라벨 클릭으로도 체크 상태가 변경된다.", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="라벨 클릭 테스트" />);
    const label = screen.getByText("라벨 클릭 테스트");
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(label);
    expect(checkbox).toBeChecked();
  });

  test("비활성화 상태에서 클릭해도 상태가 변경되지 않는다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="테스트" disabled onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  test("error 상태에서도 체크박스 기능은 정상 동작한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="테스트" error onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith({ checked: true });
    expect(checkbox).toBeChecked();
  });

  test("체크 시 onChange가 { checked: true }로 호출된다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="테스트" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith({ checked: true });
  });

  test("체크 해제 시 onChange가 { checked: false }로 호출된다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="테스트" defaultChecked onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith({ checked: false });
  });
});

describe("상태 관리", () => {
  test("제어 모드: checked가 true이면 체크된 상태로 렌더링된다.", () => {
    render(<Checkbox label="테스트" checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("제어 모드: checked가 false이면 체크되지 않은 상태로 렌더링된다.", () => {
    render(<Checkbox label="테스트" checked={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("제어 모드: checked와 onChange를 함께 사용하여 제어된 모드로 동작한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(
      <Checkbox label="테스트" checked={false} onChange={handleChange} />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith({ checked: true });

    // controlled 모드이므로 props가 변경되어야 상태가 바뀜
    rerender(
      <Checkbox label="테스트" checked={true} onChange={handleChange} />,
    );
    expect(checkbox).toBeChecked();
  });

  test("비제어 모드: defaultChecked 후 클릭으로 상태를 변경할 수 있다.", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="테스트" defaultChecked={false} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("비제어 모드: onChange가 없어도 체크박스가 동작한다.", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="테스트" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
