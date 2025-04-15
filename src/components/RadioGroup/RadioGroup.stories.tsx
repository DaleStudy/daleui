import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    name: "fruits",
    label: "좋아하는 과일을 선택하세요",
    children: (
      <>
        <Radio value="apple">사과</Radio>
        <Radio value="banana">바나나</Radio>
        <Radio value="orange">오렌지</Radio>
      </>
    ),
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: "banana",
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: "horizontal",
  },
};

export const GroupDisabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ItemDisabled: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <Radio value="apple">사과</Radio>
        <Radio value="banana" disabled>
          바나나
        </Radio>
        <Radio value="orange">오렌지</Radio>
      </>
    ),
  },
};

export const Required = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // Check if the form is valid (browser validation passed)
    if (form.checkValidity()) {
      setFormValid(true);
      // Get the selected radio value
      const formData = new FormData(form);
      console.log("Form submitted with value:", formData.get("fruits"));
    } else {
      setFormValid(false);
    }

    setSubmitted(true);
  };

  return (
    <div style={{ minWidth: "300px" }}>
      <form onSubmit={handleSubmit} noValidate>
        <RadioGroup
          name="fruits"
          label="필수 선택 항목 - 좋아하는 과일을 선택하세요"
          required
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana">바나나</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <div style={{ marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#2E7D32",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            제출하기
          </button>
        </div>

        {submitted && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: formValid ? "#E8F5E9" : "#FFEBEE",
              color: formValid ? "#2E7D32" : "#C62828",
              borderRadius: "4px",
            }}
          >
            {formValid
              ? "✅ 폼이 성공적으로 제출되었습니다."
              : "⚠️ 필수 항목을 선택해주세요."}
          </div>
        )}
      </form>
    </div>
  );
};

export const Tones: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <RadioGroup
          name="neutral-tone"
          label="중립 색조 (Neutral)"
          defaultValue="apple"
          tone="neutral"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana">바나나</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup
          name="accent-tone"
          label="강조 색조 (Accent)"
          defaultValue="apple"
          tone="accent"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana">바나나</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup
          name="danger-tone"
          label="위험 색조 (Danger)"
          defaultValue="apple"
          tone="danger"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana">바나나</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup
          name="warning-tone"
          label="경고 색조 (Warning)"
          defaultValue="apple"
          tone="warning"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana">바나나</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>
      </div>
    );
  },
};

export const Controlled = () => {
  const [value, setValue] = useState("apple");
  return (
    <div>
      <RadioGroup
        name="controlled-fruits"
        label="제어 컴포넌트 예시"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Radio value="apple">사과</Radio>
        <Radio value="banana">바나나</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>
      <div style={{ marginTop: 20 }}>
        <p>현재 선택된 값: {value}</p>
        <button onClick={() => setValue("banana")}>바나나 선택</button>
        <button onClick={() => setValue("orange")}>오렌지 선택</button>
      </div>
    </div>
  );
};
