import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import { Radio, RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
  test("라벨과 자식 요소들을 렌더링한다", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
    );

    expect(screen.getByText("Test Radio Group")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("defaultValue가 제공되면 해당 값을 선택한다", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group" defaultValue="option2">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("defaultValue가 제공되지 않으면 아무것도 선택하지 않는다", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
  });

  test("value가 defaultValue보다 우선한다", () => {
    render(
      <RadioGroup
        name="test"
        label="Test Radio Group"
        defaultValue="option1"
        value="option2"
      >
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("disabled가 true일 때 모든 라디오를 비활성화한다", () => {
    render(
      <RadioGroup name="test" label="Test Radio Group" disabled>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  test("라디오 선택 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup name="test" label="Test Radio Group" onChange={onChange}>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });

    await user.click(option1);
    expect(onChange).toHaveBeenCalledWith("option1");
  });

  test("제어 모드에서 정상적으로 동작한다", async () => {
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
  test("다른 값들을 선택할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup name="test" label="Test Radio Group">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>,
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

  test.each([
    ["Option 1", false],
    ["Option 2", true],
  ] as const)(
    "%s의 disabled 속성을 %s로 올바르게 적용한다",
    (optionName, isDisabled) => {
      render(
        <RadioGroup name="test" label="Test Radio Group">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2" disabled>
            Option 2
          </Radio>
        </RadioGroup>,
      );

      const option = screen.getByRole("radio", { name: optionName });

      if (isDisabled) {
        expect(option).toBeDisabled();
      } else {
        expect(option).not.toBeDisabled();
      }
    },
  );

  test.each([
    ["neutral"],
    ["brand"],
    ["danger"],
    ["warning"],
    ["success"],
    ["info"],
  ] as const)("%s 톤을 올바르게 렌더링한다", (tone) => {
    render(
      <RadioGroup name="test" label="Test Radio Group" tone={tone}>
        <Radio value="option1">Option 1</Radio>
      </RadioGroup>,
    );

    const radio = screen.getByRole("radio", { name: "Option 1" });
    expect(radio).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const container = radio.closest("label");
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      container?.querySelector('div[class*="border"]'),
    ).toBeInTheDocument();
  });
});
