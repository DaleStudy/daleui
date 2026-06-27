import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import { CheckboxGroup } from "./CheckboxGroup";

describe("CheckboxGroup", () => {
  test("라벨과 자식 요소들을 렌더링한다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group">
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option3">Option 3</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    const option1 = screen.getByLabelText("Option 1");
    const option2 = screen.getByLabelText("Option 2");

    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  test("그룹 disabled가 하위 CheckboxGroup.Item의 disabled 스타일을 적용한다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        disabled
        defaultValues={["option1"]}
      >
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1" disabled>
          Option 1
        </CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option3">Option 3</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
          <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
          <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute("aria-hidden", "true");

    const requiredText = screen.getByText("(필수)");
    expect(requiredText).toBeInTheDocument();
  });

  test("required가 true이고 disabled가 true일 때 별표 색상이 변경된다", () => {
    render(
      <CheckboxGroup name="test" label="Test Checkbox Group" required disabled>
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute("aria-hidden", "true");

    const requiredText = screen.getByText("(필수)");
    expect(requiredText).toBeInTheDocument();
  });

  test("그룹을 role=group으로 노출하고 label을 접근 가능한 이름으로 연결한다", () => {
    render(
      <CheckboxGroup name="test" label="좋아하는 과일">
        <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
      </CheckboxGroup>,
    );
    const group = screen.getByRole("group", { name: "좋아하는 과일" });
    expect(group).toBeInTheDocument();
  });

  test("helperText가 있으면 하단에 표시하고 aria-describedby로 연결한다", () => {
    render(
      <CheckboxGroup name="test" label="Test Group" helperText="도움말입니다.">
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
      </CheckboxGroup>,
    );
    const help = screen.getByText("도움말입니다.");
    expect(help).toBeInTheDocument();
    const group = screen.getByRole("group");
    expect(group).toHaveAccessibleDescription("도움말입니다.");
  });

  test("helperText가 있으면 invalid 여부와 관계없이 노출한다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        helperText="도움말 텍스트"
      >
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    expect(screen.getByText("도움말 텍스트")).toBeInTheDocument();
  });

  test("invalid 상태에서도 option text는 기본 색상을 유지한다", () => {
    render(
      <CheckboxGroup
        name="test"
        label="Test Checkbox Group"
        invalid
        helperText="에러 메시지"
      >
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    expect(screen.getByText("에러 메시지")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).not.toHaveClass("c_fg.danger");
  });

  test("그룹 readOnly이면 모든 항목이 readOnly로 전파되어 토글이 차단된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <CheckboxGroup name="f" label="과일" readOnly onChange={handleChange}>
        <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
        <CheckboxGroup.Item value="banana">바나나</CheckboxGroup.Item>
      </CheckboxGroup>,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((cb) =>
      expect(cb).toHaveAttribute("aria-readonly", "true"),
    );
    await user.click(screen.getByText("사과"));
    expect(handleChange).not.toHaveBeenCalled();
  });
});

describe("CheckboxGroup.Item", () => {
  test("CheckboxGroup 없이 사용하면 에러를 던진다", () => {
    const renderItemAlone = () => {
      render(<CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>);
    };

    expect(renderItemAlone).toThrow(
      "CheckboxGroup.Item 컴포넌트는 CheckboxGroup 내부에서만 사용해야 합니다.",
    );
  });

  test("여러 체크박스를 독립적으로 선택할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <CheckboxGroup name="test" label="Test Checkbox Group">
        <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="option2">Option 2</CheckboxGroup.Item>
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
          <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
          <CheckboxGroup.Item value="option2" disabled>
            Option 2
          </CheckboxGroup.Item>
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

  test.each(["neutral", "brand"] as const)(
    "%s 톤을 올바르게 렌더링한다",
    (tone) => {
      render(
        <CheckboxGroup name="test" label="Test Checkbox Group" tone={tone}>
          <CheckboxGroup.Item value="option1">Option 1</CheckboxGroup.Item>
        </CheckboxGroup>,
      );

      const checkbox = screen.getByLabelText("Option 1");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("data-test-tone", tone);
    },
  );
});
