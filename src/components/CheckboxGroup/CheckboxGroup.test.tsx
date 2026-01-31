import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import { CheckboxGroup, CheckboxItem } from "./CheckboxGroup";

describe("CheckboxGroup", () => {
  test("라벨과 자식 요소들을 렌더링한다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group">
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    expect(screen.getByText("Test Checkbox Group")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("defaultValues가 제공되면 해당 값들을 선택한다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        defaultValues={["option2"]}
      >
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("defaultValues가 제공되지 않으면 아무것도 선택하지 않는다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group">
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
  });

  test("여러 값을 defaultValues로 선택할 수 있다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        defaultValues={["option1", "option2"]}
      >
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
        <CheckboxItem value="option3">Option 3</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");
    const option3 = screen.getByLabelText("Option 3");

    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).not.toBeChecked();
  });

  test("values가 defaultValues보다 우선한다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        defaultValues={["option1"]}
        values={["option2"]}
      >
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("disabled가 true일 때 모든 체크박스를 비활성화한다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group" disabled>
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  test("그룹 disabled가 하위 CheckboxItem의 disabled 스타일을 적용한다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        disabled
        defaultValues={["option1"]}
      >
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  test("그룹 disabled와 개별 disabled가 모두 적용된다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group" disabled>
        <CheckboxItem value="option1" disabled>
          Option 1
        </CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  test("체크박스 선택 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        onChange={onChange}
      >
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");

    await user.click(option1);
    expect(onChange).toHaveBeenCalledWith(["option1"]);
  });

  test("여러 체크박스를 선택할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxGroup name="test" label="Test Checkbox Group">
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
        <CheckboxItem value="option3">Option 3</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");
    const option3 = screen.getByLabelText("Option 3");

    await user.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
    expect(option3).not.toBeChecked();

    await user.click(option2);
    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).not.toBeChecked();

    await user.click(option3);
    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).toBeChecked();
  });

  test("체크박스를 해제할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        defaultValues={["option1", "option2"]}
      >
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).toBeChecked();
    expect(option2).toBeChecked();

    await user.click(option1);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  test("제어 모드에서 정상적으로 동작한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const ControlledCheckboxTest = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([
        "option1",
      ]);

      return (
        <CheckboxGroup
          name="test"
          label="Test Checkbox Group"
          values={selectedValues}
          onChange={(values) => {
            onChange(values);
            setSelectedValues(values);
          }}
        >
          <CheckboxItem value="option1">Option 1</CheckboxItem>
          <CheckboxItem value="option2">Option 2</CheckboxItem>
        </CheckboxGroup>
      );
    };

    render(<ControlledCheckboxTest />);

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(onChange).toHaveBeenCalledWith(["option1", "option2"]);
    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
  });

  test("required가 true일 때 라벨 옆에 별표를 표시한다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group" required>
        <CheckboxItem value="option1">Option 1</CheckboxItem>
      </CheckboxGroup>,
    );

    const asterisk = screen.getByLabelText("옵션 필수");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent("*");
  });

  test("required가 true이고 disabled가 true일 때 별표 색상이 변경된다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group" required disabled>
        <CheckboxItem value="option1">Option 1</CheckboxItem>
      </CheckboxGroup>,
    );

    const asterisk = screen.getByLabelText("옵션 필수");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent("*");
  });
});

describe("CheckboxItem", () => {
  test("CheckboxGroup 없이 사용하면 에러를 던진다", () => {
    const renderCheckboxItemAlone = () => {
      render(<CheckboxItem value="option1">Option 1</CheckboxItem>);
    };

    expect(renderCheckboxItemAlone).toThrow(
      "CheckboxItem 컴포넌트는 CheckboxGroup 내부에서만 사용해야 합니다.",
    );
  });

  test("여러 체크박스를 독립적으로 선택할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxGroup name="test" label="Test Checkbox Group">
        <CheckboxItem value="option1">Option 1</CheckboxItem>
        <CheckboxItem value="option2">Option 2</CheckboxItem>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    await user.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
  });

  test.each([
    ["Option 1", false],
    ["Option 2", true],
  ] as const)(
    "%s의 disabled 속성을 %s로 올바르게 적용한다",
    (optionName, isDisabled) => {
      render(
        <CheckboxGroup name="test" label="Test Checkbox Group">
          <CheckboxItem value="option1">Option 1</CheckboxItem>
          <CheckboxItem value="option2" disabled>
            Option 2
          </CheckboxItem>
        </CheckboxGroup>,
      );

      const option = screen.getByLabelText(optionName);

      if (isDisabled) {
        expect(option).toBeDisabled();
      } else {
        expect(option).not.toBeDisabled();
      }
    },
  );

  test.each([
    "neutral",
    "brand",
    "danger",
    "warning",
    "success",
    "info",
  ] as const)("%s 톤을 올바르게 렌더링한다", (tone) => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group" tone={tone}>
        <CheckboxItem value="option1">Option 1</CheckboxItem>
      </CheckboxGroup>,
    );

    const checkbox = screen.getByLabelText("Option 1");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-test-tone", tone);
  });
});
