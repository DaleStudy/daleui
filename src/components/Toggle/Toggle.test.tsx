import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("렌더링", () => {
  test("라벨을 렌더링한다.", () => {
    render(<Toggle label="알림 받기" />);
    expect(screen.getByText("알림 받기")).toBeInTheDocument();
  });

  test("라벨 없이도 렌더링된다.", () => {
    render(<Toggle />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("name 속성을 설정할 수 있다.", () => {
    render(<Toggle name="toggle-name" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("name", "toggle-name");
  });

  test("name 속성이 없으면 name 어트리뷰트가 없다.", () => {
    render(<Toggle />);
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("name");
  });

  test("defaultChecked가 true이면 초기 체크 상태로 렌더링된다.", () => {
    render(<Toggle defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("defaultChecked가 false이면 초기 체크되지 않은 상태로 렌더링된다.", () => {
    render(<Toggle defaultChecked={false} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("disabled가 true이면 비활성화 상태가 된다.", () => {
    render(<Toggle disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  test("비활성화 + 체크된 상태를 동시에 가질 수 있다.", () => {
    render(<Toggle disabled defaultChecked />);
    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeDisabled();
    expect(toggle).toBeChecked();
  });
});

describe("사용자 동작", () => {
  test("클릭하면 체크 상태가 변경된다.", async () => {
    const user = userEvent.setup();
    render(<Toggle />);
    const toggle = screen.getByRole("checkbox");

    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });

  test("라벨 클릭으로도 체크 상태가 변경된다.", async () => {
    const user = userEvent.setup();
    render(<Toggle label="알림 받기" />);
    const toggle = screen.getByRole("checkbox");

    expect(toggle).not.toBeChecked();
    await user.click(screen.getByText("알림 받기"));
    expect(toggle).toBeChecked();
  });

  test("비활성화 상태에서 클릭해도 상태가 변경되지 않는다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle disabled onChange={handleChange} />);

    await user.click(screen.getByRole("checkbox"));
    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("켤 때 onChange가 true를 전달한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle onChange={handleChange} />);

    await user.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test("끌 때 onChange가 false를 전달한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle defaultChecked onChange={handleChange} />);

    await user.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});

describe("상태 관리", () => {
  test("제어 모드: checked가 true이면 체크된 상태로 렌더링된다.", () => {
    render(<Toggle checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("제어 모드: checked가 false이면 체크되지 않은 상태로 렌더링된다.", () => {
    render(<Toggle checked={false} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("제어 모드: checked와 onChange를 함께 사용하여 제어된 모드로 동작한다.", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { rerender } = render(
      <Toggle checked={false} onChange={handleChange} />,
    );

    const toggle = screen.getByRole("checkbox");
    expect(toggle).not.toBeChecked();

    await user.click(toggle);
    expect(handleChange).toHaveBeenCalledWith(true);

    rerender(<Toggle checked={true} onChange={handleChange} />);
    expect(toggle).toBeChecked();
  });

  test("비제어 모드: defaultChecked 후 클릭으로 상태를 변경할 수 있다.", async () => {
    const user = userEvent.setup();
    render(<Toggle defaultChecked={false} />);
    const toggle = screen.getByRole("checkbox");

    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });
});
