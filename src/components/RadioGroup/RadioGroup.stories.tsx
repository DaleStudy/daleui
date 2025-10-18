import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Radio, RadioGroup } from "./RadioGroup";

export default {
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
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
  argTypes: {
    children: {
      control: false,
      description: "라디오 버튼 요소들",
    },
  },
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "banana",
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const GroupDisabled: Story = {
  args: {
    disabled: true,
    defaultValue: "banana",
    label: "전체 그룹 비활성화",
  },
};

export const ItemDisabled: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <RadioGroup
          name="disabled-checked"
          label="개별 아이템 비활성화 (선택됨)"
          defaultValue="banana"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana" disabled>
            바나나 (disabled)
          </Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup
          name="disabled-unchecked"
          label="개별 아이템 비활성화 (선택 안 됨)"
          defaultValue="apple"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana" disabled>
            바나나 (disabled)
          </Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>
      </div>
    );
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: "필수 선택 항목 - 좋아하는 과일을 선택하세요",
  },
};

Required.decorators = [
  (StoryFn) => {
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
      <div className={css({ minWidth: "300px" })}>
        <form onSubmit={handleSubmit} noValidate>
          <StoryFn />
          <div className={css({ marginTop: "20" })}>
            <button
              type="submit"
              className={css({
                paddingX: "16",
                paddingY: "8",
                backgroundColor: "#2E7D32",
                color: "white",
                border: "none",
                borderRadius: "sm",
                cursor: "pointer",
              })}
            >
              제출하기
            </button>
          </div>
          {submitted && (
            <div
              className={css({
                marginTop: "20",
                padding: "8",
                backgroundColor: formValid ? "#E8F5E9" : "#FFEBEE",
                color: formValid ? "#2E7D32" : "#C62828",
                borderRadius: "sm",
              })}
            >
              {formValid
                ? "✅ 폼이 성공적으로 제출되었습니다."
                : "⚠️ 필수 항목을 선택해주세요."}
            </div>
          )}
        </form>
      </div>
    );
  },
];

export const Tones: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
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
          name="brand-tone"
          label="브랜드 색조 (Brand)"
          defaultValue="apple"
          tone="brand"
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

        <RadioGroup
          name="success-tone"
          label="성공 색조 (Success)"
          defaultValue="apple"
          tone="success"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana">바나나</Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup
          name="info-tone"
          label="정보 색조 (Info)"
          defaultValue="apple"
          tone="info"
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
      <div className={css({ marginTop: "20" })}>
        <p>현재 선택된 값: {value}</p>
        <button onClick={() => setValue("banana")}>바나나 선택</button>
        <button onClick={() => setValue("orange")}>오렌지 선택</button>
      </div>
    </div>
  );
};
