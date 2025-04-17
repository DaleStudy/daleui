import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import { Radio, RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
  test.todo("tone 속성이 올바르게 적용됨", () => {});
  test.todo("direction 속성이 올바르게 적용됨", () => {});

  test("RadioGroup이 올바르게 자식 요소와 함께 렌더링됨", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    expect(screen.getByText("Test Radio Group")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("name 속성이 올바르게 설정됨", () => {
    render(
      <RadioGroup name="test-name" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
      </RadioGroup>
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeInTheDocument();

    const radioInputs = document.querySelectorAll('input[type="radio"]');
    expect(radioInputs.length).toBeGreaterThan(0);
    expect(radioInputs[0]).toHaveAttribute("name", "test-name");
  });

  test("defaultValue가 제공될 때 해당 값이 선택됨", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group" defaultValue="option2">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("defaultValue가 제공되지 않을 때 아무것도 선택되지 않음", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
  });

  test("value와 defaultValue가 모두 제공될 때 value가 우선시됨", () => {
    render(
      <RadioGroup
        name="test"
        label="Test Radio Group"
        defaultValue="option1"
        value="option2"
      >
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("disabled가 true일 때 모든 Radio이 비활성화됨", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group" disabled>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  test("Radio 선택 시 onChange가 호출됨", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup name="test" label="Test Radio Group" onChange={onChange}>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });

    await user.click(option1);
    expect(onChange).toHaveBeenCalledWith("option1");
  });

  test("required가 true일 때 접근성 속성이 올바르게 적용됨", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group" required>
        <Radio value="option1">Option 1</Radio>
      </RadioGroup>
    );

    const radioInput = screen.getByRole("radio");
    expect(radioInput).toHaveAttribute("aria-required", "true");
  });

  test("controlled 모드가 올바르게 작동함", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const ControlledRadioTest = () => {
      const [selectedValue, setSelectedValue] = useState("option1");

      return (
        <RadioGroup
          name="test"
          label="Test Radio Group"
          value={selectedValue}
          onChange={(value) => {
            onChange(value);
            setSelectedValue(value);
          }}
        >
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
        </RadioGroup>
      );
    };

    render(<ControlledRadioTest />);

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(onChange).toHaveBeenCalledWith("option2");
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });
});

describe("Radio", () => {
  test("RadioGroup 외부에서 사용될 경우 에러가 발생함", () => {
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      render(<Radio value="option1">Option 1</Radio>);
    }).toThrow("Radio 컴포넌트는 RadioGroup 내부에서만 사용해야 합니다.");

    console.error = originalError;
  });

  test("value가 올바르게 동작함", async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    await user.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("disabled 속성이 올바르게 적용됨", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2" disabled>
          Option 2
        </Radio>
      </RadioGroup>
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeDisabled();
    expect(option2).toBeDisabled();
  });
});
